export type WalletTypes =
| { type: 'setCurrentAccount', payload: string }
| { type: 'setIsValidProvider', payload: boolean }
| { type: 'startConnectWallet' }
| { type: 'walletDepositCreated' }
| { type: 'walletDepositReleased' }
| { type: 'walletViewAddingDeposit' }
| { type: 'walletHasDeposit' }
| { type: 'walletDepositViewed' };