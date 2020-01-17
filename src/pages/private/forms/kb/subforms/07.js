import React, { useState, useEffect } from 'react';

// material ui
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { generateYears, generateMonths } from '../../../../../utils/generator';
const years = generateYears(2019 - 30);
const months = generateMonths();

function SubForm07({ id, setValue, saveValue, value, kb, handleNextSub, navigationMode, handleBackSub, no_kk }) {

    const classes = useStyles();
    const [error, setError] = useState({});
    const [useModernContrasep, setUseModernContrasep] = useState(false);
    useEffect(() => {
        setError({})

        if (kb["0106"].jenis_kontrasepsi !== "9") {
            setUseModernContrasep(true);
        } else {
            if (navigationMode === 'back') {
                handleBackSub();
            } else {
                handleNextSub()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!useModernContrasep) {
        return null
    }

    const pertanyaan = "KHUSUS IBU YANG SAAT INI SEDANG MENGGUNAKAN ALAT/OBT KB MODERN. Kapan mulai menggunakan alat/obat KB (Kontrasepsi) yang dipakai saat ini?";
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

        if (!value.bulan_mulai_menggunakan_modern) {
            newError.bulan_mulai_menggunakan_modern = "Wajib diisi";
        }

        if (!value.tahun_mulai_menggunakan_modern) {
            newError.tahun_mulai_menggunakan_modern = "Wajib diisi";
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

            // const normalizeValue = {
            //     pertanyaan,
            //     jawaban_1: value.mulai_menggunakan_modern

            // }
            let normalizeValue = {
                _id: `${no_kk}${id}`,
                Pertanyaan: pertanyaan,
                Jawaban_H1: value.bulan_mulai_menggunakan_modern,
                Jawaban_H2: value.tahun_mulai_menggunakan_modern,
                Jawaban_HDate1: '',
                Jawaban_HDate2: '',
                No_Pertanyaan: 7,
                No_KK: no_kk,
                Periode_Sensus: "2020",


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
                    <span className={classes.badge}>07</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={6} md={3}>

                        <FormControl

                            variant="outlined"
                            fullWidth
                            error={error.bulan_mulai_menggunakan_modern ? true : false}>

                            <Select
                                id="bulan_mulai_menggunakan_modern"
                                value={value.bulan_mulai_menggunakan_modern || ''}
                                onChange={handleChange}
                                name="bulan_mulai_menggunakan_modern"
                                displayEmpty
                            >
                                <MenuItem value="">Bulan</MenuItem>
                                {months.map(month => <MenuItem key={month} value={month}>{month}</MenuItem>)}
                            </Select>
                            <FormHelperText>{error.bulan_mulai_menggunakan_modern}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>

                        <FormControl

                            variant="outlined"
                            fullWidth
                            error={error.tahun_mulai_menggunakan_modern ? true : false}>

                            <Select
                                id="tahun_mulai_menggunakan_modern"
                                value={value.tahun_mulai_menggunakan_modern || ''}
                                onChange={handleChange}
                                name="tahun_mulai_menggunakan_modern"
                                displayEmpty
                            >
                                <MenuItem value="">Tahun</MenuItem>
                                {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                            </Select>
                            <FormHelperText>{error.tahun_mulai_menggunakan_modern}</FormHelperText>
                        </FormControl>
                    </Grid>



                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubForm07;