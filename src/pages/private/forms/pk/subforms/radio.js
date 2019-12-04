import React, { useState, useEffect } from 'react';

// material ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import useStyles from './styles';


import validation from '../validation';


function SubFormRadio({ id, setValue, saveValue, value, form, keluarga }) {

    const classes = useStyles();
    const [error, setError] = useState({});

    const [berlaku, setBerlaku] = useState(false);

    useEffect(() => {
        setError({})
    }, [])

    useEffect(() => {
        //console.log('validation called');
        if (form.dependencies.length <= 0) {
            setBerlaku(true)
        } else {
            const valuesKel = Object.values(keluarga);
            const cekberlaku = form.dependencies.some(dep => {
                return validation[dep](valuesKel)
            });

            if (!cekberlaku) {
                setValue({ target: { name: 'jawaban', value: '3' } })
            }
            setBerlaku(cekberlaku)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, form])


    const { pertanyaan } = form;
    const handleChange = (e) => {

        if (e.target.type === "number") {
            if (parseInt(e.target.value) < 0)
                return false;

            // if (e.target.name === "kondisi" && ![0, 1].includes(parseInt(e.target.value))) {
            //     return false;
            // }
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
        }

        if (form.lain) {
            if (parseInt(value.jawaban) === form.options.length && !value.jawaban_lainnya) {

                newError.jawaban_lainnya = "Wajib diisi"
            }
        }

        if (form.kondisi) {
            if (typeof value.kondisi === "undefined") {
                newError.kondisi = "Kondisi wajib diisi";
            } else if (!['0', '1', 0, 1].includes(value.kondisi)) {
                newError.kondisi = "Kondisi harus diisi angka 0 atau 1"
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

            // const normalizeValue = {
            //     pertanyaan,
            //     jawaban_1: value.jawaban,
            //     jawaban_2: value.jawaban_lainnya

            // }

            let normalizeValue = {
                Pertanyaan: pertanyaan,
                Jawab_Pilih: value.jawaban,
                Jawaban_H1: value.kondisi || 0,
                Jawaban_H2: 0,
                No_Pertanyaan: parseInt(form.no),
                Lainnya: value.jawaban_lainnya || ''
            }
            if (value._rev) {
                normalizeValue._rev = value._rev
            }
            saveValue(normalizeValue)
        }
    }
    //console.log('here')
    return (<form id={id} onSubmit={handleSubmit} noValidate>
        <div className={classes.card}>
            <div className={classes.cardHeader}>
                <Typography margin="normal" paragraph>
                    <span className={classes.badge}>{form.no}</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12} >
                        <FormControl error={error.jawaban ? true : false} component="fieldset">
                            <RadioGroup value={value.jawaban || ''}
                                onChange={handleChange}
                                aria-label="jawaban" name="jawaban">
                                {form.options.map((option, index) => {
                                    let disabled = false;

                                    if (option === 'Tidak Berlaku' && berlaku) {
                                        disabled = true;
                                    } else if (option !== 'Tidak Berlaku' && !berlaku) {
                                        disabled = true;
                                    }

                                    return <FormControlLabel
                                        disabled={disabled}
                                        key={index}
                                        control={<Radio />}
                                        value={`${index + 1}`}
                                        label={option} />
                                })}

                                {(form.lain && parseInt(value.jawaban) === form.options.length) &&

                                    <TextField
                                        fullWidth

                                        placeholder="Tulisakan"
                                        variant="outlined"
                                        id="jawaban_lainnya"
                                        name="jawaban_lainnya"
                                        value={value.jawaban_lainnya || ''}
                                        onChange={handleChange}
                                        error={error.jawaban_lainnya ? true : false}
                                        helperText={error.jawaban_lainnya}
                                        inputProps={{
                                            className: classes.inputMini
                                        }}

                                    />
                                }

                            </RadioGroup>
                            <FormHelperText>{error.jawaban}</FormHelperText>
                        </FormControl>
                    </Grid>
                    {(value.jawaban && form.kondisi) &&
                        <>
                            <Grid item xs={12}>
                                <Typography>Tuliskan pada kotak, angka 0 Jika Kondisi Tidak Baik atau angka 1 Jika Kondisi Baik</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    id="kondisi"
                                    name="kondisi"
                                    value={value.kondisi || ''}
                                    onChange={handleChange}

                                    type="number"
                                    inputProps={{
                                        className: classes.inputMini,
                                        min: 0,
                                        max: 1
                                    }}
                                    error={error.kondisi ? true : false}
                                    helperText={error.kondisi}

                                />
                            </Grid>
                        </>
                    }
                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubFormRadio;