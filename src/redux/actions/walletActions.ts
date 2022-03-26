import { Dispatch } from 'react';

import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import TruffleContract from "@truffle/contract";
import moment from 'moment';
import PiggyBankCrypto from '../../solidity/abis/PiggyBankCrypto.json';

import { WalletTypes } from '../actionTypes/WalletTypes';

export const setAccount = (account: string) => {
    return async( dispatch: Dispatch<WalletTypes> ) => {
        dispatch({ type: 'setAccount', payload: account })
    }
}

export const setIsValidProvider = (valid: boolean) => {
    return async( dispatch: Dispatch<WalletTypes> ) => {
        dispatch({ type: 'setIsValidProvider', payload: valid })
    }
}

export const startConnectWallet = () => {

    return async( dispatch: Dispatch<WalletTypes> ) => {
        const provider = await detectEthereumProvider();

        if (provider) {
            if (provider !== window.ethereum) {
                console.error('Do you have multiple wallets installed?');
            } else {
                window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(async(accounts: any) => {
                    if (accounts.length > 0) {
                        
                        const web3 = new Web3(window.ethereum);
                        const contractAddress = PiggyBankCrypto.networks['5777'].address;
                        
                        // @ts-ignore
                        const piggyContract = TruffleContract(PiggyBankCrypto);
                        const contract = new web3.eth.Contract(piggyContract.abi, contractAddress);
                        
                        dispatch({ type: 'setAccount', payload: accounts[0] });
                        dispatch({ type: 'setContract', payload: contract });

                        dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: true, description: 'Wallet connected' }})

                    }

                })
                .catch((err: any) => {
                    // eth_accounts will return an empty array.
                    if (err.code === 4001) {
                        // EIP-1193 userRejectedRequest error
                        dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'Error. Reconnect your Metamask' }})
                    } else {
                        console.error(err);
                    }
                });
            }
        } else {
            console.log('Please install MetaMask!');
        }
    }
}

const getMinimum = async( contract:any ) => {
    try {

        const minimum = await contract.methods.getMinimum().call();

        return minimum;

    } catch (error) {
        console.log(error);
    }
}

const getMinimumDays = async( contract: any ) => {
    try {
        const minimumDays = await contract.methods.getMinimumDays().call();

        return minimumDays;

    } catch (error) {
        console.log(error);
    }
}

export const startMakeDeposit = ( amount: any, daysToExpire: any ) => {
    return async( dispatch: Dispatch<WalletTypes>, getState: any ) => {
        const { account, contract } = getState().wallet;

        if (account) {
            try {
                const minimum = await getMinimum( contract );

                const web3 = new Web3(window.ethereum);
                const amountInWei = web3.utils.toWei( amount );

                if ( Number(amountInWei) >= Number(minimum) ) {
                    const minimumDays = await getMinimumDays( contract );

                    if (daysToExpire >= minimumDays) {

                        await contract.methods.makeDeposit(daysToExpire).send({
                            value: amountInWei,
                            from: account
                        });

                        dispatch({ type: 'setHasDeposit', payload: true });
                        
                        dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: true, description: 'Successful release!' }})
                        
                    } else {
                        dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: `You need to choose a expire days bigger than ${ minimumDays } days` }})
                    }
                } else{
                    dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: `The value must be greater than the minimum` }})
                }

            } catch(error) {
                dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'Exception error: ' + error }})
            }
        } else {
            dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'You need to connect your Wallet' }})
        }
    }
}

export const startViewMyDeposit = () => {
    return async( dispatch: Dispatch<WalletTypes>, getState: any ) => {

        const { contract, account } = getState().wallet;

        if (contract) {
            if (account) {
                try {
                    const myDeposit = await contract.methods.viewMyDeposit().call({ from: account });

                    const web3 = new Web3(window.ethereum);
                    const amountInEth = web3.utils.fromWei( myDeposit[0] );
                    const myExpireDate = new Date(myDeposit[1] * 1000);

                    const todayFormatted = moment().format("X");
                    
                    let releaseAvaible = false;
                    if ( todayFormatted > myDeposit[1] ) {
                        releaseAvaible = true;
                    }
                    releaseAvaible = true; // Remove this line when it pass to production

                    if (myDeposit[0] > 0) {
                        dispatch({ 
                            type: 'setActiveDeposit', 
                            payload: {
                                releaseAvaible,
                                amount: amountInEth,
                                expireDate: moment(myExpireDate).format("MM-DD-YYYY") as string,
                            }
                        });
                    }

                } catch (error) {
                    dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'An error has ocurred. ' + error }})
                }
            } else {
                // window.alert('Error. Reconnect your Metamask');
                dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'Error. Reconnect your Metamask' }})
            }            
        } else {
            // window.alert('Error. Reconnect your Metamask');
            dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'Error. Reconnect your Metamask' }})
        }
    }
}

export const startAddDeposit = (amount: any) => {
    return async( dispatch: Dispatch<WalletTypes>, getState: any ) => {

        const { contract, account } = getState().wallet;

        if (contract) {
            if (account) {
                if (amount > 0) {  
                    try {

                        const web3 = new Web3(window.ethereum);
                        const amountInWei = web3.utils.toWei( amount );

                        await contract.methods.addDeposit().send({
                            value: amountInWei,
                            from: account
                        });

                        dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: true, description: 'Added deposit successfully!' }})

                    } catch (error) {
                        dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'An error has ocurred. ' + error }})
                    }
                } else {
                    dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'You need to specifie an amount' }})
                }
            } else {
                dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'Error. Reconnect your Metamask' }})
            }            
        } else {
            dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'Error. Reconnect your Metamask' }})
        }
    }
}

export const startReleaseDeposit = () => {
    return async( dispatch: Dispatch<WalletTypes>, getState: any ) => {

        const { contract, account } = getState().wallet;
        
        if (contract) {
            if (account) {
                try {
                    await contract.methods.releaseDeposit().send({ from: account });
                    
                    dispatch({ type: 'clearActiveDeposit' });

                    dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: true, description: 'Sucessful Release!' }})

                } catch (error) {
                    dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'An error has ocurred. ' + error }})
                }
            } else {
                dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'Error. Reconnect your Metamask' }})
            }            
        } else {
            dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'Error. Reconnect your Metamask' }})
        }
    }
}

export const hideSnackbarTransactionResult = () => {
    return async( dispatch: Dispatch<WalletTypes> ) => {

        dispatch({ type: 'hideSnackbarTransactionResult' });

    }
}