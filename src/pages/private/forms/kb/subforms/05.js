import React, { useState, useEffect } from 'react';

// material ui
//import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import useStyles from './styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { generateYears, generateMonths } from '../../../../../utils/generator';
const years = generateYears(2019 - 30);
const months = generateMonths();

function SubForm05({ id, setValue, saveValue, value, kb, handleNextSub, navigationMode, handleBackSub, no_kk }) {

    const classes = useStyles();
    const [error, setError] = useState({});
    const [dontUseContrasep, setDontUseContrasep] = useState(false);
    useEffect(() => {
        setError({})
        //console.log(kb)
        if (kb["0104"].menggunakan_kontrasepsi === "2" || kb["0103"].sedang_hamil === "1") {
            setDontUseContrasep(true);
        } else {
            if (navigationMode === 'back') {
                handleBackSub();
            } else {
                handleNextSub()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!dontUseContrasep) {
        return null
    }

    const pertanyaan = "Apa dalam 12 bulan terakhir, Ibu pernah menggunakan alat/obat KB (Kontrasepsi)?";
    const handleChange = (e) => {

        setValue(e)

        setError({
            ...error,
            [e.target.name]: ""
        })

        // setSomethingChange(true)
    }



    const validate = () => {
        let newError = {};

        if (!value.pernah_menggunakan_kontrasepsi) {
            newError.pernah_menggunakan_kontrasepsi = "Wajib diisi";
        }

        if (value.pernah_menggunakan_kontrasepsi === "1") {
            if (!value.bulan_mulai) {
                newError.bulan_mulai = "Bulan mulai wajib diisi";
            }

            if (!value.tahun_mulai) {
                newError.tahun_mulai = "Tahun mulai wajib diisi";
            }

            if (!value.bulan_berhenti) {
                newError.bulan_berhenti = "Bulan berhenti wajib diisi";
            }

            if (!value.tahun_berhenti) {
                newError.tahun_berhenti = "Tahun berhenti wajib diisi";
            }
        }


        return newError;
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const findErrors = validate();

        const errorValues = Object.values(findErrors);

        if (errorValues.length > 0 && errorValues.some(err => err !== '')) {
            setError(findErrors);
        } else {



            let Jawaban_D1 = value.bulan_mulai || 0;
            let Jawaban_D2 = value.tahun_mulai || 0;
            let Jawab_D3 = value.bulan_berhenti || 0;
            let Jawab_D4 = value.tahun_berhenti || 0;




            let normalizeValue = {
                _id: `${no_kk}${id}`,
                Pertanyaan: pertanyaan,
                Jawaban_H1: 0,
                Jawaban_H2: 0,
                Jawaban_HDate1: "",
                Jawaban_HDate2: "",
                No_Pertanyaan: 5,
                No_KK: no_kk,
                Periode_Sensus: "2020",
                answer: [
                    {
                        _id: `${no_kk}${id}01`,
                        No_Jawaban: value.pernah_menggunakan_kontrasepsi,
                        Jawaban_D1,
                        Jawaban_D2,
                        Jawab_D3,
                        Jawab_D4,
                        pilihankb: 0,
                        Lainnya: ""
                    },

                ]

            }

            if (value._rev) {
                normalizeValue._rev = value._rev
            }



            saveValue(normalizeValue)
        }
    }
    return (<form id={id} onSubmit={handleSubmit} noValidate>
        <div className={classes.card}>
            <div className={classes.cardHeader}>
                <Typography margin="normal" paragraph>
                    <span className={classes.badge}>05</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <FormControl error={error.pernah_menggunakan_kontrasepsi ? true : false} component="fieldset">
                            <RadioGroup value={value.pernah_menggunakan_kontrasepsi || ''}
                                onChange={handleChange}
                                aria-label="pernah_menggunakan_kontrasepsi" name="pernah_menggunakan_kontrasepsi">
                                <FormControlLabel control={<Radio />}
                                    value="1"
                                    label="Ya" />
                                <FormControlLabel control={<Radio />}
                                    value="2"
                                    label="Tidak" />
                            </RadioGroup>
                            <FormHelperText>{error.pernah_menggunakan_kontrasepsi}</FormHelperText>
                        </FormControl>
                    </Grid>
                    {value.pernah_menggunakan_kontrasepsi === '1' &&
                        <>
                            <Grid item xs={12}>
                                <Typography>Kapan mulai menggunakan alat Kontrasepsi (KB) terakhir?</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>

                                <FormControl

                                    variant="outlined"
                                    fullWidth
                                    error={error.bulan_mulai ? true : false}>

                                    <Select
                                        id="bulan_mulai"
                                        value={value.bulan_mulai || ''}
                                        onChange={handleChange}
                                        name="bulan_mulai"
                                        displayEmpty
                                    >
                                        <MenuItem value="">Bulan</MenuItem>
                                        {months.map(month => <MenuItem key={month} value={month}>{month}</MenuItem>)}
                                    </Select>
                                    <FormHelperText>{error.bulan_mulai}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={3}>

                                <FormControl

                                    variant="outlined"
                                    fullWidth
                                    error={error.tahun_mulai ? true : false}>

                                    <Select
                                        id="tahun_mulai"
                                        value={value.tahun_mulai || ''}
                                        onChange={handleChange}
                                        name="tahun_mulai"
                                        displayEmpty
                                    >
                                        <MenuItem value="">Tahun</MenuItem>
                                        {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                                    </Select>
                                    <FormHelperText>{error.tahun_mulai}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Kapan berhenti menggunakan alat Kontrasepsi (KB) terakhir?</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>

                                <FormControl

                                    variant="outlined"
                                    fullWidth
                                    error={error.bulan_berhenti ? true : false}>

                                    <Select
                                        id="bulan_berhenti"
                                        value={value.bulan_berhenti || ''}
                                        onChange={handleChange}
                                        name="bulan_berhenti"
                                        displayEmpty
                                    >
                                        <MenuItem value="">Bulan</MenuItem>
                                        {months.map(month => <MenuItem key={month} value={month}>{month}</MenuItem>)}
                                    </Select>
                                    <FormHelperText>{error.bulan_berhenti}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={3}>

                                <FormControl

                                    variant="outlined"
                                    fullWidth
                                    error={error.tahun_berhenti ? true : false}>

                                    <Select
                                        id="tahun_berhenti"
                                        value={value.tahun_berhenti || ''}
                                        onChange={handleChange}
                                        name="tahun_berhenti"
                                        displayEmpty
                                    >
                                        <MenuItem value="">Tahun</MenuItem>
                                        {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                                    </Select>
                                    <FormHelperText>{error.tahun_berhenti}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </>
                    }


                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubForm05;