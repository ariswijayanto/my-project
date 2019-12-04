import React from 'react';
import PropTypes from 'prop-types';
import AppSelect from './index';

import useRest from '../../hooks/useRest';

function SelectSekolah({ TextFieldProps = {}, provinsi_id, kota_id, ...props }) {
    const [response, loading] = useRest({
        url: 'sekolah', method: 'get', params: {
            kota_id
        }
    }
    )

    return <AppSelect
        disabled={loading || !provinsi_id || !kota_id || TextFieldProps.disabled}
        options={response ? response.data.Items.map(sekolah => ({ label: sekolah.nama, value: sekolah.sekolah_id })) : []}
        inputId="react-select-sekolah"
        placeholder="Pilih Sekolah"
        TextFieldProps={{

            label: 'Sekolah',
            InputLabelProps: {
                htmlFor: 'react-select-sekolah',
                shrink: true,
            },
            ...TextFieldProps,
            disabled: loading || !provinsi_id || !kota_id || TextFieldProps.disabled,
        }}
        {...props}
    />

}

SelectSekolah.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    provinsi_id: PropTypes.string.isRequired,
    kota_id: PropTypes.string.isRequired
}

export default SelectSekolah;
