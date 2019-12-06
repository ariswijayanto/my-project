import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserIcon from '@material-ui/icons/Person';
import useStyles from './styles/finish';
import { usePouchDB } from '../../../components/PouchDB/PouchDBProvider';
import { useSnackbar } from 'notistack';
import { countAge } from './pk/validation';
import lodashGet from 'lodash/get';
import SaveIcon from '@material-ui/icons/Save';

import { renderDataKK, renderDataNIK } from './preview';


function Finish({ wilayah, keluarga, normalizePK,
    normalizeKB, resetForm, mode, no_kk }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { user: { metadata }, dataKK, dataPK, dataKB, dataBkkbn } = usePouchDB();
    const [expanded, setExpanded] = useState('panel1a');
    const [isSubmitting, setSubmitting] = useState({
        local: false,
        remote: false
    });
    const [isSaved, setSaved] = useState({
        local: false,
        remote: false
    })
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const saveTo = target => async (e) => {
        // put data utama to KK
        const dataKKUtama = {
            _id: wilayah.no_kk,

            user_name: metadata.name,
            id_prov: parseInt(metadata.wil_provinsi.id_provinsi),
            id_kab: parseInt(metadata.wil_kabupaten.id_kabupaten),
            id_kec: parseInt(metadata.wil_kecamatan.id_kecamatan),
            id_kel: parseInt(metadata.wil_kelurahan.id_kelurahan),
            ...wilayah,
            id_rw: parseInt(wilayah.id_rw),
            id_rt: parseInt(wilayah.id_rt),
        };

        const data_nik = Object.keys(keluarga).map(_id => {

            return {
                ...keluarga[_id],
                sts_hubungan: parseInt(keluarga[_id].sts_hubungan),
                sts_kawin: parseInt(keluarga[_id].sts_kawin),
                jns_pendidikan: parseInt(keluarga[_id].jns_pendidikan),
                jns_asuransi: parseInt(keluarga[_id].jns_asuransi),
                id_agama: parseInt(keluarga[_id].id_agama),
                id_pekerjaan: parseInt(keluarga[_id].id_pekerjaan),
                usia_kawin: parseInt(lodashGet(keluarga[_id], 'usia_kawin', 0)),
                sts_hubanak_ibu: parseInt(lodashGet(keluarga[_id], 'sts_hubanak_ibu', 0)),
                kd_ibukandung: parseInt(lodashGet(keluarga[_id], 'kd_ibukandung', 0)),
                umur: countAge(keluarga[_id].tgl_lahir)
            }
        })
        //simpan ke db local
        setSubmitting(curr => ({ ...curr, [target]: true }));
        try {
            const dataKKAll = {
                ...dataKKUtama,
                periode_sensus: 2020,
                status_sensus: "",
                data_nik
            }

            const dataKBAll = Object.values(normalizeKB);
            const dataPKAll = Object.values(normalizePK);

            await dataKK[target].put(dataKKAll);
            if (dataKBAll.length > 0) {
                await dataKB[target].bulkDocs(dataKBAll);
            }

            if (dataPKAll.length > 0) {
                await dataPK[target].bulkDocs(dataPKAll);
            }

            const data_kb = Object.values(normalizeKB);
            const data_pk = Object.values(normalizePK);

            //05Des2019
            
            const dataBkkbnAll = {
                ...dataKKUtama,
                periode_sensus: 2020,
                status_sensus: "",
                data_nik, data_kb, data_pk
            }

            await dataBkkbn[target].put(dataBkkbnAll);

            let message = mode === 'edit' ? `Data berhasil diperbarui` : `Data berhasil disimpan ke ${target} DB`
            enqueueSnackbar(message, { variant: "success" })
            // enqueueSnackbar(`Mereplikasi data ${target} ke remote DB`, { variant: "info" })
            // await dataKK.local.replicate.to(dataKK.remote, {
            //     query_params: { no_kk: wilayah.no_kk },
            //     filter: function (doc, params) {

            //         return doc.no_kk === params.query.no_kk
            //     }
            // })
            // if (dataKBAll.length > 0) {

            //     await dataKB.local.replicate.to(dataKB.remote, {
            //         query_params: { no_kk: wilayah.no_kk },
            //         filter: function (doc, params) {

            //             return doc.No_KK === params.query.no_kk
            //         }
            //     })
            // }
            // if (dataPKAll.length > 0) {
            //     await dataPK.local.replicate.to(dataPK.remote, {
            //         query_params: { no_kk: wilayah.no_kk },
            //         filter: function (doc, params) {

            //             return doc.No_KK === params.query.no_kk
            //         }
            //     })
            // }

            // enqueueSnackbar(`Berhasil mereplikasi data ${target} ke remote DB`, { variant: "success" })

            // PouchDB.replicate(dataKK.local, dataKK.remote,{});

            setSubmitting(curr => ({ ...curr, [target]: false }));
            setSaved(curr => ({ ...curr, [target]: true }));



        } catch (e) {

            setSubmitting(curr => ({ ...curr, [target]: false }));
            enqueueSnackbar(e.message, { variant: 'error' })
            if (e.message.includes("The database connection is closing")) {
                window.location.href = "/login"
            }
        }

    }

    return <Grid container spacing={2}>
        <Grid item xs={12} className={classes.textCenter}>
            <Typography variant="h5" component="h1">{mode === 'edit' ? `Preview Edit Data` : 'Preview Data'}</Typography>
            {mode === 'edit' && <Typography>No KK: {no_kk}</Typography>}

        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>
        <Grid item xs={12}>
            <ExpansionPanel expanded={expanded === 'panel1a'} onChange={handleChange('panel1a')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Data KK</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {renderDataKK(metadata, wilayah)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel1b'} onChange={handleChange('panel1b')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Data Anggota Keluarga</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={2}>
                        {Object.values(keluarga).map(kel => <Grid key={kel.no_urutnik} item xs={12}>
                            {renderDataNIK(kel)}
                        </Grid>)}

                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>

        <Grid item >

            <div className={classes.btnWrap}>
                <Button

                    disabled={isSubmitting.local || isSaved.local}
                    size="large" variant="contained" color="primary" onClick={saveTo('local')}> <SaveIcon className={classes.iconLeft} /> {mode === 'edit' ? 'Perbarui' : 'Simpan'} Data</Button>
                {isSubmitting.local && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </Grid>

        <Grid item>

            <div className={classes.btnWrap}>
                <Button

                    onClick={resetForm}
                    disabled={isSubmitting.local || !isSaved.local}
                    size="large" variant="contained"  ><UserIcon className={classes.iconLeft} />Isi Data Baru</Button>
            </div>
        </Grid>

    </Grid>
}


export default Finish;
