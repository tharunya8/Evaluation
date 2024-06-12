'use client';

import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Avatar, Badge, Box, Collapse, CssBaseline, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import path from 'path';
import { icons, images } from './../../public/index';

import '../../styles/layout/sidebar.scss';

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#1347C9',
    color: '#ffffff',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
});

const closedMixin = (theme: Theme): CSSObject => ({
    width: `calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: '#1347C9',
    color: '#ffffff',
    overflow: 'hidden',
    scrollbarWidth: 'none',
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
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

const AppBar: any = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean; }>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100% - 64.4px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const menuItems = [
    { label: 'Employee', path: '/', icon: '' }
]

const HeaderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const route = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const [openCollapse, setOpencollapse] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('');
    const [selectedSubMenuItem, setSelectedSubMenuItem] = React.useState('');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setOpencollapse(false);
    };

    const handleClick = (index: number) => {
        setOpenMenu(!openMenu)
        setOpencollapse(!openCollapse);
    };

    React.useEffect(() => {
        menuItems.map(item => {
            if (item?.path == pathname || pathname?.includes('/')) {
                setSelectedMenuItem(item?.label);
            }
        })
    }, [pathname]);

    const getItemStyle = (menuLabel: any) => {

        const selectedStyles = {
            // backgroundColor: '#FFFFFF33',
            borderRadius: '5px',
        };
        return selectedMenuItem === menuLabel ? selectedStyles : {};
    };
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme: any) => theme.zIndex.drawer + 1, backgroundColor: '#ffffff', boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.12)' }} open={open}>
                    <div>
                        <Toolbar sx={{ display: 'flex' }}>
                            <Box sx={{ color: '#000' }}>
                                <Image src={images.Brandlogo} alt='brandlogo' width={159} height={28.86} />
                            </Box>
                        </Toolbar>
                    </div>
                </AppBar>
                <Drawer variant="permanent" open={open} className={'admin-sidebar'}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        {menuItems?.map((menu: any, index: any) => (
                            <>
                                <ListItemButton key={menu.label} style={getItemStyle(menu.label)}>
                                    <ListItemIcon sx={{ paddingLeft: '4px', minWidth: '50px', }}>
                                        <Image src={icons.Empicon} alt='' width={18} height={18} />
                                    </ListItemIcon>
                                    <ListItemText onClick={() => route.push(menu.path)} primary={menu.label} sx={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 500, lineHeight: 16.94, letterSpacing: 0.02, textAlign: 'left' }} />
                                    {menu.submenu && (openCollapse ? <ExpandLess /> : <ExpandMore />)}
                                </ListItemButton >
                            </>
                        ))}
                    </List>
                    <span style={{ position: 'sticky', top: 0, zIndex: 5, backgroundColor: '#1347C9' }}>
                        <DrawerHeader sx={{ padding: '0px 5px', gap: 0, justifyContent: 'center', marginTop: 50 }}>
                            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen} sx={{ display: 'flex', gap: open ? 2 : 0, padding: 0 }}>
                                {open ? (<><ArrowCircleLeftIcon sx={{ color: '#ffffff' }} /></>) : <ArrowCircleRightIcon sx={{ color: '#ffffff' }} />}
                            </IconButton>
                        </DrawerHeader>

                    </span>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', }}>
                    <DrawerHeader />
                    {children}
                </Box>
            </Box >
        </>
    );
}


export default HeaderWrapper;