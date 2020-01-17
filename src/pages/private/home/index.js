import React, { useEffect, useState } from 'react';

// material-ui
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';

//icons
import People from '@material-ui/icons/People';
import BarChart from '@material-ui/icons/BarChart';
import Map from '@material-ui/icons/Map';
import Create from '@material-ui/icons/Create';
import Book from '@material-ui/icons/Book';


// app components
import { usePouchDB } from '../../../components/PouchDB/PouchDBProvider';

//utils
//import uuidv1 from 'uuid/v1';
// styles
import useStyles from './styles';

// images
import kb from '../../../images/kb.png';
import { useDataSync } from '../../../components/PouchDB/DataSyncProvider';



function Home({ history }) {

    const classes = useStyles();
    const { user, dataBkkbn } = usePouchDB();
    const { isSyncing } = useDataSync();
    const metadata = user.metadata;
    const [wilayahkerja, setWilayahKerja] = useState('');
    const [targetkk, setTragetKK] = useState(0);
    const [totalDataKK, setTotalDataKK] = useState(0);
    //console.log(metadata)
    const createForm = (e) => {
        history.push(`/form`);
    }



    useEffect(() => {
        //  if (!isSyncing.syncKK) {
        if (parseInt(metadata.tingkatwilayahid) === 5) {
            //console.log('rw')
            const rws = metadata.wil_rw.map(wil_rw => wil_rw.nama_rw);
            const counttargetkk = metadata.wil_rw.reduce((total, current) => {

                return total + parseInt(current.targetkk);
            }, 0)
            setTragetKK(counttargetkk)
            setWilayahKerja(`${metadata.wil_kelurahan.nama_kelurahan} RW:${rws.join()}`)

        } else if (parseInt(metadata.tingkatwilayahid) === 6) {

            if (metadata.wil_rw.length > 0) {
                const wil_rw = metadata.wil_rw[0];
                const rts = wil_rw.wil_rt.map(wil_rt => wil_rt.nama_rt);
                const counttargetkk = wil_rw.wil_rt.reduce((total, current) => {

                    return total + parseInt(current.targetkk);
                }, 0)
                setTragetKK(counttargetkk)
                setWilayahKerja(`${metadata.wil_kelurahan.nama_kelurahan} RW:${wil_rw.nama_rw} RT:${rts.join()}`)
            }

        }
        //}
    }, [metadata])
    useEffect(() => {
        let didCancel = false;
        const getAllDataKK = async () => {

            const query = await dataBkkbn.local.find({
                selector: {
                    user_name: { $eq: metadata.name }
                }
            });


            // console.log(query, await dataKK.local.allDocs())


            if (!didCancel)
                setTotalDataKK(query.docs.length)
        }

        getAllDataKK();


        return () => {
            didCancel = true
        }
    }, [metadata, dataBkkbn.local])

    return (
        <Container maxWidth="md" className={classes.container}>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.progressKerja} elevation={0}>
                        <div className={classes.floatRightIcon}>
                            <BarChart fontSize="large" />
                        </div>
                        <Typography variant="h5" >Progress Kerja</Typography>
                        <Typography variant="subtitle1" >{totalDataKK} dari {targetkk} Keluarga</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.wilayahKerja} elevation={0}>
                        <div className={classes.floatRightIcon}>
                            <Map fontSize="large" />
                        </div>
                        <Typography variant="h5" >Wilayah Kerja</Typography>
                        <Typography variant="subtitle1" >{wilayahkerja}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <ButtonBase className={classes.fullWidth} onClick={createForm}>
                        <Paper className={classes.blueGreyBackground} elevation={0}>
                            <Create />
                            <Typography>
                                Entry Here</Typography>
                        </Paper>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ButtonBase className={classes.fullWidth} onClick={() => {
                        history.push('/list')
                    }}>
                        <Paper className={classes.blueGreyBackground} elevation={0}>
                            <People />
                            <Typography>
                                List Keluarga</Typography>
                        </Paper>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ButtonBase onClick={() => {
                        history.push('/definisi-operasional')
                    }} className={classes.fullWidth}>
                        <Paper className={classes.blueGreyBackground} elevation={0}>
                            <Book />
                            <Typography>
                                Definisi Operasional</Typography>
                        </Paper>
                    </ButtonBase>
                </Grid>
            </Grid>

            {/* <img src={kb} alt="kb" className={classes.imgResponsive} />
          
            <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={createForm}
            >
                <Person className={classes.iconLeft} />
                Isi Form Pendataan Keluarga
                </Button> */}

        </Container>
    )
}

export default Home;