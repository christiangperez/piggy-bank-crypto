import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import { startConnectWallet } from '../../redux/actions/walletActions';
import { IRootState } from '../../redux/store/store';

export const ConnectWallet = (props: any) => {
  const dispatch = useDispatch();
  const { isValidProvider } = useSelector((state: IRootState) => state.wallet);

  const handleClickConnectWallet = () => {
    if (isValidProvider) {
      dispatch(startConnectWallet());
    }
  };

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={handleClickConnectWallet}
      {...props}
    >
      {isValidProvider ? 'Connect Wallet' : 'You need to instal Metamask'}
    </Button>
  );
};
