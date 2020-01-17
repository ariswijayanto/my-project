import React, { useState, useEffect } from 'react';

// material ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
// validator
import isNumeric from 'validator/lib/isNumeric';
import useStyles from './styles';

function SubForm01({ id, setValue, saveValue, value, kb, handleNextSub, navigationMode, handleBackSub, no_kk }) {

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

    const pertanyaan = "Pada saat pertama kali datang ke tempat pelanan KB untuk mendapatkan alat/obat/cara Kontrasepsi yang saat ini digunakan, apakah ibu mendapatkan informasi tentang:";
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

        if (!value.info_jenis_kb) {
            newError.info_jenis_kb = "Wajib diisi";
        }

        if (!value.info_efek_samping_kb) {
            newError.info_efek_samping_kb = "Wajid diisi";
        }

        if (!value.info_jika_mengalami_efek) {
            newError.info_jika_mengalami_efek = "Wajib diisi";
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

            let normalizeValue = {
                _id: `${no_kk}${id}`,
                Pertanyaan: pertanyaan,
                Jawaban_H1: 0,
                Jawaban_H2: 0,
                Jawaban_HDate1: "",
                Jawaban_HDate2: "",
                No_Pertanyaan: 9,
                No_KK: no_kk,
                Periode_Sensus: "2020",
                answer: [
                    {
                        _id: `${no_kk}${id}01`,
                        No_Jawaban: 1,
                        Jawaban_D1: 0,
                        Jawaban_D2: 0,
                        Jawab_D3: 0,
                        Jawab_D4: 0,
                        pilihankb: value.info_jenis_kb,
                        Lainnya: ""
                    },
                    {
                        _id: `${no_kk}${id}02`,
                        No_Jawaban: 2,
                        Jawaban_D1: 0,
                        Jawaban_D2: 0,
                        Jawab_D3: 0,
                        Jawab_D4: 0,
                        pilihankb: value.info_efek_samping_kb,
                        Lainnya: ""
                    },
                    {
                        _id: `${no_kk}${id}03`,
                        No_Jawaban: 3,
                        Jawaban_D1: 0,
                        Jawaban_D2: 0,
                        Jawab_D3: 0,
                        Jawab_D4: 0,
                        pilihankb: value.info_jika_mengalami_efek,
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
                    <span className={classes.badge}>09</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography>Jenis-jenis alat/obat/cara KB Kontrasepsi?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl error={error.info_jenis_kb ? true : false} component="fieldset">
                            <RadioGroup value={value.info_jenis_kb || ''}
                                onChange={handleChange}
                                aria-label="info_jenis_kb" name="info_jenis_kb" row>
                                <FormControlLabel control={<Radio />}
                                    value="1"
                                    label="Ya"
                                    labelPlacement="end"
                                />
                                <FormControlLabel control={<Radio />}
                                    value="2"
                                    label="Tidak"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                            <FormHelperText>{error.info_jenis_kb}</FormHelperText>
                        </FormControl>

                    </Grid>

                    <Grid item xs={12}>
                        <Typography>Efek samping alat/obat/cara KB Kontrasepsi yang dipakai?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl error={error.info_efek_samping_kb ? true : false} component="fieldset">
                            <RadioGroup value={value.info_efek_samping_kb || ''}
                                onChange={handleChange}
                                aria-label="info_efek_samping_kb" name="info_efek_samping_kb" row>
                                <FormControlLabel control={<Radio />}
                                    value="1"
                                    label="Ya"
                                    labelPlacement="end"
                                />
                                <FormControlLabel control={<Radio />}
                                    value="2"
                                    label="Tidak"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                            <FormHelperText>{error.info_efek_samping_kb}</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Apa yang harus dilakukan apabila mengalami efek samping alat/obat/cara KB Kontrasepsi yang dipakai?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl error={error.info_jika_mengalami_efek ? true : false} component="fieldset">
                            <RadioGroup value={value.info_jika_mengalami_efek || ''}
                                onChange={handleChange}
                                aria-label="info_jika_mengalami_efek" name="info_jika_mengalami_efek" row>
                                <FormControlLabel control={<Radio />}
                                    value="1"
                                    label="Ya"
                                    labelPlacement="end"
                                />
                                <FormControlLabel control={<Radio />}
                                    value="2"
                                    label="Tidak"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                            <FormHelperText>{error.info_jika_mengalami_efek}</FormHelperText>
                        </FormControl>

                    </Grid>


                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubForm01;