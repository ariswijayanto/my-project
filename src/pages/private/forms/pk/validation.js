import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import parseDate from 'date-fns/parse';

import { formatString } from '../keluarga';

export function countAge(tgl_lahir) {

    const days = differenceInCalendarDays(new Date(), parseDate(tgl_lahir, formatString, new Date()));

    const years = days / 365;
    return parseInt(years);
}

function haveChildren(keluarga) {

    return keluarga.some((value) => {
        return value.sts_hubungan === "3";
    })

}


function haveWifeOrHusband(keluarga) {
    return keluarga.some((value) => {
        return value.sts_hubungan === "2";
    })
}

function haveChildrenUnder5(keluarga) {
    return keluarga.some((value) => {

        if (value.sts_hubungan === "3") {

            // const days = differenceInCalendarDays(new Date(), new Date(value.tgl_lahir));

            const years = countAge(value.tgl_lahir);//days / 365;

            if (years <= 5) {
                return true;
            }
        }

        return false;
    })
}
function haveChildrenUnder6(keluarga) {
    return keluarga.some((value) => {

        if (value.sts_hubungan === "3") {

            // const days = differenceInCalendarDays(new Date(), new Date(value.tgl_lahir));

            const years = countAge(value.tgl_lahir);//days / 365;

            if (years <= 6) {
                return true;
            }
        }

        return false;
    })
}
function haveChildrenFrom10To24(keluarga) {
    return keluarga.some((value) => {

        if (value.sts_hubungan === "3") {

            // const days = differenceInCalendarDays(new Date(), new Date(value.tgl_lahir));

            const years = countAge(value.tgl_lahir);//days / 365;
            //console.log(years);

            if (years >= 10 && years <= 24) {
                //console.log('true')
                return true;
            }
        }

        return false;
    })
}

function haveFamilyMember60(keluarga) {
    return keluarga.some((value) => {



        // const days = differenceInCalendarDays(new Date(), new Date(value.tgl_lahir));

        const years = countAge(value.tgl_lahir);//days / 365;

        if (years >= 60) {
            return true;
        }


        return false;
    })
}

function haveMarriedMember(keluarga) {
    return keluarga.some((value) => {
        return value.sts_kawin === "2";
    })
}

function haveChildrenFrom0To17(keluarga) {
    return keluarga.some((value) => {

        if (value.sts_hubungan === "3") {

            // const days = differenceInCalendarDays(new Date(), new Date(value.tgl_lahir));

            const years = countAge(value.tgl_lahir);//days / 365;

            if (years >= 0 && years <= 17) {
                return true;
            }
        }

        return false;
    })
}

export default {
    haveChildren,
    haveWifeOrHusband,
    haveChildrenUnder5,
    haveChildrenUnder6,
    haveChildrenFrom10To24,
    haveFamilyMember60,
    haveMarriedMember,
    haveChildrenFrom0To17


}