import React, { useState, useEffect } from 'react';

// material ui
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import useStyles from './styles';


function SubForm08({ id, setValue, saveValue, value, kb, handleNextSub, navigationMode, handleBackSub, no_kk }) {

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

    const pertanyaan = "Tempat Pelayanan KB terakhir :";
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

        if (!value.tempat_pelayanan) {
            newError.tempat_pelayanan = "Wajib diisi";
        }

        if (value.tempat_pelayanan === "10") {
            if (!value.tempat_pelayanan_lainnya) {
                newError.tempat_pelayanan_lainnya = "Lainnya wajib diisi";
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
            //     jawaban_1: value.tempat_pelayanan,
            //     jawaban_2: value.tempat_pelayanan_lainnya

            // }

            let normalizeValue = {
                _id: `${no_kk}${id}`,
                Pertanyaan: pertanyaan,
                Jawaban_H1: 0,
                Jawaban_H2: 0,
                Jawaban_HDate1: "",
                Jawaban_HDate2: "",
                No_Pertanyaan: 8,
                No_KK: no_kk,
                Periode_Sensus: "2020",
                answer: [
                    {
                        _id: `${no_kk}${id}01`,
                        No_Jawaban: value.tempat_pelayanan,
                        Jawaban_D1: 0,
                        Jawaban_D2: 0,
                        Jawab_D3: 0,
                        Jawab_D4: 0,
                        pilihankb: 0,
                        Lainnya: value.tempat_pelayanan_lainnya ? value.tempat_pelayanan_lainnya : ""
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
                    <span className={classes.badge}>08</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <FormControl error={error.tempat_pelayanan ? true : false} component="fieldset" fullWidth>
                            <RadioGroup value={value.tempat_pelayanan || ''}
                                onChange={handleChange}
                                aria-label="tempat_pelayanan" name="tempat_pelayanan"
                                className={classes.radioGroup}
                            >
                                <div className={classes.radioSection}>
                                    <FormControlLabel control={<Radio />}
                                        value="1"
                                        label="RS Pemerintah/TNI/Polri" />
                                    <FormControlLabel control={<Radio />}
                                        value="2"
                                        label="RS Swasta" />
                                    <FormControlLabel control={<Radio />}
                                        value="3"
                                        label="Puskesmas/Klinik TNI/Polri" />
                                    <FormControlLabel control={<Radio />}
                                        value="4"
                                        label="Klinik Swasta" />
                                    <FormControlLabel control={<Radio />}
                                        value="5"
                                        label="Praktek Dokter" />
                                </div>
                                <div className={classes.radioSection}>
                                    <FormControlLabel control={<Radio />}
                                        value="6"
                                        label="Pustu/Pusling/Bidan Desa" />
                                    <FormControlLabel control={<Radio />}
                                        value="7"
                                        label="Praktek Mandiri Bidan" />
                                    <FormControlLabel control={<Radio />}
                                        value="8"
                                        label="Mobil Pelayanan KB" />
                                    <FormControlLabel control={<Radio />}
                                        value="9"
                                        label="Toko Obat/Apotik" />
                                    <FormControlLabel control={<Radio />}
                                        value="10"
                                        label="Lainnya" />
                                    {value.tempat_pelayanan === "10" &&

                                        <TextField
                                            fullWidth

                                            placeholder="Tulisakan"
                                            variant="outlined"
                                            id="tempat_pelayanan_lainnya"
                                            name="tempat_pelayanan_lainnya"
                                            value={value.tempat_pelayanan_lainnya || ''}
                                            onChange={handleChange}
                                            error={error.tempat_pelayanan_lainnya ? true : false}
                                            helperText={error.tempat_pelayanan_lainnya}
                                            inputProps={{
                                                className: classes.inputMini
                                            }}

                                        />}
                                </div>
                            </RadioGroup>

                            <FormHelperText>{error.tempat_pelayanan}</FormHelperText>
                        </FormControl>
                    </Grid>




                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubForm08;