import React from 'react';


// material-ui

import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';


import useStyles from './styles';
import logo from '../../images/logo.png';

function AppLoading() {

    const classes = useStyles();


    return (
        <Container maxWidth="xs">
            <div className={classes.loadingBox}>
                <div className={classes.textCenter}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <Typography
                        variant="h6"
                        component="h2"
                        className={classes.title}
                    >
                        BKKBN
                </Typography>
                </div>
                <LinearProgress />
            </div>
        </Container>
    )
}

export default AppLoading;