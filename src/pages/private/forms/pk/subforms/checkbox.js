import React, { useState, useEffect } from 'react';

// material ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

import useStyles from './styles';

import chunk from 'lodash/chunk';

function SubFormCheckbox({ id, setValue, saveValue, value, form, keluarga, pk, navigationMode, handleNextSub, handleBackSub }) {

    const classes = useStyles();
    const [error, setError] = useState({});

    const [show, setShow] = useState(false);

    useEffect(() => {
        setError({})
    }, [])

    useEffect(() => {
        //console.log('validation called');
        if (form.show_if.length <= 0) {
            setShow(true);
        } else {

            const cekShow = form.show_if.some(show_if => {
                return pk[show_if.no].jawaban === show_if.value;
            });


            setShow(cekShow);
            if (!cekShow) {
                if (navigationMode === 'back') {
                    handleBackSub();
                } else {
                    handleNextSub()
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, form])

    if (!show) {
        return null;
    }

    const { pertanyaan } = form;
    const handleChangeCheckbox = option_no => (e) => {
        const selected = value.jawaban || []
        const selectedIndex = selected.indexOf(option_no);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, option_no);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setValue({ target: { name: "jawaban", value: newSelected } })

        setError({
            ...error,
            jawaban: ""
        })

        // setSomethingChange(true)
    }

    const handleChange = (e) => {

        setValue(e)

        setError({
            ...error,
            [e.target.name]: ""
        })

        // setSomethingChange(true)
    }

    const isChecked = option_no => {
        const selected = value.jawaban || [];
        return selected.indexOf(option_no) !== -1;
    }

    const validate = () => {
        let newError = {};

        if (!value.jawaban) {
            newError.jawaban = "Wajib diisi";
        } else if (value.jawaban.length <= 0) {
            newError.jawaban = "Wajib diisi"
        }

        if (form.lain) {
            if (isChecked(form.options.length) && !value.jawaban_lainnya) {

                newError.jawaban_lainnya = "Wajib diisi"
            }
        }

        if (form.kondisi) {
            if (typeof value.kondisi === "undefined") {
                newError.kondisi = "Kondisi wajib diisi";
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
    const chunk_options_keys = chunk(Object.keys(form.options), form.options_chunk);


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
                            <FormGroup className={classes.radioGroup}>
                                {
                                    chunk_options_keys.map((keys_group, index) => {

                                        return (<div key={index} className={classes.radioSection}>
                                            {
                                                keys_group.map(key => {
                                                    const intKey = parseInt(key);
                                                    return <FormControlLabel
                                                        key={key}
                                                        control={<Checkbox checked={isChecked(intKey + 1)} onChange={handleChangeCheckbox(intKey + 1)} value={intKey + 1} />}

                                                        label={form.options[key]} />
                                                })
                                            }
                                            {
                                                (index === (chunk_options_keys.length - 1) && form.lain && value.jawaban && value.jawaban.includes(form.options.length)) &&
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
                                        </div>)
                                    })
                                }
                            </FormGroup>
                            <FormHelperText>{error.jawaban}</FormHelperText>
                        </FormControl>
                    </Grid>

                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubFormCheckbox;