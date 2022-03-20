import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Tabs, Tab, useMediaQuery, useTheme, IconButton, Menu, MenuItem, Fade, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import detectEthereumProvider from '@metamask/detect-provider';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import DrawerNav from './DrawerNav';
import { HocWithRouter } from '../../routers/HocWithRouter';
import { CapitalizeFirstLetter } from '../../common/utils/Utils';
import { NavbarLinks } from './NavbarLinks';
import { setCurrentAccount, setIsValidProvider, startConnectWallet } from '../../redux/actions/walletActions';
import { IRootState } from '../../redux/store/store';
import { ConnectWallet } from '../../common/components/ConnectWallet';

const Navbar = (props: any) => {

  const dispatch = useDispatch();
  const { currentAccount, isValidProvider } = useSelector((state: IRootState) => state.wallet);

  const { router } = props;
  const { location } = router;
  const { pathname } = location;
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const positionInLinks = NavbarLinks.indexOf(String(pathname.slice(1)).toLowerCase());
  const [selectedTab, setSelectedTab] = useState(positionInLinks >= 0 ? positionInLinks : 0);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChainChanged = (_chainId: any) => {
    window.location.reload();
  }
  
  const handleAccountsChanged = (accounts: any) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      // Account has changed
      dispatch(setCurrentAccount(accounts[0]));
    }
  }

  const initializeWeb3 = async() => {
    const provider = await detectEthereumProvider();

    if (provider) {
      if (provider === window.ethereum) {
        dispatch(setIsValidProvider(true));
        
        window.ethereum.on('chainChanged', handleChainChanged);
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // These doesn't work
        // window.ethereum.on('connect', () => console.log('conectado') );
        // window.ethereum.on('disconnect', () => console.log('desconectado') );
          
      } else {
        console.error('Do you have multiple wallets installed?');
        dispatch(setIsValidProvider(false));
      }
    } else {
      console.log('Please install MetaMask!');
      dispatch(setIsValidProvider(false));
    }
  }

  useEffect(() => {
      initializeWeb3();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      console.log(currentAccount, 'currentAccount');
    }
  }, [currentAccount]);

  const handleClickWallet = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDisconnectWallet = () => {
    setAnchorEl(null);
    
    dispatch(setCurrentAccount(''));
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

  const handleClickConnectWallet = () => {
    if (isValidProvider) {
        dispatch(startConnectWallet());
    }
  }

  const getShortAccount = (account: string) => {
    if (account.length > 5) {
        return account.substring(0,5) + '...' + account.substr(-4)
    }

    return '';
  }

  return (
    <>
      <AppBar position='static' sx={{ background: 'primary' }}>
        <Toolbar>
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
                              NavbarLinks.map((page: string, index: number) => (
                                  <Tab onClick={() => handleClick(page)} key={index} label={CapitalizeFirstLetter(page)} />
                              ))
                          }
                      </Tabs>
                  </>
              )
          }
          {
              (currentAccount)
              ? (
                  <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClickWallet}
                  >
                      <Typography sx={{ marginRight: '5px'}} >{getShortAccount(currentAccount)}</Typography>
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