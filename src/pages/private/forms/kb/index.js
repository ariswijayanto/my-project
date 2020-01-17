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

import { countAge } from '../pk/validation'

// subforms

import SubForm01 from './subforms/01';
import SubForm02 from './subforms/02';
import SubForm03 from './subforms/03';
import SubForm04 from './subforms/04';
import SubForm05 from './subforms/05';
import SubForm06 from './subforms/06';
import SubForm07 from './subforms/07';
import SubForm08 from './subforms/08';
import SubForm09 from './subforms/09';
import SubForm10 from './subforms/10';
const subforms = {
    "0101": {
        component: SubForm01
    }, "0102": {
        component: SubForm02
    }, "0103": {
        component: SubForm03

    }, "0104": {
        component: SubForm04

    }, "0105": {
        component: SubForm05

    }, "0106": {
        component: SubForm06
    }, "0107": {
        component: SubForm07
    }, "0108": {
        component: SubForm08
    }, "0109": {
        component: SubForm09
    }, "0110": {
        component: SubForm10
    }
};

function KB({ wilayah, keluarga, kb, mainSlide, setKB, handleNext, handleBack, setNormalizeKB, mode, no_kk }) {

    const classes = useStyles();
    const nextRef = useRef(null);
    const backRef = useRef(null);

    const { user: { metadata } } = usePouchDB();
    const { enqueueSnackbar } = useSnackbar();


    const [wifeExists, setWifeExists] = useState(false); //set false 
    const [subformIndex, setSubFormIndex] = useState(0);
    const [slide, setSlide] = useState({
        direction: "left",
        in: true
    });
    const [isSomethingChange, setSomethingChange] = useState(false);

    const [isSubmitting, setSubmitting] = useState(false);

    const [navigationMode, setNavigationMode] = useState('next');



    useEffect(() => {

        const findWife = Object.values(keluarga).find(k => {
            if (k.jenis_kelamin === "2" && k.sts_kawin === "2" && k.sts_hubungan === "2") {
                const age = countAge(k.tgl_lahir);
                return age >= 15 && age <= 49;
            }
            return false;
        })

        let initialKB = {};
        const sfKeys = Object.keys(subforms);
        for (let i = 0; i < sfKeys.length; i++) {
            initialKB[`${sfKeys[i]}`] = {}
        }


        if (findWife) {
            setKB(ckb => {
                if (Object.keys(ckb).length > 0) {
                    return { ...initialKB, ...ckb };
                }
                return initialKB
            })

            setNormalizeKB(ckb => {
                if (Object.keys(ckb).length > 0) {
                    return { ...initialKB, ...ckb };
                }
                return initialKB
            })

            setWifeExists(true)
            if (mainSlide.navigationMode === "next") {
                setNavigationMode('next')
                setSubFormIndex(0);
            } else {
                setNavigationMode('back')
                setSubFormIndex(9);
            }

        } else {
            setKB(initialKB)
            setNormalizeKB(initialKB)
            if (mainSlide.navigationMode === "next") {
                handleNext();
            } else {
                handleBack()
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!wifeExists) {
        return null;
    }

    const handleNextSub = () => {
        if (subformIndex >= 9) {
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
        setKB({
            ...kb,
            [no]: {
                ...kb[no],
                [e.target.name]: e.target.value
            }
        })
        setSomethingChange(true)
    }

    const saveValue = (normalizeValue) => {
        if (!isSomethingChange) {
            return handleNextSub();
        }
        //simpan ke db local
        setSubmitting(true);
        //const id = `${wilayah.no_kk}${no}`;
        try {
            // const existing = await dataKB.local.get(id)

            // await dataKB.local.put({
            //     _id: id,
            //     _rev: existing._rev,
            //     ...normalizeValue
            // })
            setNormalizeKB(normalizeKB => ({
                ...normalizeKB,
                [no]: {
                    ...normalizeValue,
                    user_name: metadata.name
                }
            }))

            setSomethingChange(false);
            setSubmitting(false);
            handleNextSub()
        } catch (e) {
            setSubmitting(false);
            if (e.name === 'not_found') {
                try {
                    // await dataKB.local.put({
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
    const { component: SubForm } = subforms[no];
    const value = kb[no];
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

                    <Typography variant="h5" component="h1">{mode === 'edit' ? `Edit Form Keluarga Berencana` : 'Form Keluarga Berencana'}</Typography>
                    {mode === 'edit' && <Typography>No KK: {no_kk}</Typography>}

                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Slide direction={slide.direction} in={slide.in}>
                        <div className={classes.slideContent}>
                            {value && <SubForm
                                id={no}
                                no_kk={wilayah.no_kk}
                                value={value}
                                setValue={setValue}
                                saveValue={saveValue}
                                kb={kb}
                                handleNextSub={handleNextSub}
                                handleBackSub={handleBackSub}
                                navigationMode={navigationMode}
                            />}
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
                        type="submit">Selanjutnya <ChevronRight className={classes.iconRight} /></Button>
                </Grid>
            </Grid>
        </Swipeable>
    </>);
}


export default KB;