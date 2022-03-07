const PiggyBankCrypto = artifacts.require('PiggyBankCrypto');

beforeEach(async() => {
    const minimum = web3.utils.toWei( '0.01' );
    const commission = web3.utils.toWei( '0.005' );
    const minimumDays = 14;

    instance = await PiggyBankCrypto.new(minimum, commission, minimumDays );
});

contract('PiggyBankCrypto', (accounts) => {

    describe('Tesing PiggyBankCrypto Contract', () => {
        it('should be have the correct default minimium (0.01 eth)', async() => {
            let minimum = await instance.getMinimum();
            minimum = await web3.utils.fromWei(minimum);

            expect( Number(minimum) ).to.be.eq( 0.01 );
        });
    
        it('should be have the correct default commission (0.005 eth)', async() => {
            let commission = await instance.getCommission();
            commission = await web3.utils.fromWei(commission);
    
            expect( Number(commission) ).to.be.eq( 0.005 );
        });
    
        it('should be have the correct default minimum days (14)', async() => {
            const minimumDays = await instance.getMinimumDays();
    
            expect( Number(minimumDays) ).to.be.eq( 14 );
        });
    
        it('should set minimum value to 0.02 eth', async() => {
            const minimum = await web3.utils.toWei('0.02');
            await instance.setMinimum(minimum);
    
            let newMinimum = await instance.getMinimum();
    
            newMinimum = await web3.utils.fromWei(newMinimum);
    
            expect( Number(newMinimum) ).to.be.eq( 0.02 );
        });    
    
        it('should make a valid deposit from 0.03 eth', async() => {
            const valueToSend = await web3.utils.toWei( '0.03' );
            const daysToExpire = 30;
            
            await instance.makeDeposit(daysToExpire, { from: accounts[0], value: valueToSend });
    
            const contractBalance = await web3.eth.getBalance(instance.address)

            const myDeposit = await instance.viewMyDeposit();
            const myDepositAmount = myDeposit[0];

            expect( Number(contractBalance) ).to.be.eq( Number(valueToSend) );
            expect( Number(myDepositAmount) ).to.be.eq( Number(valueToSend) );
        });

        it('should release a deposit deposit from 0.04 eth', async() => {
            const valueToSend = await web3.utils.toWei( '0.04' );
            const daysToExpire = 30;

            await instance.makeDeposit(daysToExpire, { from: accounts[0], value: valueToSend });

            const accountBalanceAfterDeposit = await web3.eth.getBalance(accounts[0]);

            await instance.releaseDeposit({ from: accounts[0] });

            const accountBalanceAfterRelease = await web3.eth.getBalance(accounts[0]);

            const myDeposit = await instance.viewMyDeposit();
            const myDepositAmount = myDeposit[0];
            const myDepositExpireDate = myDeposit[1];

            const contractBalance = await web3.eth.getBalance(instance.address);

            const commission = await instance.getCommission();

            expect( Number(myDepositAmount) ).to.eq(0);
            expect( Number(myDepositExpireDate) ).to.eq(0);
            expect( Number(contractBalance) ).to.eq( Number(commission) );
            expect( Number(accountBalanceAfterRelease) > Number(accountBalanceAfterDeposit) ).to.be.eq( true );
        });

        it('should add a deposit from 0.02 eth', async() => {
            let valueToSend = await web3.utils.toWei( '0.02' );
            const daysToExpire = 30;

            await instance.makeDeposit(daysToExpire, { from: accounts[0], value: valueToSend });

            const myDeposit = await instance.viewMyDeposit();
            const myDepositAmount = myDeposit[0];

            const contractBalanceBeforerAddDeposit = await web3.eth.getBalance(instance.address);

            valueToSend = await web3.utils.toWei( '0.02' );
            await instance.addDeposit({ from: accounts[0], value: valueToSend });

            const contractBalanceAfterAddDeposit = await web3.eth.getBalance(instance.address);

            const myNewDeposit = await instance.viewMyDeposit();
            const myNewDepositAmount = myNewDeposit[0];

            expect( Number(myNewDepositAmount) ).to.eq( Number(myDepositAmount) + Number(valueToSend) );
            expect( Number(contractBalanceAfterAddDeposit) ).to.eq( Number(contractBalanceBeforerAddDeposit) + Number(valueToSend) );
        });

    });

    
});