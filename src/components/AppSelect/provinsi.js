import React from 'react';
import PropTypes from 'prop-types';
import AppSelect from './index';
import dataProvinsi from './data/provinsi.json';

function SelectProvinsi({ TextFieldProps = {}, ...props }) {
    //  const { firestore } = useFirebase();
    //const [dataProvinsi, loading] = useCollectionDataOnce(firestore.collection('provinsi'));

    return <AppSelect
        disabled={TextFieldProps.disabled}
        options={dataProvinsi ? dataProvinsi.map(prov => ({ label: prov.nama, value: prov.provinsi_id })) : []}
        inputId="react-select-provinsi"
        placeholder="Pilih Provinsi"
        TextFieldProps={{

            label: 'Provinsi',
            InputLabelProps: {
                htmlFor: 'react-select-provinsi',
                shrink: true,
            },
            ...TextFieldProps

        }}
        {...props}
    />

}

SelectProvinsi.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
}

export default SelectProvinsi;
