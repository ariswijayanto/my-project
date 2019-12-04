import React from 'react';
import PropTypes from 'prop-types';
import AppSelect from './index';
import useRest from '../../hooks/useRest';
function SelectKota({ TextFieldProps = {}, provinsi_id, ...props }) {

    const [response, loading] = useRest({
        url: 'kota', method: 'get', params: {
            provinsi_id
        }
    }
    )



    return <AppSelect
        disabled={loading || !provinsi_id || TextFieldProps.disabled}
        options={response ? response.data.Items.map(kota => ({ label: kota.nama, value: kota.kota_id })) : []}
        inputId="react-select-kota"
        placeholder="Pilih Kota"
        TextFieldProps={{

            label: 'Kota',
            InputLabelProps: {
                htmlFor: 'react-select-kota',
                shrink: true,
            },
            ...TextFieldProps,
            disabled: loading || !provinsi_id || TextFieldProps.disabled,
        }}
        {...props}
    />

}

SelectKota.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    provinsi_id: PropTypes.string.isRequired
}

export default SelectKota;
