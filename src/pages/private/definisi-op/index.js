import React, { useEffect, useState } from 'react';

// material-ui
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles';

function DefOP() {

    const classes = useStyles();



    return (
        <Container maxWidth="md" className={classes.container}>

            <Grid container spacing={3}>

                <Grid item xs={12} className={classes.textCenter}>
                    <Typography variant="h5" component="h1">Definisi Operasional</Typography>

                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>

        </Container>
    )
}

export default DefOP;