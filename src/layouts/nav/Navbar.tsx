import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Tabs, Tab, useMediaQuery, useTheme, IconButton, Menu, MenuItem, Fade } from '@mui/material';

import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import DrawerNav from './DrawerNav';
import { HocWithRouter } from '../../routers/HocWithRouter';
import { CapitalizeFirstLetter } from '../../common/utils/Utils';
import { NavbarLinks } from './NavbarLinks';

const Navbar = (props: any) => {

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

    const handleClickWallet = (event: any) => {
        setAnchorEl(event.currentTarget);
      };

      const handleCloseWallet = () => {
        setAnchorEl(null);
        //TODO: disconnect wallet
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
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClickWallet}
                    >
                        <Typography sx={{ marginRight: '5px'}} >0x23cs2</Typography>
                        <AccountBalanceWalletIcon />
                    </IconButton>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{ 'aria-labelledby': 'fade-button' }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseWallet}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleCloseWallet}>Disconnect Wallet</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default HocWithRouter(Navbar);