import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import { NavbarLinks } from './NavbarLinks';
import { CapitalizeFirstLetter } from '../../common/utils/Utils';

const DrawerNav = () => {

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
                NavbarLinks.map((page: string, index: number) => (
                  <ListItemButton onClick={() => handleClick(page)} key={index}>
                  <ListItemIcon>
                    <ListItemText>
                      { CapitalizeFirstLetter(page) }
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
                ))
              }
              
            </List>
        </Drawer>
        <IconButton sx={{ color: 'white', marginRight: 'auto' }} onClick={() => setOpenDrawer(!openDrawer)}>
          <MenuIcon />
        </IconButton>
    </>
  )
}

export default DrawerNav;