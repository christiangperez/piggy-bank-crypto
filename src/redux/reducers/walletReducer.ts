import { WalletTypes } from "../actionTypes/WalletTypes";

interface IStateWallet {
    currentAccount: string,
    isValidProvider: boolean,
}

const initialState: IStateWallet = {
    currentAccount: '',
    isValidProvider: false,
}

export const walletReducer = (state: IStateWallet = initialState, action: WalletTypes) => {
    
    switch (action.type) {

        case 'setCurrentAccount':
            return {
                ...state,
                currentAccount: action.payload
            }

        case 'setIsValidProvider':
            return {
                ...state,
                isValidProvider: action.payload
            }

        default:
            return state;
    }
}