export type WalletTypes =
	| { type: 'setAccount'; payload: string }
	| { type: 'setIsValidProvider'; payload: boolean }
	| { type: 'setContract'; payload: any }
	| { type: 'setHasDeposit'; payload: boolean }
	| { type: 'setActiveDeposit'; payload: any | null }
	| { type: 'clearActiveDeposit' }
	| {
			type: 'showSnackbarTransactionResult';
			payload: {
				// show: boolean,
				okStatus?: boolean;
				description?: string;
			};
	  }
	| { type: 'hideSnackbarTransactionResult' }
	| { type: 'depositAdded' };
