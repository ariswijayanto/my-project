import React, { useState } from 'react';

// import komponen material-ui
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// import styles
import useStyles from './styles';

// react router dom
import { Link, Redirect } from 'react-router-dom';

// pouchdb hook
import { usePouchDB } from '../../components/PouchDB/PouchDBProvider';

// app components
import AppLoading from '../../components/AppLoading';

import logo from '../../images/logo.png';
import { useSnackbar } from 'notistack';

function Login(props) {
    const { location } = props;
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState({
        username: '',
        password: ''
    })
    const [isSubmitting, setSubmitting] = useState(false);

    const { auth, user, setUser } = usePouchDB();

    const handleChange = e => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ''
        })
    }

    const validate = () => {

        const newError = { ...error };

        if (!form.username) {
            newError.username = 'User wajib diisi';
        }

        if (!form.password) {
            newError.password = 'Password wajib diisi';
        }


        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')) {
            setError(findErrors);

        } else {
            try {
                setSubmitting(true);
                const response = await auth.logIn(form.username, form.password);

                const { ok, ...userCtx } = response;
                if (ok) {
                    // const metadata = await auth.getUser(userCtx.name);
                    setUser(user => ({
                        ...user,
                        isLoggedIn: true,
                        userCtx,
                        // metadata
                    }))
                }

            } catch (e) {
                console.log(e.name, e.message, JSON.stringify(e))

                const newError = {};

                if (e.name === 'unauthorized' || e.name === 'forbidden') {
                    // name or password incorrect
                    newError.password = "User atau Password salah"
                } else if (e.name === 'not_found') {
                    newError.password = "User tidak ditemukan"
                } else if (e.name === 'unknown') {
                    enqueueSnackbar('Anda sedang offline, login hanya bisa dilakukan saat anda online', { variant: 'error' })
                } else {
                    enqueueSnackbar('Terjadi kesalahan silahkan coba lagi', { variant: 'error' })
                }

                setError(newError);
                setSubmitting(false);

            }

        }
    }


    if (user.loading) {

        return <AppLoading />
    }
    if (user.isLoggedIn) {
        const redirecTo = location.state && location.state.from && location.state.from.pathname ? location.state.from.pathname : '/';
        return <Redirect to={redirecTo} />
    }


    return <Container maxWidth="xs" className={classes.container}>
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.textCenter}>
                <img src={logo} className={classes.logo} alt="logo" />
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>

                    <Typography
                        variant="h5"
                        component="h1"
                        className={classes.title}>Login</Typography>

                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            id="username"
                            type="username"
                            name="username"
                            margin="normal"
                            label="Username"
                            fullWidth
                            required
                            value={form.username}
                            onChange={handleChange}
                            helperText={error.username}
                            error={error.username ? true : false}
                            disabled={isSubmitting}
                        />
                        <TextField
                            variant="outlined"
                            id="password"
                            type="password"
                            name="password"
                            margin="normal"
                            label="Password"
                            fullWidth
                            required
                            value={form.password}
                            onChange={handleChange}
                            helperText={error.password}
                            error={error.password ? true : false}
                            disabled={isSubmitting}
                        />


                        <Grid container className={classes.buttons}>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    disabled={isSubmitting}
                                    type="submit" color="primary" variant="contained"
                                    size="large"
                                >Login</Button>
                            </Grid>

                        </Grid>




                    </form>

                </Paper>
            </Grid>
            <Grid item xs={12} className={classes.textCenter}>
                <Typography>&copy; {new Date().getFullYear()} BKKBN</Typography>
            </Grid>
        </Grid>
    </Container>
}

export default Login;