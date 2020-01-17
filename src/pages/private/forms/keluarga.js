import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// material ui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DatePicker } from "@material-ui/pickers";


import { Swipeable } from 'react-swipeable';
//icons
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

//styles
import useStyles from './styles/keluarga';

// //hooks
// import { usePouchDB } from '../../../components/PouchDB/PouchDBProvider';
import { useSnackbar } from 'notistack';


//app components
import { ScrollToTopWithoutRouter } from '../../../components/ScrollToTop';

//date utils
import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';
import { countAge } from './pk/validation';

export const formatString = "dd-MM-yyyy";

function Keluarga({ id, keluarga, setKeluarga, handleNext, handleBack, formIndex, mode, no_kk }) {
    const classes = useStyles();
    const nextRef = useRef(null);
    const backRef = useRef(null);
    // const { dataKK } = usePouchDB();
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState({

    })

    const [isSomethingChange, setSomethingChange] = useState(false);

    const [isSubmitting, setSubmitting] = useState(false);

    //reset error
    useEffect(() => {
        setError({})
    }, [id])


    const handleChange = (e) => {

        if (e.target.type === "number") {
            if (parseInt(e.target.value) < 0)
                return false;

            if (e.target.name === "nik" && e.target.value.length > 16) {
                return false;
            }
        }

        setKeluarga({
            ...keluarga,
            [id]: {
                ...keluarga[id],
                [e.target.name]: e.target.value
            }
        })

        setError({
            ...error,
            [e.target.name]: ""
        })

        setSomethingChange(true)
    }

    const handleDateChange = name => newDate => {

        const value = formatDate(newDate, formatString)

        handleChange({ target: { value, name } })
    }


    const selectedKeluarga = keluarga[id];

    const validate = () => {
        let newError = {};

        if (!selectedKeluarga.nama_anggotakel) {
            newError.nama_anggotakel = "Nama Lengkap wajib diisi";
        }

        if (!selectedKeluarga.nik) {
            newError.nik = "NIK wajib diisi";
        }
        else if (selectedKeluarga.nik.length !== 16) {
            newError.nik = "NIK harus 16 digit";
        }

        if (!selectedKeluarga.jenis_kelamin) {
            newError.jenis_kelamin = "Jenis Kelamin wajib diisi";
        }

        if (!selectedKeluarga.sts_hubungan) {
            newError.sts_hubungan = "Hubungan dengan Kepala Keluarga wajib diisi";
        }
        else if (selectedKeluarga.sts_hubungan === "1") {
            const cekKepalaKeluarga = Object.values(keluarga).find(kel => kel.sts_hubungan === "1");
            if (cekKepalaKeluarga && cekKepalaKeluarga.no_urutnik !== selectedKeluarga.no_urutnik) {
                newError.sts_hubungan = "Hanya boleh ada satu Kepala Keluarga";
            }
        }
        else if (selectedKeluarga.sts_hubungan === "2") {
            const cekIstri = Object.values(keluarga).find(kel => kel.sts_hubungan === "2")

            if (cekIstri && cekIstri.no_urutnik !== selectedKeluarga.no_urutnik) {
                newError.sts_hubungan = "Hanya boleh ada satu Istri";
            }
        }

        if (selectedKeluarga.sts_hubungan === "3" && !selectedKeluarga.sts_hubanak_ibu) {
            newError.sts_hubanak_ibu = "Hubungan Anak dengan Ibu wajib diisi";
        }

        if (selectedKeluarga.sts_hubanak_ibu === "1") {
            if (!selectedKeluarga.kd_ibukandung) {
                newError.kd_ibukandung = "Kode Ibu Kandung wajib diisi";
            } else {

                const cekIstri = Object.values(keluarga).find(kel => kel.no_urutnik === selectedKeluarga.kd_ibukandung);
                if (cekIstri && cekIstri.sts_hubungan !== "2") {
                    newError.kd_ibukandung = "Kode Ibu Kandung harus istri dari kepala keluarga";
                }

            }
        }

        if (!selectedKeluarga.sts_akta) {
            newError.sts_akta = "Status Akta Lahir wajib diisi";
        }
        if (!selectedKeluarga.tgl_lahir) {
            newError.tgl_lahir = "Tanggal Lahir wajib diisi";
        }

        if (!selectedKeluarga.sts_kawin) {
            newError.sts_kawin = "Status Perkawinan wajib diisi";
        }
        else if (selectedKeluarga.sts_hubungan === "2" && selectedKeluarga.sts_kawin !== "2") {
            newError.sts_kawin = "Istri harus berstatus Kawin";
        }
        else if (selectedKeluarga.sts_hubungan === "3" && selectedKeluarga.sts_kawin === "2") {
            newError.sts_kawin = "Anak tidak boleh berstatus Kawin";
        }

        if (['2', '3', '4'].includes(selectedKeluarga.sts_kawin)) {

            if (!selectedKeluarga.usia_kawin) {
                newError.usia_kawin = "Usia Kawin wajib diisi";
            } else if (parseInt(selectedKeluarga.usia_kawin) < 10) {
                newError.usia_kawin = "Usia Kawin tidak boleh diisi < 10";
            } else if (selectedKeluarga.tgl_lahir && parseInt(selectedKeluarga.usia_kawin) >= countAge(selectedKeluarga.tgl_lahir)) {
                newError.usia_kawin = "Usia Kawin tidak boleh lebih besar dari umur";
            }



        }

        if (!selectedKeluarga.jns_pendidikan) {
            newError.jns_pendidikan = "Pendidikan wajib diisi";
        }

        if (!selectedKeluarga.jns_asuransi) {
            newError.jns_asuransi = "Kepesertaan JKN wajib diisi";
        }

        if (!selectedKeluarga.id_agama) {
            newError.id_agama = "Agama wajib diisi";
        }

        if (!selectedKeluarga.id_pekerjaan) {
            newError.id_pekerjaan = "Pekerjaan wajib diisi";
        }



        // if (!selectedKeluarga.keberadaan) {
        //     newError.keberadaan = "Keberadaan Anggota Keluarga wajib diisi";
        // }

        return newError;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const findErrors = validate();

        const errorValues = Object.values(findErrors);

        if (errorValues.length > 0 && errorValues.some(err => err !== '')) {
            setError(findErrors);
        } else {
            if (!isSomethingChange) {
                return handleNext()
            }
            //simpan ke db local
            setSubmitting(true);
            try {
                // const existing = await dataKK.local.get(id)

                // await dataKK.local.put({
                //     _id: id,
                //     _rev: existing._rev,
                //     type: 'anggota',
                //     ...selectedKeluarga
                // })
                setSubmitting(false)
                setSomethingChange(false);
                handleNext()
            } catch (e) {
                setSubmitting(false);
                if (e.name === 'not_found') {
                    try {
                        // await dataKK.local.put({
                        //     _id: id,
                        //     type: 'anggota',
                        //     ...selectedKeluarga
                        // })

                        setSomethingChange(false);
                        handleNext()
                    } catch (e) {
                        enqueueSnackbar(e.message, { variant: 'error' })
                    }
                } else {
                    enqueueSnackbar(e.message, { variant: 'error' })
                }

            }


        }
    }

    return (
        <Swipeable
            trackMouse={true}
            onSwipedRight={(e) => {

                if (backRef) {
                    backRef.current.click()
                }
            }}
            onSwipedLeft={(e) => {
                if (nextRef) {

                    nextRef.current.click();
                }
            }}
        >
            <form onSubmit={handleSubmit} className={classes.form}>
                <ScrollToTopWithoutRouter />
                <Grid container spacing={3}>

                    <Grid item xs={12} className={classes.textCenter}>
                        <Typography variant="h5" component="h1">{mode === 'edit' ? `Edit Form Data Kependudukan` : 'Form Data Kependudukan'}</Typography>
                        {mode === 'edit' && <Typography>No KK: {no_kk}</Typography>}

                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            disabled={isSubmitting}
                            fullWidth
                            variant="outlined"
                            placeholder="Nama Anggota Keluarga"
                            value={selectedKeluarga.nama_anggotakel || ''}
                            name="nama_anggotakel"
                            id="nama_anggotakel"

                            onChange={handleChange}
                            error={error.nama_anggotakel ? true : false}
                            helperText={error.nama_anggotakel}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            disabled={isSubmitting}
                            fullWidth
                            variant="outlined"
                            placeholder="NIK"
                            value={selectedKeluarga.nik || ''}
                            name="nik"
                            id="nik"
                            type="number"
                            inputProps={{

                                min: 0
                            }}
                            onChange={handleChange}
                            error={error.nik ? true : false}
                            helperText={error.nik}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl
                            disabled={isSubmitting}
                            variant="outlined" fullWidth error={error.jenis_kelamin ? true : false}>

                            <Select
                                id="jenis_kelamin"
                                value={selectedKeluarga.jenis_kelamin || ''}
                                onChange={handleChange}
                                name="jenis_kelamin"
                                displayEmpty
                            >
                                <MenuItem value="">Pilih Jenis Kelamin</MenuItem>
                                <MenuItem value="1">Laki Laki</MenuItem>
                                <MenuItem value="2">Perempuan</MenuItem>
                            </Select>
                            <FormHelperText>{error.jenis_kelamin}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>

                        {/* <TextField
                            disabled={isSubmitting}
                            fullWidth
                            variant="outlined"
                            placeholder="Tanggal Lahir"
                            value={selectedKeluarga.tgl_lahir || ''}
                            name="tgl_lahir"
                            id="tgl_lahir"
                            type="date"
                            onChange={handleChange}
                            error={error.tgl_lahir ? true : false}
                            helperText={error.tgl_lahir}
                        /> */}
                        <DatePicker
                            fullWidth
                            variant="inline"
                            format={formatString}
                            // label="Tanggal Lahir"
                            // placeholder="Tanggal Lahir"
                            name="tgl_lahir"
                            id="tgl_lahir"
                            disableFuture
                            inputVariant="outlined"
                            emptyLabel="Tanggal Lahir"
                            value={selectedKeluarga.tgl_lahir ? parseDate(selectedKeluarga.tgl_lahir, formatString, new Date()) : null}
                            error={error.tgl_lahir ? true : false}
                            helperText={error.tgl_lahir}
                            //value={selectedDate}
                            onChange={handleDateChange('tgl_lahir')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl
                            disabled={isSubmitting}
                            variant="outlined" fullWidth error={error.sts_kawin ? true : false}>

                            <Select
                                id="sts_kawin"
                                value={selectedKeluarga.sts_kawin || ''}
                                onChange={handleChange}
                                name="sts_kawin"
                                displayEmpty
                            >
                                <MenuItem value="">Status Perkawinan</MenuItem>
                                <MenuItem value="1">Belum Kawin</MenuItem>
                                <MenuItem value="2">Kawin</MenuItem>
                                <MenuItem value="3">Cerai Hidup</MenuItem>
                                <MenuItem value="4">Cerai Mati</MenuItem>


                            </Select>
                            <FormHelperText>{error.sts_kawin}</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            disabled={isSubmitting || !['2', '3'].includes(selectedKeluarga.sts_kawin)}
                            fullWidth
                            variant="outlined"
                            placeholder="Usia Kawin"
                            value={selectedKeluarga.usia_kawin || ''}
                            name="usia_kawin"
                            id="usia_kawin"
                            type="number"
                            inputProps={{

                                min: 0
                            }}
                            onChange={handleChange}
                            error={error.usia_kawin ? true : false}
                            helperText={error.usia_kawin}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl
                            disabled={isSubmitting}
                            variant="outlined" fullWidth error={error.sts_akta ? true : false}>

                            <Select
                                id="sts_akta"
                                value={selectedKeluarga.sts_akta || ''}
                                onChange={handleChange}
                                name="sts_akta"
                                displayEmpty
                            >
                                <MenuItem value="">Memiliki Akta Lahir</MenuItem>
                                <MenuItem value="1">Ya</MenuItem>
                                <MenuItem value="2">Tidak</MenuItem>
                            </Select>
                            <FormHelperText>{error.sts_akta}</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl
                            disabled={isSubmitting}
                            variant="outlined" fullWidth error={error.sts_hubungan ? true : false}>

                            <Select
                                id="sts_hubungan"
                                value={selectedKeluarga.sts_hubungan || ''}
                                onChange={handleChange}
                                name="sts_hubungan"
                                displayEmpty
                            >
                                <MenuItem value="">Hubungan Dengan Kepala Keluarga</MenuItem>
                                <MenuItem value="1">Kepala Keluarga</MenuItem>
                                <MenuItem value="2">Istri</MenuItem>
                                <MenuItem value="3">Anak</MenuItem>
                                <MenuItem value="4">Lain-lain</MenuItem>


                            </Select>
                            <FormHelperText>{error.sts_hubungan}</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl
                            disabled={isSubmitting || selectedKeluarga.sts_hubungan !== "3"}
                            variant="outlined" fullWidth error={error.sts_hubanak_ibu ? true : false}>

                            <Select
                                id="sts_hubanak_ibu"
                                value={selectedKeluarga.sts_hubanak_ibu || ''}
                                onChange={handleChange}
                                name="sts_hubanak_ibu"
                                displayEmpty
                            >
                                <MenuItem value="">Hubungan Anak Dengan Ibu</MenuItem>
                                <MenuItem value="1">Ibu Kandung</MenuItem>
                                <MenuItem value="2">Ibu Angkat</MenuItem>
                                <MenuItem value="3">Ibu Tiri</MenuItem>
                                <MenuItem value="4">Lainnya</MenuItem>


                            </Select>
                            <FormHelperText>{error.sts_hubanak_ibu}</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl
                            disabled={isSubmitting || selectedKeluarga.sts_hubanak_ibu !== "1"}
                            variant="outlined" fullWidth error={error.kd_ibukandung ? true : false}>

                            <Select
                                disabled={isSubmitting || selectedKeluarga.sts_hubanak_ibu !== "1"}
                                id="kd_ibukandung"
                                value={selectedKeluarga.kd_ibukandung || ''}
                                onChange={handleChange}
                                name="kd_ibukandung"
                                displayEmpty
                            >
                                <MenuItem value="">Kode Ibu Kandung</MenuItem>
                                {Object.values(keluarga).map(kel => <MenuItem key={kel.no_urutnik} value={kel.no_urutnik}>{kel.no_urutnik}</MenuItem>)}



                            </Select>
                            <FormHelperText>{error.kd_ibukandung}</FormHelperText>
                        </FormControl>

                    </Grid>


                    <Grid item xs={12} sm={6} md={4}>

                        <FormControl
                            disabled={isSubmitting}
                            variant="outlined" fullWidth error={error.id_agama ? true : false}>

                            <Select
                                id="id_agama"
                                value={selectedKeluarga.id_agama || ''}
                                onChange={handleChange}
                                name="id_agama"
                                displayEmpty
                            >
                                <MenuItem value="">Agama yang dianut</MenuItem>
                                <MenuItem value="1">Islam</MenuItem>
                                <MenuItem value="2">Kristen</MenuItem>
                                <MenuItem value="3">Katolik</MenuItem>
                                <MenuItem value="4">Hindu</MenuItem>
                                <MenuItem value="5">Budha</MenuItem>
                                <MenuItem value="6">Konghucu</MenuItem>
                                <MenuItem value="7">Penghayat Kepercayaan</MenuItem>
                                <MenuItem value="8">Lainnya</MenuItem>
                            </Select>
                            <FormHelperText>{error.id_agama}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>

                        <FormControl
                            disabled={isSubmitting}
                            variant="outlined" fullWidth error={error.id_pekerjaan ? true : false}>

                            <Select
                                id="id_pekerjaan"
                                value={selectedKeluarga.id_pekerjaan || ''}
                                onChange={handleChange}
                                name="id_pekerjaan"
                                displayEmpty
                            >
                                <MenuItem value="">Pekerjaan Utama</MenuItem>
                                <MenuItem value="1">Tidak/Belum Bekerja</MenuItem>
                                <MenuItem value="2">Petani</MenuItem>
                                <MenuItem value="3">Nelayan</MenuItem>
                                <MenuItem value="4">Pedagang</MenuItem>
                                <MenuItem value="5">PNS/TNI/POLRI</MenuItem>
                                <MenuItem value="6">Pegawai Swasta</MenuItem>
                                <MenuItem value="7">Wiraswasta</MenuItem>
                                <MenuItem value="8">Pensiunan</MenuItem>
                                <MenuItem value="9">Pekerja Lepas</MenuItem>
                                <MenuItem value="10">Lainnya</MenuItem>
                            </Select>
                            <FormHelperText>{error.id_pekerjaan}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl
                            disabled={isSubmitting}
                            variant="outlined" fullWidth error={error.jns_pendidikan ? true : false}>

                            <Select
                                id="jns_pendidikan"
                                value={selectedKeluarga.jns_pendidikan || ''}
                                onChange={handleChange}
                                name="jns_pendidikan"
                                displayEmpty
                            >
                                <MenuItem value="">Pendidikan</MenuItem>
                                <MenuItem value="1">Tidak/Belum Sekolah</MenuItem>
                                <MenuItem value="2">Tidak Tamat SD/Sederajat</MenuItem>
                                <MenuItem value="3">Masih SD/Sederajat</MenuItem>
                                <MenuItem value="4">Tamat SD/Sederajat</MenuItem>
                                <MenuItem value="5">Masih SLTP/Sederajat</MenuItem>
                                <MenuItem value="6">Tamat SLTP/Sederajat</MenuItem>
                                <MenuItem value="7">Masih SLTA/Sederajat</MenuItem>
                                <MenuItem value="8">Tamat SLTA/Sederajat</MenuItem>
                                <MenuItem value="9">Masih PT/Akademi</MenuItem>
                                <MenuItem value="10">Tamat PT/Akademi</MenuItem>


                            </Select>
                            <FormHelperText>{error.jns_pendidikan}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>

                        <FormControl
                            disabled={isSubmitting}
                            variant="outlined" fullWidth error={error.jns_asuransi ? true : false}>

                            <Select
                                id="jns_asuransi"
                                value={selectedKeluarga.jns_asuransi || ''}
                                onChange={handleChange}
                                name="jns_asuransi"
                                displayEmpty
                            >
                                <MenuItem value="">Kepesertaan JKN/Asurasnsi Kesehatan lainnya</MenuItem>
                                <MenuItem value="1">BPJS-PBI/Jamkesmas/Jamkesda</MenuItem>
                                <MenuItem value="2">BPJS-Non PBI</MenuItem>
                                <MenuItem value="3">Swasta</MenuItem>
                                <MenuItem value="4">Tidak Memiliki</MenuItem>
                            </Select>
                            <FormHelperText>{error.jns_asuransi}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs>
                        <Button
                            ref={backRef}
                            // disabled={!isSomethingChange || isSubmitting}
                            onClick={() => {
                                handleBack()
                            }}><ChevronLeft className={classes.iconLeft} /> Sebelumnya </Button>

                    </Grid>
                    <Grid item>
                        {isSubmitting && <CircularProgress size={14} />}
                        <Button
                            ref={nextRef}
                            disabled={isSubmitting}
                            type="submit">Selanjutnya <ChevronRight className={classes.iconRight} /></Button>
                    </Grid>

                </Grid>

            </form></Swipeable>
    )
}


Keluarga.propTypes = {
    id: PropTypes.string.isRequired,
    keluarga: PropTypes.object.isRequired,
    setKeluarga: PropTypes.func.isRequired
}

export default Keluarga;