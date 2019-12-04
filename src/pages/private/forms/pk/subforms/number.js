import React, { useState, useEffect } from 'react';

// material ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
// validator
import isNumeric from 'validator/lib/isNumeric';
import useStyles from './styles';

function SubFormNumber({ id, setValue, saveValue, value, form }) {

    const classes = useStyles();
    const [error, setError] = useState({});

    useEffect(() => {
        setError({})
    }, [])

    const { pertanyaan } = form;
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

        if (!value.jawaban) {
            newError.jawaban = "Wajib diisi";
        } else if (!isNumeric(value.jawaban)) {
            newError.jawaban = "Jawaban tidak valid";
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
                Pertanyaan: pertanyaan,
                Jawab_Pilih: 0,
                Jawaban_H1: parseInt(value.jawaban),
                Jawaban_H2: 0,
                No_Pertanyaan: parseInt(form.no),
                Lainnya: value.jawaban_lainnya ? value.jawaban_lainnya : ''
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
                    <span className={classes.badge}>{form.no}</span>{form.pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4} md={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="jawaban"
                            name="jawaban"
                            value={value.jawaban || ''}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment
                                    className={classes.inputAdornmentNoWrap}
                                    position="end">{form.unit}</InputAdornment>,
                            }}
                            type="number"
                            inputProps={{
                                className: classes.inputMini,
                                min: 0
                            }}
                            error={error.jawaban ? true : false}
                            helperText={error.jawaban}

                        />
                    </Grid>


                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubFormNumber;