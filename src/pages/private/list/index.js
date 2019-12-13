import React, { useEffect, useState } from 'react';

// material-ui
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

//icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


// app components
import { usePouchDB } from '../../../components/PouchDB/PouchDBProvider';
import AppPageLoading from '../../../components/AppPageLoading';
//utils
//import uuidv1 from 'uuid/v1';
// styles
import useStyles from './styles';

// images
import kb from '../../../images/kb.png';

//utils 
import qs from 'query-string';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';


function Home({ history, match, location }) {

    const classes = useStyles();
    const { user: { metadata }, dataKK, dataKB, dataPK, dataBkkbn } = usePouchDB();
    const [dataBkkbnDocs, setDataBkkbnDocs] = useState([]);
    const [isFetching, setFetching] = useState(true);
    const [isDeleting, setDeleting] = useState(false);
    const [kepalaKels, setKepalaKels] = useState([])
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        let didCancel = false;
        const getAllDataBkkbn = async () => {
            setFetching(true)
            try {
                const query = await dataBkkbn.local.find({
                    selector: {
                        user_name: { $eq: metadata.name }
                    }
                });


                if (!didCancel) {
                    setDataBkkbnDocs(query.docs)
                }
            }
            catch (e) {

            }
            if (!didCancel) {
                setFetching(false);
            }
        }

        getAllDataBkkbn();

        return () => {
            didCancel = true;
        }

    }, [])

    useEffect(() => {

        const queryParams = qs.parse(location.search)
        let kepalas = dataBkkbnDocs.filter(kkDoc => typeof kkDoc.data_nik !== 'undefined').map(kkDoc => {
            let findKepala = kkDoc.data_nik.find(data_nik => data_nik.sts_hubungan);
            if (!findKepala) {
                findKepala = kkDoc.data_nik[0]
            }
            return {
                ...findKepala,
                no_kk: kkDoc.no_kk
            }
        })
        if (queryParams.query) {

            kepalas = kepalas.filter(kepala => {
                return kepala.nama_anggotakel.toLowerCase().includes(queryParams.query.toLowerCase());
            })
        }

        setKepalaKels(kepalas);

    }, [dataBkkbnDocs, location.search])



    const deleteKel = no_kk => async (e) => {
        if (!window.confirm("Kamu yakin ingin menghapus data ini?")) {
            return false
        }
        setDeleting(true)
        try {
            //remove from local
            const kkDoc = await dataBkkbn.local.get(no_kk);
            await dataBkkbn.local.put({ ...kkDoc, _deleted: true });

            const kbQuery = await dataBkkbn.local.find({
                selector: {
                    No_KK: { $eq: no_kk }
                }
            })
            if (kbQuery.docs.length > 0)
                await dataBkkbn.local.bulkDocs(kbQuery.docs.map(doc => ({ ...doc, _deleted: true })))


            const pkQuery = await dataBkkbn.local.find({
                selector: {
                    No_KK: { $eq: no_kk }
                }
            })
            if (pkQuery.docs.length > 0)
                await dataBkkbn.local.bulkDocs(pkQuery.docs.map(doc => ({ ...doc, _deleted: true })))


             // // remove data from remote
            // const kkDocR = await dataKK.remote.get(no_kk);
            // await dataKK.remote.put({ ...kkDocR, _deleted: true });

            // const kbQueryR = await dataKB.remote.find({
            //     selector: {
            //         No_KK: { $eq: no_kk }
            //     }
            // })
            // if (kbQueryR.docs.length > 0)
            //     await dataKB.remote.bulkDocs(kbQueryR.docs.map(doc => ({ ...doc, _deleted: true })))


            // const pkQueryR = await dataPK.remote.find({
            //     selector: {
            //         No_KK: { $eq: no_kk }
            //     }
            // })
            // if (pkQueryR.docs.length > 0)
            //     await dataPK.remote.bulkDocs(pkQueryR.docs.map(doc => ({ ...doc, _deleted: true })))
            

            enqueueSnackbar("Data berhasil dihapus", { variant: "success" })
            const query = await dataBkkbn.local.find({
                selector: {
                    user_name: { $eq: metadata.name }
                }
            });
            setDataBkkbnDocs(query.docs)
        } catch (e) {

            console.log(e);
            enqueueSnackbar("Gagal menghapus data: " + e.message, { variant: "error" })

        }
        setDeleting(false)

    }


    if (isFetching) {
        return <AppPageLoading />
    }


    return (
        <Container maxWidth="md" className={classes.container}>

            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.textCenter}>
                    <Typography variant="h5" component="h1">List Keluarga</Typography>

                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                {
                    kepalaKels.length <= 0 &&
                    <Grid item xs={12} className={classes.textCenter}>

                        <Typography>Data tidak ditemukan!</Typography>
                    </Grid>
                }
                <Grid item xs={12} >
                    <List>
                        {kepalaKels.map((kepala) => {
                            return <ListItem divider key={kepala.no_kk}>
                                <ListItemText
                                    primary={kepala.nama_anggotakel}
                                    secondary={`NIK.${kepala.nik}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        disabled={isDeleting}
                                        component={Link} to={`form/edit/${kepala.no_kk}`} edge="end" aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        disabled={isDeleting}
                                        edge="end" aria-label="delete"
                                        onClick={deleteKel(kepala.no_kk)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>

                        })}
                    </List>

                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;