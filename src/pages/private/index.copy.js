import React from 'react';

//material ui components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


// material ui icons

import SignOutIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import MenuIcon from '@material-ui/icons/Menu';

import SearchIcon from '@material-ui/icons/Search';

//styles
import useStyles from './styles';

//react router 
import { Switch, Route } from 'react-router-dom';

// komponen halaman private
import Home from './home';
import Form from './forms/index';
import { usePouchDB } from '../../components/PouchDB/PouchDBProvider';
import Copyright from '../../components/Copyright';
//images
import logo from '../../images/logo.png';
import { Divider } from '@material-ui/core';

export default function Private({ history }) {
    const classes = useStyles();

    const { logoutAndClearLocal } = usePouchDB();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async (e) => {
        try {
            await logoutAndClearLocal()
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={classes.root}>

            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <img src={logo} alt="logo" className={classes.logo} />

                    <Hidden mdUp>
                        <Typography component="h1" variant="h6" noWrap className={classes.title}>
                            <Switch>

                                <Route path="/affiliate" children=" Rekap Pendataan" />
                                <Route path="/form" children=" Isi Form Pendataan Keluarga" />

                                <Route children="Home" />

                            </Switch>
                        </Typography>
                        <IconButton

                            edge="start"
                            color="inherit"
                            aria-label="Open Menu"
                            aria-controls="simple-menu" aria-haspopup="true"
                            onClick={handleClickMenu}

                        >
                            <MenuIcon className={classes.menuIcon} />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
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
                                history.push('/rekap')
                                handleCloseMenu()
                            }}><ListItemIcon><PeopleIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Rekap Pendataan" /></MenuItem>
                            <Divider />
                            <MenuItem onClick={handleSignOut}><ListItemIcon><SignOutIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Logout" /></MenuItem>

                        </Menu>

                    </Hidden>
                    <Hidden smDown>
                        <Route path="/" exact={true} children={({ match }) => {

                            return (

                                <Button
                                    size="large"
                                    variant={match ? 'outlined' : 'text'} className={classes.buttonToolbar}
                                    onClick={() => history.push('/')}>
                                    <HomeIcon className={classes.iconLeft} />
                                    Home
                            </Button>
                            )
                        }} />

                        <Route path="/form" children={({ match }) => {

                            return (

                                <Button
                                    size="large"
                                    variant={match ? 'outlined' : 'text'} className={classes.buttonToolbar}
                                    onClick={() => history.push('/form')}>
                                    <UserIcon className={classes.iconLeft} />
                                    Isi Form Pendataan Keluarga
                            </Button>
                            )
                        }} />
                        <Route path="/rekap" children={({ match }) => {

                            return (

                                <Button
                                    size="large"
                                    variant={match ? 'outlined' : 'text'} className={classes.buttonToolbar}
                                    onClick={() => history.push('/rekap')}>
                                    <PeopleIcon className={classes.iconLeft} />
                                    Rekap Pendataan
                            </Button>
                            )
                        }} />

                        <Button
                            size="large"
                            onClick={handleSignOut}

                            className={classes.buttonToolbar}
                        >

                            <SignOutIcon className={classes.iconLeft} />
                            Logout

                    </Button>
                    </Hidden>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="md" className={classes.container}>

                    <Switch>
                        <Route path="/form" component={Form} />
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

