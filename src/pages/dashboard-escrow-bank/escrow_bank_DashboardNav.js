import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import Avataaars from 'avataaars';

const EscrowDashboardNav = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogoutClick = () => {
    history.push('/login');
  };

  const navigationItems = [
    { label: 'Profile', icon: <AccountCircleIcon />, link: '/dashboard-escrow-bank/escrow-profile' },
    { label: 'Dashboard', icon: <HomeIcon />, link: '/dashboard_escrow_bank' },
    { label: 'Settings', icon: <SettingsIcon />, link: '/dashboard-escrow-bank/settings' },
    { label: 'Help & Support', icon: <HelpIcon />, link: '/dashboard-escrow-bank/support' },
  ];


  const getCurrentPageName = () => {
    let currentPage = null;

    navigationItems.forEach((item) => {
      if (item.link === location.pathname) {
        currentPage = item.label;
      } else if (item.subMenu) {
        const subMenuItem = item.subMenu.find((subItem) => subItem.link === location.pathname);
        if (subMenuItem) {
          currentPage = subMenuItem.label;
        }
      }
    });

    return currentPage || 'Dashboard';
  };


  return (
    <>
      <MuiAppBar position="fixed" color="primary" style={{ width: '100%', left: 0 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, paddingLeft: "1%" }}>
            {getCurrentPageName()}
          </Typography>
          <IconButton color="inherit" onClick={() => history.push('/dashboard/profile')}>
            <Avatar>
              <Avataaars
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                avatarStyle="Circle"
                topType="ShortHairShortFlat"
                accessoriesType="Blank"
                hairColor="Black"
                facialHairType="Blank"
                clotheType="Hoodie"
                clotheColor="Blue03"
                eyeType="Default"
                eyebrowType="Default"
                mouthType="Default"
                skinColor="Light"
              />
            </Avatar>
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        style={{ width: '250px' }}
        PaperProps={{ style: { width: '250px', height: '100%', display: 'flex', flexDirection: 'column' } }}
      >
        <List>
          <Typography style={{textAlign:'center', fontWeight:'bold', fontSize:'28px', padding:'5px', backgroundColor:'#1769aa', color:'whitesmoke'}} >Mezzpro</Typography>
          {navigationItems.map((item) => (
            <React.Fragment key={item.label}>
              <ListItem
                button
                onClick={() => history.push(item.link)}
                style={{ backgroundColor: location.pathname === item.link ? '#f0f0f0' : 'transparent' }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" style={{ fontSize: '14px' }}>
                    {item.label}
                  </Typography>
                </ListItemText>
              </ListItem>
              {item.subMenu && (
                <List component="div" disablePadding>
                  {item.subMenu.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.label}
                      style={{ paddingLeft: '40px', backgroundColor: location.pathname === subItem.link ? '#f0f0f0' : 'transparent' }}
                      onClick={() => history.push(subItem.link)}
                    >
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText>
                        <Typography variant="body2" style={{ fontSize: '14px' }}>
                          {subItem.label}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <Box flexGrow={1} />
        <List>
          <ListItem button onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" style={{ fontSize: '14px' }}>
                Logout
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default EscrowDashboardNav;
