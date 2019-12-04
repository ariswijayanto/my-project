import React, { useState, useEffect, useRef } from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//icons
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

import useStyles from './styles';

import { usePouchDB } from '../../../../components/PouchDB/PouchDBProvider';
import { useSnackbar } from 'notistack';

import { Swipeable } from 'react-swipeable';

import subforms from './questions.json';

// subforms
import SubFormRadio from './subforms/radio';
import SubFormNumber from './subforms/number';
import SubformCheckbox from './subforms/checkbox';

function PK({ wilayah, keluarga, kb, pk, mainSlide, setPK, handleNext, handleBack, setNormalizePK, mode, no_kk }) {

    const classes = useStyles();
    const nextRef = useRef(null);
    const backRef = useRef(null);

    const { user: { metadata } } = usePouchDB();
    const { enqueueSnackbar } = useSnackbar();
    const [subformIndex, setSubFormIndex] = useState(0)//set 0;
    const [slide, setSlide] = useState({
        direction: "left",
        in: true
    });
    const [isSomethingChange, setSomethingChange] = useState(false);

    const [isSubmitting, setSubmitting] = useState(false);

    const [navigationMode, setNavigationMode] = useState('next');



    useEffect(() => {

        let initialPK = {};
        const sfKeys = Object.keys(subforms);
        for (let i = 0; i < sfKeys.length; i++) {
            initialPK[`${sfKeys[i]}`] = {}
        }
        setPK(cpk => {
            if (Object.keys(cpk).length > 0) {
                return { ...initialPK, ...cpk };
            }

            return initialPK
        });

        setNormalizePK(cpk => {
            if (Object.keys(cpk).length > 0) {
                return { ...initialPK, ...cpk };
            }

            return initialPK
        })



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleNextSub = () => {
        if (subformIndex >= 31 || (subformIndex === 30 && pk["0231"] && pk["0231"].jawaban === "2")) {
            return handleNext()
        }
        setNavigationMode('next')
        setSlide({
            direction: "right",
            in: false
        });
        setTimeout(() => {

            setSubFormIndex(index => index + 1);
            setSlide({
                direction: "left",
                in: true
            })

        }, 300)

    }


    const handleBackSub = () => {


        if (subformIndex === 0) {
            return handleBack()
        }

        setNavigationMode('back')
        setSlide({
            direction: "left",
            in: false
        });
        setTimeout(() => {

            setSubFormIndex(index => index - 1);
            setSlide({
                direction: "right",
                in: true
            })

        }, 300)
    }


    const no = Object.keys(subforms)[subformIndex];

    const setValue = (e) => {
        setPK({
            ...pk,
            [no]: {
                ...pk[no],
                [e.target.name]: e.target.value
            }
        })
        setSomethingChange(true)
    }

    const saveValue = async (normalizeValue) => {
        if (!isSomethingChange) {
            return handleNextSub();
        }
        //simpan ke db local
        setSubmitting(true);
        const id = `${wilayah.no_kk}${no}`;
        try {
            // const existing = await dataPK.local.get(id)

            // await dataPK.local.put({
            //     _id: id,
            //     _rev: existing._rev,
            //     ...normalizeValue
            // })

            setNormalizePK(normalizePK => ({
                ...normalizePK,
                [no]: {
                    ...normalizeValue,
                    _id: id,
                    No_KK: wilayah.no_kk,
                    Periode_Sensus: "2020",
                    user_name: metadata.name
                }
            }));

            setSomethingChange(false);
            setSubmitting(false);
            handleNextSub()
        } catch (e) {
            setSubmitting(false);
            if (e.name === 'not_found') {
                try {
                    // await dataPK.local.put({
                    //     _id: id,
                    //     type: 'anggota',
                    //     ...normalizeValue
                    // })

                    setSomethingChange(false);
                    handleNextSub()
                } catch (e) {
                    enqueueSnackbar(e.message, { variant: 'error' })
                }
            } else {
                enqueueSnackbar(e.message, { variant: 'error' })
            }

        }
    }
    //console.log(subformIndex, no)

    // subform aktif
    const form = subforms[no];
    const value = pk[no];
    //console.log(form, value, pk)
    return (<>
        <Swipeable
            trackMouse={true}
            onSwipedRight={(e) => {

                if (backRef) {
                    backRef.current.click()
                }
            }}
            onSwipedLeft={(e) => {
                if (nextRef) {

                    nextRef.current.click();
                }
            }}
        >
            <Grid container spacing={3}>

                <Grid item xs={12} className={classes.textCenter}>

                    <Typography variant="h5" component="h1">{mode === 'edit' ? `Edit Form Pembangunan Keluarga` : 'Form Pembangunan Keluarga'}</Typography>
                    {mode === 'edit' && <Typography>No KK: {no_kk}</Typography>}

                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Slide direction={slide.direction} in={slide.in}>
                        <div className={classes.slideContent}>
                            {value &&
                                <>
                                    {form.tipe === 'radio' &&
                                        <SubFormRadio
                                            id={no}
                                            value={value}
                                            setValue={setValue}
                                            saveValue={saveValue}
                                            kb={kb}
                                            handleNextSub={handleNextSub}
                                            handleBackSub={handleBackSub}
                                            navigationMode={navigationMode}
                                            subformIndex={subformIndex}
                                            form={form}
                                            keluarga={keluarga}

                                        />
                                    }

                                    {form.tipe === 'number' &&
                                        <SubFormNumber
                                            id={no}
                                            value={value}
                                            setValue={setValue}
                                            saveValue={saveValue}
                                            kb={kb}
                                            handleNextSub={handleNextSub}
                                            handleBackSub={handleBackSub}
                                            navigationMode={navigationMode}
                                            subformIndex={subformIndex}
                                            form={form}
                                        />
                                    }

                                    {form.tipe === 'checkbox' &&
                                        <SubformCheckbox
                                            id={no}
                                            value={value}
                                            setValue={setValue}
                                            saveValue={saveValue}
                                            kb={kb}
                                            handleNextSub={handleNextSub}
                                            handleBackSub={handleBackSub}
                                            navigationMode={navigationMode}
                                            subformIndex={subformIndex}
                                            form={form}
                                            keluarga={keluarga}
                                            pk={pk}

                                        />
                                    }

                                </>
                            }
                        </div>
                    </Slide>

                </Grid>
                <Grid item xs>
                    <Button
                        ref={backRef}
                        // disabled={!isSomethingChange || isSubmitting}
                        onClick={handleBackSub}><ChevronLeft className={classes.iconLeft} /> Sebelumnya </Button>

                </Grid>
                <Grid item >
                    {isSubmitting && <CircularProgress size={14} />}
                    <Button
                        ref={nextRef}
                        form={no}
                        disabled={isSubmitting}
                        type="submit">{(subformIndex >= 31 || (subformIndex === 30 && pk["0231"] && pk["0231"].jawaban === "2")) ? 'Selesai' : 'Selanjutnya'} <ChevronRight className={classes.iconRight} /></Button>
                </Grid>
            </Grid>
        </Swipeable>
    </>);
}


export default PK;