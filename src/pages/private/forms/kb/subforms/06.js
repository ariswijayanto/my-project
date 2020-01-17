import React, { useState, useEffect } from 'react';

// material ui
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import useStyles from './styles';


function SubForm06({ id, setValue, saveValue, value, kb, handleNextSub, navigationMode, handleBackSub, no_kk }) {

    const classes = useStyles();
    const [error, setError] = useState({});
    // const [useContrasep, setUseContrasep] = useState(false);
    useEffect(() => {
        setError({})

        // if (kb["0104"].menggunakan_kontrasepsi === "1" || kb["0105"].pernah_menggunakan_kontrasepsi === "1") {
        //     setUseContrasep(true);
        // } else {
        //     if (navigationMode === 'back') {
        //         handleBackSub();
        //     } else {
        //         handleNextSub()
        //     }
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if (!useContrasep) {
    //     return null
    // }

    const pertanyaan = "Jenis alat/obat/cara KB (Kontrasepsi) yang dipakai saat ini atau terakhir dipakai?";
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

        if (!value.jenis_kontrasepsi) {
            newError.jenis_kontrasepsi = "Wajib diisi";
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
            //     jawaban_1: value.jenis_kontrasepsi

            // }

            let normalizeValue = {
                _id: `${no_kk}${id}`,
                Pertanyaan: pertanyaan,
                Jawaban_H1: 0,
                Jawaban_H2: 0,
                Jawaban_HDate1: "",
                Jawaban_HDate2: "",
                No_Pertanyaan: 6,
                No_KK: no_kk,
                Periode_Sensus: "2020",
                answer: [
                    {
                        _id: `${no_kk}${id}01`,
                        No_Jawaban: value.jenis_kontrasepsi,
                        Jawaban_D1: 0,
                        Jawaban_D2: 0,
                        Jawab_D3: 0,
                        Jawab_D4: 0,
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
                    <span className={classes.badge}>06</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12} >
                        <FormControl error={error.jenis_kontrasepsi ? true : false} component="fieldset" fullWidth>
                            <RadioGroup value={value.jenis_kontrasepsi || ''}
                                onChange={handleChange}
                                aria-label="jenis_kontrasepsi" name="jenis_kontrasepsi"
                                className={classes.radioGroup}
                            >
                                <div className={classes.radioSection}>
                                    <FormControlLabel control={<Radio />}
                                        value="1"
                                        label="MOW/Steril Wanita" />
                                    <FormControlLabel control={<Radio />}
                                        value="2"
                                        label="MOP/Steril Pria" />
                                    <FormControlLabel control={<Radio />}
                                        value="3"
                                        label="IUD/Spiral/AKDR" />
                                    <FormControlLabel control={<Radio />}
                                        value="4"
                                        label="Implant/Susuk" />
                                    <FormControlLabel control={<Radio />}
                                        value="5"
                                        label="Suntik" />
                                </div>
                                <div className={classes.radioSection}>
                                    <FormControlLabel control={<Radio />}
                                        value="6"
                                        label="Pil" />
                                    <FormControlLabel control={<Radio />}
                                        value="7"
                                        label="Kondom" />
                                    <FormControlLabel control={<Radio />}
                                        value="8"
                                        label="Asi Eksklusif/MAL" />
                                    <FormControlLabel control={<Radio />}
                                        value="9"
                                        label="Tradisional" />
                                </div>
                            </RadioGroup>
                            <FormHelperText>{error.jenis_kontrasepsi}</FormHelperText>
                        </FormControl>
                    </Grid>



                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubForm06;