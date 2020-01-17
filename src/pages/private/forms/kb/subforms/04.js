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

function SubForm04({ id, setValue, saveValue, value, kb, handleNextSub, no_kk, navigationMode, handleBackSub }) {

    const classes = useStyles();
    const [error, setError] = useState({});
    const [notPregnant, setNotPregnant] = useState(false);
    useEffect(() => {
        setError({})
        //console.log(kb)
        if (kb["0103"].sedang_hamil === "2") {
            setNotPregnant(true);
        } else {
            if (navigationMode === 'back') {
                handleBackSub();
            } else {
                handleNextSub()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!notPregnant) {
        return null
    }

    const pertanyaan = "Apakah saat ini menggunakan alat/obat/cara KB (Kontrasepsi)";
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

        if (!value.menggunakan_kontrasepsi) {
            newError.menggunakan_kontrasepsi = "Wajib diisi";
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
            //     jawaban_1: value.menggunakan_kontrasepsi,

            // }

            let normalizeValue = {
                _id: `${no_kk}${id}`,
                Pertanyaan: pertanyaan,
                Jawaban_H1: 0,
                Jawaban_H2: 0,
                Jawaban_HDate1: "",
                Jawaban_HDate2: "",
                No_Pertanyaan: 4,
                No_KK: no_kk,
                Periode_Sensus: "2020",
                answer: [
                    {
                        _id: `${no_kk}${id}01`,
                        No_Jawaban: value.menggunakan_kontrasepsi,
                        Jawaban_D1: 0,
                        Jawaban_D2: 0,
                        Jawab_D3: 0,
                        Jawab_D4: 0,
                        pilihankb: 0,
                        Lainnya: ""
                    }

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
                    <span className={classes.badge}>04</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <FormControl
                            error={error.menggunakan_kontrasepsi ? true : false}
                            component="fieldset">
                            <RadioGroup value={value.menggunakan_kontrasepsi || ''}
                                onChange={handleChange}
                                aria-label="menggunakan_kontrasepsi" name="menggunakan_kontrasepsi">
                                <FormControlLabel control={<Radio />}
                                    value="1"
                                    label="Ya" />
                                <FormControlLabel control={<Radio />}
                                    value="2"
                                    label="Tidak" />
                            </RadioGroup>
                            <FormHelperText>{error.menggunakan_kontrasepsi}</FormHelperText>
                        </FormControl>
                    </Grid>



                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubForm04;