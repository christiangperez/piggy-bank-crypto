let PiggyBankCrypto = artifacts.require("PiggyBankCrypto");

module.exports = async function (deployer) {
  const minimum = web3.utils.toWei( '0.01' );
  const commission = web3.utils.toWei( '0.005' );
  const minimumDays = 14;

  await deployer.deploy(PiggyBankCrypto, minimum, commission, minimumDays);
};