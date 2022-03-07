import { WalletTypes } from "../types/walletTypes";

interface IStateWallet {

}
const initialState: IStateWallet = {

}

export const walletReducer = (state = initialState, action: WalletTypes) => {
    
    switch (action.type) {
        default:
            return state;
    }
}