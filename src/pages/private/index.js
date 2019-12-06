import React from 'react';

//material ui components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';
import CircularProgress from '@material-ui/core/CircularProgress';
// material ui icons
import SignOutIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

//styles
import useStyles from './styles';

//react router 
import { Switch, Route, Link } from 'react-router-dom';

// komponen halaman private
import Home from './home';
import List from './list';
import Form from './forms/index';
import EditForm from './forms/edit';
import DefOP from './definisi-op/index';
import { usePouchDB } from '../../components/PouchDB/PouchDBProvider';
import { useDataSync } from '../../components/PouchDB/DataSyncProvider';
import Copyright from '../../components/Copyright';
//images
import logo from '../../images/logo.png';
import { Divider } from '@material-ui/core';
import qs from 'query-string';

// offline detector
import { Detector } from "react-detect-offline";
import Connected from '@material-ui/icons/Wifi';
import Disconnected from '@material-ui/icons/WifiOff';
import Tooltip from '@material-ui/core/Tooltip';

export default function Private({ history, match, location }) {
    const classes = useStyles();
    const queryString = qs.parse(location.search)
    const { logoutAndClearLocal, user } = usePouchDB();
    const { isSyncing } = useDataSync();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElSearch, setAnchorElSearch] = React.useState(null);
    const handleClickSearch = event => {
        setAnchorElSearch(event.currentTarget);
    };

    const handleCloseSearch = () => {
        setAnchorElSearch(null)
    }

    const handleClickMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async (ev) => {

        try {
            await logoutAndClearLocal()
        } catch (e) {
            console.log(e)
        }
    }

    const [openNotification, setOpenNotification] = React.useState(null);

    const handleClickNotification = event => {
        if (openNotification && openNotification.contains(event.target)) {
            setOpenNotification(null);
        } else {
            setOpenNotification(event.currentTarget);
        }
        //isSyncing.statusNotif.count = 0;
    };

    const handleCloseNotification = () => {
        setOpenNotification(null);
    };

    return (
        <div className={classes.root}>

            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Hidden xsDown>
                        <div className={classes.title}>
                            <Link to="/">
                                <img src={logo} alt="logo" className={classes.logo} />
                            </Link>
                        </div>

                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                value={queryString.query || ''}
                                onChange={(e) => {

                                    history.push({ pathname: '/list', search: `?query=${e.target.value}` })
                                }}
                            />
                        </div>
                    </Hidden>
                    <Hidden smUp>
                        <div className={classes.searchMobile}>
                            <IconButton onClick={handleClickSearch} aria-label="show 4 new mails">
                                <SearchIcon />
                            </IconButton>
                            <Popover
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                anchorEl={anchorElSearch}
                                open={Boolean(anchorElSearch)}
                                onClose={handleCloseSearch}
                            >
                                <InputBase
                                    autoFocus
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInputMobile,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={queryString.query || ''}
                                    onChange={(e) => {

                                        history.push({ pathname: '/list', search: `?query=${e.target.value}` })
                                    }}
                                />
                            </Popover>
                        </div>
                    </Hidden>

                    <div className={classes.space}></div>
                    {isSyncing.syncBkkbn ? <Tooltip title="Syncing..." aria-label="syncing"><CircularProgress size={24} /></Tooltip > : <Detector
                        render={({ online }) => {
                            return online ? <Connected className={classes.iconColor} /> : <Disconnected className={classes.iconColor} />;
                        }}
                    />}
                    <IconButton aria-label="show 4 new mails" className={classes.iconColor}>
                        <Badge badgeContent={0} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>

                    <IconButton aria-label="show 17 new notifications" className={classes.iconColor} onClick={handleClickNotification}>
                        <Badge badgeContent={isSyncing.statusNotif.count} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                        <Hidden xsDown implementation="css">
                            <p onClick={handleCloseNotification} className={classes.linkText}></p>
                        </Hidden>
                    </IconButton>

                    <Menu
                        id="menu-notif"
                        open={Boolean(openNotification)}
                        anchorEl={openNotification}

                        keepMounted

                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        onClose={handleCloseNotification}
                        getContentAnchorEl={null}
                    >
                        {isSyncing.statusNotif.message.length <= 0 && <MenuItem>Belum ada notifikasi</MenuItem>}
                        {isSyncing.statusNotif.message.length > 0 && isSyncing.statusNotif.message.map((item, index) => (
                            <MenuItem
                                key={item}
                                onClick={handleCloseNotification}
                                className={classes.notifItem}
                            >
                                {item.content}
                            </MenuItem>
                        ))}
                    </Menu>



                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleClickMenu}
                        color="inherit"
                    >
                        <Avatar className={classes.orangeAvatar}>{user.metadata.firstName.charAt(0) + user.metadata.lastName.charAt(0)}</Avatar>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={() => {
                            history.push('/')
                            handleCloseMenu()
                        }}>
                            <ListItemIcon><HomeIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Home" /></MenuItem>
                        <MenuItem onClick={() => {
                            history.push('/form')
                            handleCloseMenu()
                        }}><ListItemIcon><UserIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Isi Form Pendataan Keluarga" /></MenuItem>
                        <MenuItem onClick={() => {
                            history.push('/list')
                            handleCloseMenu()
                        }}><ListItemIcon><PeopleIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="List Keluarga" /></MenuItem>
                        <Divider />
                        <MenuItem onClick={handleSignOut}><ListItemIcon><SignOutIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Logout" /></MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="md" className={classes.container}>

                    <Switch>
                        <Route exact path="/form" component={Form} />
                        <Route path="/form/edit/:no_kk" component={EditForm} />
                        <Route path="/list" component={List} />
                        <Route path="/definisi-operasional" component={DefOP} />
                        <Route component={Home} />
                    </Switch>

                </Container>
                <footer className={classes.footer}>
                    <Container maxWidth="sm">

                        <Copyright />
                    </Container>
                </footer>
            </main>

        </div >
    );
}

