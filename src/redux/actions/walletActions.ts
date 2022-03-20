import { Dispatch } from 'react';

import detectEthereumProvider from '@metamask/detect-provider';
// import Web3 from 'web3';
// import * as Web3 from 'web3';
import PiggyBankCrypto from '../../solidity/abis/PiggyBankCrypto.json';

import { WalletTypes } from '../actionTypes/WalletTypes';

export const setCurrentAccount = (account: string) => {
    return async( dispatch: Dispatch<WalletTypes> ) => {
        dispatch({ type: 'setCurrentAccount', payload: account })
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
            console.log('tiene provider')
            if (provider !== window.ethereum) {
                console.error('Do you have multiple wallets installed?');
            } else {
                window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(async(accounts: any) => {
                    if (accounts.length > 0) {
                        dispatch({ type: 'setCurrentAccount', payload: accounts[0] });
                    }

                    // const Web3 = require('web3');
                    // var web3 = new Web3(window.ethereum);
                    // const netId = await web3.eth.net.getId();

                    // const web3 = new Web3(window.ethereum);
                    // const netId = await web3.eth.net.getId();
                    // console.log(netId, 'netId');

                    // const contractAddress = PiggyBankCrypto.networks['5777'].address;
                    // const contractAddress = PiggyBankCrypto.networks[netId].address;
                    // const piggybankcrypto = new web3.eth.Contract(PiggyBankCrypto.abi, contractAddress);


                })
                .catch((err: any) => {
                    // eth_accounts will return an empty array.
                    if (err.code === 4001) {
                        // EIP-1193 userRejectedRequest error
                        console.log('Please connect to MetaMask.');
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

export const releaseDeposit = () => {
    return async( dispatch: Dispatch<WalletTypes>, getState: any ) => {
        const { currentAccount } = getState().wallet;

        if (currentAccount) {
            console.log(currentAccount, 'currentAccount');
        }
    }
}