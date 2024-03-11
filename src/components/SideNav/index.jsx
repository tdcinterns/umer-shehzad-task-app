import React from 'react';

import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { List, CssBaseline, Divider, IconButton, useMediaQuery } from '@mui/material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import AssignmentIcon from '@mui/icons-material/Assignment';

import CONSTANT from '../../constants/constant';

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  React.useEffect(() => {
    const handleResize = () => {
      setOpen(matches); // Update open state based on current screen size
    };

    window.addEventListener('resize', handleResize); // Add event listener

    return () => window.removeEventListener('resize', handleResize); // Remove listener on cleanup
  }, [matches]);

  return (
    <>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>

        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)} color={CONSTANT.color.base}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <div>
          {
            auth ?
              <List>

                {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/") }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    color: '#C71585',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <HomeIcon color='secondary' />
                  </ListItemIcon>
                  <ListItemText
                    primary='Home'
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiListItemText-primary': { fontWeight: 'bold' }
                    }}
                  />
                </ListItemButton>
              </ListItem> */}

                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/task") }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      color: `${CONSTANT.color.border}`,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <AssignmentIcon color={CONSTANT.color.base} />
                    </ListItemIcon>
                    <ListItemText
                      primary='Task'
                      sx={{
                        opacity: open ? 1 : 0,
                        '& .MuiListItemText-primary': { fontWeight: 'bold' }
                      }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }} onClick={logout}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      color: `${CONSTANT.color.border}`,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <LockIcon color={CONSTANT.color.base} />
                    </ListItemIcon>
                    <ListItemText
                      primary='Logout'
                      sx={{
                        opacity: open ? 1 : 0,
                        '& .MuiListItemText-primary': { fontWeight: 'bold' }
                      }}
                    />
                  </ListItemButton>
                </ListItem>

              </List>
              :
              <List>

                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/login") }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      color: `${CONSTANT.color.border}`,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <LockOpenIcon color={CONSTANT.color.base} />
                    </ListItemIcon>
                    <ListItemText
                      primary='Login'
                      sx={{
                        opacity: open ? 1 : 0,
                        '& .MuiListItemText-primary': { fontWeight: 'bold' },
                      }}
                    />
                  </ListItemButton>
                </ListItem>

              </List>
          }
        </div>
      </Drawer>
    </>
  );
}