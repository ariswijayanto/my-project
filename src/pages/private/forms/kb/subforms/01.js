import React, { useState, useEffect } from 'react';

// material ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
// validator
import isNumeric from 'validator/lib/isNumeric';
import useStyles from './styles';

function SubForm01({ id, setValue, saveValue, value, no_kk }) {

    const classes = useStyles();
    const [error, setError] = useState({});

    useEffect(() => {
        setError({})
    }, [])

    const pertanyaan = "Menurut ibu, berapa jumlah anak yang diinginkan?";
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

        if (!value.jumlah_anak) {
            newError.jumlah_anak = "Jumlah Anak wajib diisi";
        } else if (!isNumeric(value.jumlah_anak)) {
            newError.jumlah_anak = "Jumlah Anak tidak valid";
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
                Jawaban_H1: value.jumlah_anak,
                Jawaban_H2: 0,
                Jawaban_HDate1: "",
                Jawaban_HDate2: "",
                No_Pertanyaan: 1,
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
                    <span className={classes.badge}>01</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="jumlah_anak"
                            name="jumlah_anak"
                            value={value.jumlah_anak || ''}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment
                                    className={classes.inputAdornmentNoWrap}
                                    position="end">Anak</InputAdornment>,
                            }}
                            type="number"
                            inputProps={{
                                className: classes.inputMini,
                                min: 0
                            }}
                            error={error.jumlah_anak ? true : false}
                            helperText={error.jumlah_anak}

                        />
                    </Grid>


                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubForm01;