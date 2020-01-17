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


function SubForm11({ id, setValue, saveValue, value, kb, handleNextSub, navigationMode, handleBackSub, no_kk }) {

    const classes = useStyles();
    const [error, setError] = useState({});
    const [dontUseContrasep, setDontUseContrasep] = useState(false);
    useEffect(() => {
        setError({})

        if (kb["0106"].jenis_kontrasepsi !== "9") {
            setDontUseContrasep(true);
        } else {
            if (navigationMode === 'back') {
                handleBackSub();
            } else {
                handleNextSub()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!dontUseContrasep) {
        return null
    }

    const pertanyaan = "Alasan utama tidak pakai KB atau putus pakai KB (PILIH HANYA SATU JAWABAN!)";
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

        if (!value.alasan_tidak_kb) {
            newError.alasan_tidak_kb = "Wajib diisi";
        }

        if (value.alasan_tidak_kb === "13") {
            if (!value.alasan_tidak_kb_lainnya) {
                newError.alasan_tidak_kb_lainnya = "Lainnya wajib diisi";
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
            //     jawaban_1: value.alasan_tidak_kb,
            //     jawaban_2: value.alasan_tidak_kb_lainnya

            // }
            // saveValue(normalizeValue)
            let normalizeValue = {
                _id: `${no_kk}${id}`,
                Pertanyaan: pertanyaan,
                Jawaban_H1: 0,
                Jawaban_H2: 0,
                Jawaban_HDate1: "",
                Jawaban_HDate2: "",
                No_Pertanyaan: 10,
                No_KK: no_kk,
                Periode_Sensus: "2020",
                answer: [
                    {
                        _id: `${no_kk}${id}01`,
                        No_Jawaban: value.alasan_tidak_kb,
                        Jawaban_D1: 0,
                        Jawaban_D2: 0,
                        Jawab_D3: 0,
                        Jawab_D4: 0,
                        pilihankb: 0,
                        Lainnya: value.alasan_tidak_kb_lainnya ? value.alasan_tidak_kb_lainnya : ""
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
                    <span className={classes.badge}>10</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12} >
                        <FormControl error={error.alasan_tidak_kb ? true : false} component="fieldset" fullWidth>
                            <RadioGroup value={value.alasan_tidak_kb || ''}
                                onChange={handleChange}
                                aria-label="alasan_tidak_kb" name="alasan_tidak_kb"
                                className={classes.radioGroup}
                            >
                                <div className={classes.radioSection}>
                                    <FormControlLabel control={<Radio />}
                                        value="1"
                                        label="Ingin hamil/anak" />
                                    <FormControlLabel control={<Radio />}
                                        value="2"
                                        label="Tidak tahu tentang KB" />
                                    <FormControlLabel control={<Radio />}
                                        value="3"
                                        label="Alasan kesehatan" />
                                    <FormControlLabel control={<Radio />}
                                        value="4"
                                        label="Efek samping" />
                                    <FormControlLabel control={<Radio />}
                                        value="5"
                                        label="Tempat pelayanan jauh" />
                                    <FormControlLabel control={<Radio />}
                                        value="6"
                                        label="Alat/Obat/Cara KB tidak tersedia" />

                                    <FormControlLabel control={<Radio />}
                                        value="7"
                                        label="Biaya mahal" />
                                </div>
                                <div className={classes.radioSection}>
                                    <FormControlLabel control={<Radio />}
                                        value="8"
                                        label="Tidak ada alat/obat/cara KB yang cocok" />
                                    <FormControlLabel control={<Radio />}
                                        value="9"
                                        label="Suami/keluarga menolak" />
                                    <FormControlLabel control={<Radio />}
                                        value="10"
                                        label="Alasan agama" />
                                    <FormControlLabel control={<Radio />}
                                        value="11"
                                        label="Suami tinggal jauh/jarang berhubungan" />
                                    <FormControlLabel control={<Radio />}
                                        value="12"
                                        label="Tidak ada petugas pelayanan KB" />
                                    <FormControlLabel control={<Radio />}
                                        value="13"
                                        label="Lainnya" />
                                    {value.alasan_tidak_kb === "13" &&

                                        <TextField
                                            fullWidth

                                            placeholder="Tulisakan"
                                            variant="outlined"
                                            id="alasan_tidak_kb_lainnya"
                                            name="alasan_tidak_kb_lainnya"
                                            value={value.alasan_tidak_kb_lainnya || ''}
                                            onChange={handleChange}
                                            error={error.alasan_tidak_kb_lainnya ? true : false}
                                            helperText={error.alasan_tidak_kb_lainnya}
                                            inputProps={{
                                                className: classes.inputMini
                                            }}

                                        />}
                                </div>
                            </RadioGroup>

                            <FormHelperText>{error.alasan_tidak_kb}</FormHelperText>
                        </FormControl>
                    </Grid>




                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubForm11;