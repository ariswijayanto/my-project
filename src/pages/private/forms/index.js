import React, { useState, useEffect } from 'react';

//forms component
import Wilayah from './wilayah';
import Keluarga from './keluarga';
import KB from './kb';
import PK from './pk';
import Finish from './finish';

// material-ui components
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStyles from './styles/index';

export default function Form() {

    const classes = useStyles();
    const [forms, setForms] = useState([{ type: 'wilayah' }]);
    const [formIndex, setFormIndex] = useState(0);
    const [done, setDone] = useState(false);
    const [slide, setSlide] = useState({
        direction: "left",
        in: true,
        navigationMode: "next"
    });

    const [wilayah, setWilayah] = useState({

    })

    const [keluarga, setKeluarga] = useState({

    })

    const [kb, setKB] = useState({

    })

    const [normalizeKB, setNormalizeKB] = useState({});

    const [pk, setPK] = useState({

    })

    const [normalizePK, setNormalizePK] = useState({});

    useEffect(() => {
        if (wilayah.no_kk && wilayah.jumlah_keluarga) {
            const jumlah_keluarga = parseInt(wilayah.jumlah_keluarga);

            setKeluarga(keluarga => {
                let newkeluarga = {}
                for (let i = 1; i <= jumlah_keluarga; i++) {
                    const id_anggota_kel = ('0' + i).slice(-2);
                    const currKeluarga = keluarga[id_anggota_kel] || {}
                    newkeluarga[id_anggota_kel] = {
                        no_urutnik: i,
                        ...currKeluarga
                    }
                }
                setForms([
                    { type: 'wilayah' },
                    ...Object.keys(newkeluarga).map(key => ({ type: 'keluarga', id: key })),
                    { type: 'kb' },
                    { type: 'pk' }
                ])
                return newkeluarga;
            })

        }
    }, [wilayah.jumlah_keluarga, wilayah.no_kk])

    const resetForm = () => {
        setSlide({
            direction: "right",
            in: false,
            navigationMode: "next"
        });
        setTimeout(() => {
            setForms([{ type: 'wilayah' }]);
            setFormIndex(0);
            setSlide({
                direction: "left",
                in: true,
                navigationMode: "next"
            })
            setWilayah({})
            setKeluarga({})
            setKB({})
            setNormalizeKB({})
            setPK({})
            setNormalizePK({})

            setDone(false);
        }, 300)
    }
    const handleNext = () => {

        setSlide({
            direction: "right",
            in: false,
            navigationMode: "next"
        });
        setTimeout(() => {

            if (formIndex >= (forms.length - 1)) {
                setDone(true);
            } else {
                setFormIndex(index => index + 1);
            }
            setSlide({
                direction: "left",
                in: true,
                navigationMode: "next"
            })

        }, 300)

    }


    const handleBack = () => {
        setSlide({
            direction: "left",
            in: false,
            navigationMode: "back"
        });
        setTimeout(() => {

            setFormIndex(index => index - 1);
            setSlide({
                direction: "right",
                in: true,
                navigationMode: "back"
            })

        }, 300)
    }

    if (done) {
        return <><Slide direction={slide.direction} in={slide.in}>
            <div>
                <Finish
                    wilayah={wilayah}
                    keluarga={keluarga}
                    normalizePK={normalizePK}
                    normalizeKB={normalizeKB}
                    resetForm={resetForm}
                // pk={pk}
                // kb={kb}
                />
            </div>
        </Slide>
        </>
    }

    const f = forms[formIndex];

    //console.log(slide, formIndex, wilayah, keluarga, kb, pk)
    // console.log(normalizeKB);
    // console.log(normalizePK)
    return <Container maxWidth="md" className={classes.container}>
        <Slide direction={slide.direction} in={slide.in}>
            <div>
                {f.type === 'wilayah' &&

                    <Wilayah

                        wilayah={wilayah}
                        setWilayah={setWilayah}
                        setFormIndex={setFormIndex}
                        handleNext={handleNext}

                    />

                }

                {
                    f.type === 'keluarga' &&

                    <Keluarga
                        id={f.id}
                        setFormIndex={setFormIndex}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        keluarga={keluarga}
                        setKeluarga={setKeluarga}
                        formIndex={formIndex}
                    />

                }
                {
                    f.type === 'kb' &&
                    <KB
                        setFormIndex={setFormIndex}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        mainSlide={slide}
                        keluarga={keluarga}
                        wilayah={wilayah}
                        kb={kb}
                        setKB={setKB}
                        setNormalizeKB={setNormalizeKB}
                    />

                }

                {
                    f.type === 'pk' &&
                    <PK
                        setFormIndex={setFormIndex}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        mainSlide={slide}
                        keluarga={keluarga}
                        wilayah={wilayah}
                        kb={kb}
                        pk={pk}
                        setPK={setPK}
                        setNormalizePK={setNormalizePK}
                    />
                }
            </div>
        </Slide>

        {/* formNodes.length > 0 && <Carousel
            autoplay={false}
            enableKeyboardControls={false}
            withoutControls
            swiping={false}
            dragging={false}
            slideIndex={formIndex}
            heightMode="current"

        >
            {formNodes}

            <Wilayah
            wilayah={wilayah}
            setWilayah={setWilayah}
            setFormIndex={setFormIndex}
        />
        {
            Object.keys(keluarga).map((key) => {

                return <Keluarga
                    key={key}
                    id={key}
                    setFormIndex={setFormIndex}
                    keluarga={keluarga}
                    setKeluarga={setKeluarga}
                />
            })
        }  </Carousel>} */}
    </Container>
}