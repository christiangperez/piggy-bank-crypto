import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import { NavbarLinks } from './NavbarLinks';
import { CapitalizeFirstLetter } from '../../common/utils/Utils';
import { IRootState } from '../../redux/store/store';

const DrawerNav = () => {

  const { account, activeDeposit } = useSelector((state: IRootState) => state.wallet);
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClick = (page: string) => {
    setOpenDrawer(false);
    navigate(page);
  }

  return (
    <>
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <List>
              {
                NavbarLinks
                .filter((p) => p.private === (account?.length > 0 && activeDeposit !== null) || p.private === false)
                .map((page: any) => (
                  <ListItemButton onClick={() => handleClick(page.url)} key={page.url}>
                  <ListItemIcon>
                    <ListItemText>
                      { CapitalizeFirstLetter(page.url) }
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
                ))
              }
              
            </List>
        </Drawer>
        <IconButton 
          sx={{ color: 'white', marginRight: 'auto' }} 
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon />
        </IconButton>
    </>
  )
}

export default DrawerNav;