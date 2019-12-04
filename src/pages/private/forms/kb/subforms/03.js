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

import useStyles from './styles';

import isNumeric from 'validator/lib/isNumeric';

function SubForm03({ id, setValue, saveValue, value, no_kk }) {

    const classes = useStyles();
    const [error, setError] = useState({});

    useEffect(() => {
        setError({})
    }, [])

    const pertanyaan = "Apakah Ibu/Saudari saat ini sedang hamil?";
    const handleChange = (e) => {

        if (e.target.type === "number" && parseInt(e.target.value) < 0) {

            return false;
        }

        setValue(e)

        setError({
            ...error,
            [e.target.name]: ""
        })

        // setSomethingChange(true)
    }

    const validate = () => {
        let newError = {};

        if (!value.sedang_hamil) {
            newError.sedang_hamil = "Wajib diisi";
        }

        if (value.sedang_hamil === "1") {
            if (!value.usia_kehamilan) {
                newError.usia_kehamilan = "Usia kehamilan wajib diisi";
            } else if (!isNumeric(value.usia_kehamilan)) {
                newError.usia_kehamilan = "Usia kehamilan tidak valid";
            } else if (parseInt(value.usia_kehamilan) < 0 || parseInt(value.usia_kehamilan) > 45) {
                newError.usia_kehamilan = "Usia kehamilan tidak valid";
            }

            if (!value.sedang_hamil_ingin) {
                newError.sedang_hamil_ingin = "Wajib diisi";
            }
        } else if (value.sedang_hamil === "2") {
            if (!value.ingin_anak) {
                newError.ingin_anak = "Wajib diisi";
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
            //console.log(value)
            // const normalizeValue = {
            //     pertanyaan,
            //     jawaban_1: value.sedang_hamil,
            //     jawaban_2: value.usia_kehamilan ? value.usia_kehamilan : ''

            // }
            let normalizeValue = {
                _id: `${no_kk}${id}`,
                Pertanyaan: pertanyaan,
                Jawaban_H1: 0,
                Jawaban_H2: 0,
                Jawaban_HDate1: "",
                Jawaban_HDate2: "",
                No_Pertanyaan: 3,
                No_KK: no_kk,
                Periode_Sensus: "2020",
            }

            if (value.sedang_hamil === "1") {
                normalizeValue.answer = [
                    {
                        _id: `${no_kk}${id}01`,
                        No_Jawaban: value.sedang_hamil,
                        Jawaban_D1: value.usia_kehamilan ? value.usia_kehamilan : 0,
                        Jawaban_D2: 0,
                        Jawab_D3: 0,
                        Jawab_D4: 0,
                        pilihankb: value.sedang_hamil_ingin ? value.sedang_hamil_ingin : 0,
                        Lainnya: ""
                    }

                ]
            } else if (value.sedang_hamil === "2") {
                normalizeValue.answer = [
                    {
                        _id: `${no_kk}${id}01`,
                        No_Jawaban: value.sedang_hamil,
                        Jawaban_D1: 0,
                        Jawaban_D2: 0,
                        Jawab_D3: 0,
                        Jawab_D4: 0,
                        pilihankb: value.ingin_anak ? value.ingin_anak : 0,
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
                    <span className={classes.badge}>03</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <FormControl error={error.sedang_hamil ? true : false} component="fieldset">
                            <RadioGroup value={value.sedang_hamil || ''}
                                onChange={handleChange}
                                aria-label="sedang_hamil" name="sedang_hamil">
                                <FormControlLabel control={<Radio />}
                                    value="1"
                                    label="Ya" />
                                <FormControlLabel control={<Radio />}
                                    value="2"
                                    label="Tidak" />
                            </RadioGroup>
                            <FormHelperText>{error.sedang_hamil}</FormHelperText>
                        </FormControl>
                    </Grid>
                    {value.sedang_hamil === '1' &&
                        <>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Usia Kehamilan"
                                    placeholder="1"
                                    variant="outlined"
                                    id="usia_kehamilan"
                                    name="usia_kehamilan"
                                    value={value.usia_kehamilan || ''}
                                    onChange={handleChange}
                                    InputProps={{

                                        endAdornment: <InputAdornment
                                            className={classes.inputAdornmentNoWrap}
                                            position="end">Minggu</InputAdornment>,
                                    }}
                                    type="number"
                                    inputProps={{

                                        className: classes.inputMini,
                                        min: 0,
                                        max: 45
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    error={error.usia_kehamilan ? true : false}
                                    helperText={error.usia_kehamilan}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Jika ya, saat mulai hamil, apakah Ibu memang ingin hamil saat itu, ingin hamil nanti atau tidak ingin anak lagi?</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl
                                    error={error.sedang_hamil_ingin ? true : false}
                                    component="fieldset">
                                    <RadioGroup value={value.sedang_hamil_ingin || ''}
                                        onChange={handleChange}
                                        aria-label="sedang_hamil_ingin" name="sedang_hamil_ingin">
                                        <FormControlLabel control={<Radio />}
                                            value="1"
                                            label="Ya, ingin hamil saat itu" />
                                        <FormControlLabel control={<Radio />}
                                            value="2"
                                            label="Ingin hamil nanti/kemudian" />
                                        <FormControlLabel control={<Radio />}
                                            value="3"
                                            label="Tidak ingin anak lagi" />
                                    </RadioGroup>
                                    <FormHelperText>{error.sedang_hamil_ingin}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </>
                    }
                    {
                        value.sedang_hamil === "2" &&
                        <>
                            <Grid item xs={12}>
                                <Typography>Jika tidak, apakah Ibu menginginkan anak(lagi)?</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl
                                    error={error.ingin_anak ? true : false}
                                    component="fieldset">
                                    <RadioGroup value={value.ingin_anak || ''}
                                        onChange={handleChange}
                                        aria-label="ingin_anak" name="ingin_anak">
                                        <FormControlLabel control={<Radio />}
                                            value="1"
                                            label="Ya. Ingin anak segera" />
                                        <FormControlLabel control={<Radio />}
                                            value="2"
                                            label="Ya. Ingin anak nanti/kemudian" />
                                        <FormControlLabel control={<Radio />}
                                            value="3"
                                            label="Tidak ingin anak lagi" />
                                        {/* <FormControlLabel control={<Radio />}
                                    value="4"
                                    label="Tidak dapat hamil" /> */}
                                    </RadioGroup>
                                    <FormHelperText>{error.ingin_anak}</FormHelperText>
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

export default SubForm03;