import { WalletTypes } from "../actionTypes/WalletTypes";

interface IStateWallet {
    account: string,
    isValidProvider: boolean,
    contract: any,
    hasDeposit: boolean,
    activeDeposit: {
        amount: any,
        expireDate: any,
        releaseAvaible: boolean
    } | null,
    transactionResult: {
        show: boolean,
        okStatus?: boolean,
        description?: string
    }
}

const initialState: IStateWallet = {
    account: '',
    isValidProvider: false,
    contract: null,
    hasDeposit: false,
    activeDeposit: null,
    transactionResult: {
        show: false
    }
}

export const walletReducer = (state: IStateWallet = initialState, action: WalletTypes) => {
    
    switch (action.type) {

        case 'setAccount':
            return {
                ...state,
                account: action.payload
            }

        case 'setIsValidProvider':
            return {
                ...state,
                isValidProvider: action.payload
            }

        case 'setContract':
            return {
                ...state,
                contract: action.payload
            }

        case 'setHasDeposit':
            return {
                ...state,
                hasDeposit: action.payload
            }

        case 'setActiveDeposit':
            return {
                ...state,
                activeDeposit: action.payload
            }

        case 'clearActiveDeposit':
            return {
                ...state,
                activeDeposit: null,
                hasDeposit: false
            }

        case 'showSnackbarTransactionResult':
            return {
                ...state,
                transactionResult: {
                    ...state.transactionResult,
                    ...action.payload,
                    show: true
                }
            }
            
        case 'hideSnackbarTransactionResult':
            return {
                ...state,
                transactionResult: {
                    ...state.transactionResult,
                    show: false
                }
            }

        default:
            return state;
    }
}