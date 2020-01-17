import React, { useState, useEffect } from 'react';

// material ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
// validator
import isNumeric from 'validator/lib/isNumeric';
import useStyles from './styles';

function SubForm02({ id, setValue, saveValue, value, no_kk }) {

    const classes = useStyles();
    const [error, setError] = useState({});

    useEffect(() => {
        setError({})
    }, [])

    const pertanyaan = "Sudah berapa kali Ibu/Saudari melahirkan?";
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

        if (!value.kelahiran) {
            newError.kelahiran = "Jumlah kelahiran wajib diisi";
        } else if (!isNumeric(value.kelahiran)) {
            newError.kelahiran = "Jumlah kelahiran tidak valid";
        }

        if (!value.lahir_hidup_laki_laki) {
            newError.lahir_hidup_laki_laki = "Jumlah Laki-laki wajib diisi";
        } else if (!isNumeric(value.lahir_hidup_laki_laki)) {
            newError.lahir_hidup_laki_laki = "Jumlah Laki-laki tidak valid";
        }

        if (!value.lahir_hidup_perempuan) {
            newError.lahir_hidup_perempuan = "Jumlah Perempuan wajib diisi";
        } else if (!isNumeric(value.lahir_hidup_perempuan)) {
            newError.lahir_hidup_perempuan = "Jumlah Perempuan tidak valid";
        }

        if (!value.masih_hidup_laki_laki) {
            newError.masih_hidup_laki_laki = "Jumlah Laki-laki wajib diisi";
        } else if (!isNumeric(value.masih_hidup_laki_laki)) {
            newError.masih_hidup_perempuan = "Jumlah Perempuan tidak valid"
        }
        else if (parseInt(value.masih_hidup_laki_laki) > parseInt(value.lahir_hidup_laki_laki)) {
            newError.masih_hidup_laki_laki = " Jumlah Laki-laki masih hidup tidak boleh lebih besar dari jumlah Laki-laki lahir hidup";
        }

        if (!value.masih_hidup_perempuan) {
            newError.masih_hidup_perempuan = "Jumlah Perempuan wajib diisi";
        } else if (!isNumeric(value.masih_hidup_perempuan)) {
            newError.masih_hidup_perempuan = "Jumlah Perempuan tidak valid";
        } else if (parseInt(value.masih_hidup_perempuan) > parseInt(value.lahir_hidup_perempuan)) {
            newError.masih_hidup_perempuan = " Jumlah Perempuan masih hidup tidak boleh lebih besar dari Jumlah Perempuan lahir hidup";
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
                Jawaban_H1: value.kelahiran,
                Jawaban_H2: 0,
                Jawaban_HDate1: "",
                Jawaban_HDate2: "",
                No_Pertanyaan: 2,
                No_KK: no_kk,
                Periode_Sensus: "2020",
                answer: [
                    {
                        _id: `${no_kk}${id}01`,
                        No_Jawaban: 1,
                        Jawaban_D1: parseInt(value.lahir_hidup_laki_laki),
                        Jawaban_D2: parseInt(value.lahir_hidup_perempuan),
                        Jawab_D3: 0,
                        Jawab_D4: 0,
                        pilihankb: 0,
                        Lainnya: ""
                    },
                    {
                        _id: `${no_kk}${id}02`,
                        No_Jawaban: 2,
                        Jawaban_D1: parseInt(value.masih_hidup_laki_laki),
                        Jawaban_D2: parseInt(value.masih_hidup_perempuan),
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
                    <span className={classes.badge}>02</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="kelahiran"
                            name="kelahiran"
                            value={value.kelahiran || ''}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment
                                    className={classes.inputAdornmentNoWrap}
                                    position="end">kelahiran</InputAdornment>,
                            }}
                            type="number"
                            inputProps={{
                                className: classes.inputMini,
                                min: 0
                            }}
                            error={error.kelahiran ? true : false}
                            helperText={error.kelahiran}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Berapa jumlah anak lahir hidup?</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="lahir_hidup_laki_laki"
                            name="lahir_hidup_laki_laki"
                            value={value.lahir_hidup_laki_laki || ''}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    className={classes.inputAdornmentNoWrap}
                                    position="start">Laki-laki:</InputAdornment>,
                            }}
                            type="number"
                            inputProps={{
                                className: classes.inputMini,
                                min: 0,
                                max: value.kelahiran
                            }}
                            error={error.lahir_hidup_laki_laki ? true : false}
                            helperText={error.lahir_hidup_laki_laki}

                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="lahir_hidup_perempuan"
                            name="lahir_hidup_perempuan"
                            value={value.lahir_hidup_perempuan || ''}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    className={classes.inputAdornmentNoWrap}

                                    position="start">Perempuan:</InputAdornment>,
                            }}
                            type="number"
                            inputProps={{
                                className: classes.inputMini,
                                min: 0,
                                max: value.kelahiran
                            }}
                            error={error.lahir_hidup_perempuan ? true : false}
                            helperText={error.lahir_hidup_perempuan}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Berapa jumlah anak masih hidup?</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="masih_hidup_laki_laki"
                            name="masih_hidup_laki_laki"
                            value={value.masih_hidup_laki_laki || ''}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    className={classes.inputAdornmentNoWrap}
                                    position="start">{`Laki-laki:`}</InputAdornment>,
                            }}
                            type="number"
                            inputProps={{
                                className: classes.inputMini,
                                min: 0,
                                max: value.lahir_hidup_laki_laki
                            }}

                            error={error.masih_hidup_laki_laki ? true : false}
                            helperText={error.masih_hidup_laki_laki}

                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="masih_hidup_perempuan"
                            name="masih_hidup_perempuan"
                            value={value.masih_hidup_perempuan || ''}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    className={classes.inputAdornmentNoWrap}
                                    position="start">Perempuan:</InputAdornment>,

                            }}
                            type="number"

                            inputProps={{
                                className: classes.inputMini,
                                min: 0,
                                max: value.lahir_hidup_perempuan
                            }}
                            error={error.masih_hidup_perempuan ? true : false}
                            helperText={error.masih_hidup_perempuan}
                        />
                    </Grid>

                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubForm02;