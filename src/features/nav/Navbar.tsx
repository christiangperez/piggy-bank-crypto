import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppBar,
  Typography,
  Toolbar,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  Snackbar,
  Alert,
  Grid,
  Link,
  Stack,
} from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import DrawerNav from './DrawerNav';
import { HocWithRouter } from '../../routers/HocWithRouter';
import {
  hideSnackbarTransactionResult,
  setAccount,
  setIsValidProvider,
  startViewMyDeposit,
} from '../../redux/actions/walletActions';
import { IRootState } from '../../redux/store/store';
import { ConnectWallet } from '../../common/components/ConnectWallet';

const Navbar = (props: any) => {
  const dispatch = useDispatch();
  const { account, activeDeposit, transactionResult } = useSelector(
    (state: IRootState) => state.wallet
  );

  const { router } = props;
  const { location } = router;
  const { pathname } = location;

  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChainChanged = (_chainId: any) => {
    window.location.reload();
  };

  const handleAccountsChanged = (accounts: any) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      dispatch({
        type: 'showSnackbarTransactionResult',
        payload: {
          okStatus: false,
          description: 'Error. Reconnect your Metamask',
        },
      });
    } else if (accounts[0] !== account) {
      // Account has changed
      dispatch(setAccount(accounts[0]));
    }
  };

  const initializeWeb3 = async () => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        if (provider === window.ethereum) {
          dispatch(setIsValidProvider(true));

          window.ethereum.on('chainChanged', handleChainChanged);
          window.ethereum.on('accountsChanged', handleAccountsChanged);
        } else {
          console.error('Do you have multiple wallets installed?');
          dispatch(setIsValidProvider(false));
        }
      } else {
        console.log('Please install MetaMask!');
        dispatch(setIsValidProvider(false));
      }
    } catch (e) {
      console.log(e, 'Exception error!');
    }
  };

  const handleClickWallet = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDisconnectWallet = () => {
    setAnchorEl(null);

    dispatch(setAccount(''));
  };

  const handleClickHome = () => {
    navigate('/');
  };

  const getShortAccount = (account: string) => {
    if (account.length > 5) {
      return account.substring(0, 5) + '...' + account.substr(-4);
    }

    return '';
  };

  const handleCloseSnackBar = () => {
    dispatch(hideSnackbarTransactionResult());
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  useEffect(() => {
    if (account) {
      dispatch(startViewMyDeposit());
    }
  }, [account]);

  return (
    <>
      <AppBar
        position='static'
        sx={{ background: 'transparent', paddingTop: 2 }}
        elevation={0}
      >
        <Toolbar>
          <Snackbar
            key='top center'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={3000}
            open={transactionResult.show}
            onClose={handleCloseSnackBar}
          >
            <Alert
              onClose={handleCloseSnackBar}
              severity={transactionResult?.okStatus ? 'success' : 'error'}
              sx={{ width: '100%' }}
            >
              {transactionResult?.description}
            </Alert>
          </Snackbar>
          {isMatch ? (
            <>
              <DrawerNav />
              <Typography sx={{ fontSize: '1.2rem', marginRight: 'auto' }}>
                Crypto Piggy Bank
              </Typography>
            </>
          ) : (
            <>
              <Grid container>
                <Stack
                  direction='row'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    edge='start'
                    color='inherit'
                    onClick={handleClickHome}
                  >
                    <SavingsIcon />
                  </IconButton>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 24,
                      letterSpacing: -0.2,
                    }}
                  >
                    Piggy Bank Crypto
                  </Typography>
                </Stack>
                <Grid
                  sx={{
                    paddingLeft: 6,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    className='home-nav-link'
                    href='#'
                    underline='none'
                    onClick={() => navigate('home')}
                    color={
                      pathname.slice(1).toLowerCase() === 'home'
                        ? '#7d879b'
                        : '#7d879b'
                    }
                    sx={{ marginRight: 3 }}
                  >
                    {'Home'}
                  </Link>
                  <Link
                    className='home-nav-link'
                    href='#'
                    underline='none'
                    onClick={() => navigate('create')}
                    color={
                      pathname.slice(1).toLowerCase() === 'create'
                        ? 'white'
                        : '#7d879b'
                    }
                    sx={{ marginRight: 3 }}
                  >
                    {'Create'}
                  </Link>
                  {account?.length > 0 && activeDeposit !== null && (
                    <>
                      <Link
                        className='home-nav-link'
                        href='#'
                        underline='none'
                        onClick={() => navigate('add')}
                        color={
                          pathname.slice(1).toLowerCase() === 'add'
                            ? 'white'
                            : '#7d879b'
                        }
                        sx={{ marginRight: 3 }}
                      >
                        {'Add'}
                      </Link>
                      <Link
                        className='home-nav-link'
                        href='#'
                        underline='none'
                        onClick={() => navigate('view')}
                        color={
                          pathname.slice(1).toLowerCase() === 'view'
                            ? 'white'
                            : '#7d879b'
                        }
                        sx={{ marginRight: 3 }}
                      >
                        {'View'}
                      </Link>
                    </>
                  )}
                  <Link
                    className='home-nav-link'
                    href='#'
                    underline='none'
                    onClick={() => navigate('about')}
                    color={
                      pathname.slice(1).toLowerCase() === 'about'
                        ? 'white'
                        : '#7d879b'
                    }
                    sx={{ marginRight: 3 }}
                  >
                    {'About'}
                  </Link>
                </Grid>
                <Grid
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: 1,
                    marginRight: 1,
                  }}
                >
                  {account ? (
                    <IconButton
                      edge='start'
                      color='inherit'
                      onClick={handleClickWallet}
                    >
                      <AccountBalanceWalletIcon sx={{ marginRight: 1 }} />
                      <Typography>{getShortAccount(account)}</Typography>
                    </IconButton>
                  ) : (
                    <ConnectWallet />
                  )}
                  <Menu
                    id='fade-menu'
                    MenuListProps={{ 'aria-labelledby': 'fade-button' }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleDisconnectWallet}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleDisconnectWallet}>
                      Disconnect Wallet
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default HocWithRouter(Navbar);
