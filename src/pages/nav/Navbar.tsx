import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Typography, Toolbar, Tabs, Tab, useMediaQuery, useTheme, IconButton, Menu, MenuItem, Fade, Snackbar, Alert } from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import DrawerNav from './DrawerNav';
import { HocWithRouter } from '../../routers/HocWithRouter';
import { CapitalizeFirstLetter } from '../../common/utils/Utils';
import { NavbarLinks } from './NavbarLinks';
import { hideSnackbarTransactionResult, setAccount, setIsValidProvider, startViewMyDeposit } from '../../redux/actions/walletActions';
import { IRootState } from '../../redux/store/store';
import { ConnectWallet } from '../../common/components/ConnectWallet';

const Navbar = (props: any) => {

  const dispatch = useDispatch();
  const { account, activeDeposit, transactionResult } = useSelector((state: IRootState) => state.wallet);

  const { router } = props;
  const { location } = router;
  const { pathname } = location;
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const positionInLinks = NavbarLinks
                          .filter((p) => p.private === (account?.length > 0 && activeDeposit !== null) || p.private === false)
                          .findIndex((l) => l.url === String(pathname.slice(1)).toLowerCase());
  const [selectedTab, setSelectedTab] = useState((positionInLinks >= 0) ? positionInLinks : 0);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChainChanged = (_chainId: any) => {
    window.location.reload();
  }
  
  const handleAccountsChanged = (accounts: any) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      dispatch({ type: 'showSnackbarTransactionResult', payload: { okStatus: false, description: 'Error. Reconnect your Metamask' }})
    } else if (accounts[0] !== account) {
      // Account has changed
      dispatch(setAccount(accounts[0]));
    }
  }

  const initializeWeb3 = async() => {
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
    } catch(e) {
      console.log(e, 'Exception error!');
    }
    
  }

  useEffect(() => {
      initializeWeb3();
  }, []);

  useEffect(() => {
    if (account) {
      dispatch(startViewMyDeposit());
    }
  }, [account]);

  const handleClickWallet = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDisconnectWallet = () => {
    setAnchorEl(null);
    
    dispatch(setAccount(''));
  };

  const handleChange = (event: any, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleClick = (page: string) => {
    navigate(page);
  }

  const handleClickHome = () => {
    navigate('/');
  }

  const getShortAccount = (account: string) => {
    if (account.length > 5) {
        return account.substring(0,5) + '...' + account.substr(-4)
    }

    return '';
  }

  const handleCloseSnackBar = () => {
    dispatch(hideSnackbarTransactionResult());
  }

  return (
    <>
      <AppBar position='static' sx={{ background: 'primary' }}>
        <Toolbar>
          <Snackbar open={transactionResult.show} key='bottom center' anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity={ (transactionResult?.okStatus ? 'success' : 'error') } sx={{ width: '100%' }}>
              {
                transactionResult?.description
              }
            </Alert>
          </Snackbar>
          {
            (isMatch) ? (
                <>
                    <DrawerNav />
                    <Typography sx={{ fontSize: '1.2rem', marginRight: 'auto' }}>
                        Crypto Piggy Bank
                    </Typography>
                </>
            )
            : (
                <>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClickHome}
                    >
                        <SavingsIcon />
                    </IconButton>
                    <Tabs 
                        sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                        textColor='inherit' 
                        value={selectedTab} 
                        onChange={handleChange} 
                        indicatorColor='secondary'
                    >
                        {
                            NavbarLinks
                            .filter((p) => p.private === (account?.length > 0 && activeDeposit !== null) || p.private === false)
                            .map((page: any) => (
                                <Tab onClick={() => handleClick(page.url)} key={page.url} label={CapitalizeFirstLetter(page.url)} />
                            ))
                        }
                    </Tabs>
                </>
            )
          }
          {
            (account)
            ? (
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClickWallet}
                >
                    <Typography sx={{ marginRight: '5px'}} >{getShortAccount(account)}</Typography>
                    <AccountBalanceWalletIcon />
                </IconButton>
            )
            : (
                <ConnectWallet />
            )
          }
          <Menu
            id="fade-menu"
            MenuListProps={{ 'aria-labelledby': 'fade-button' }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleDisconnectWallet}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleDisconnectWallet}>Disconnect Wallet</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default HocWithRouter(Navbar);