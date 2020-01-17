import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


import options from './options';

export const renderDataKK = (metadata, wilayah) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography>Provinsi: {metadata.wil_provinsi.nama_provinsi}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>Kabupaten/Kota: {metadata.wil_kabupaten.nama_kabupaten}</Typography>

            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>Kecamatan: {metadata.wil_kecamatan.nama_kecamatan}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>Desa/Kel: {metadata.wil_kelurahan.nama_kelurahan}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography>RW/Dusun: {wilayah.id_rw}</Typography>

            </Grid>
            <Grid item xs={12} md={4}>
                <Typography>RT: {wilayah.id_rt}</Typography>


            </Grid>
            <Grid item xs={12} md={4}>
                <Typography>No. Urut Rumah: {wilayah.no_urutrmh}</Typography>


            </Grid>
            <Grid item xs={12} md={3}>
                <Typography>No. Urut Keluarga: {wilayah.no_urutkel}</Typography>


            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>No. Kartu Keluarga (KK): {wilayah.no_kk}</Typography>

            </Grid>
            <Grid item xs={12} md={3}>
                <Typography>Jumlah Anggota Keluarga: {wilayah.jumlah_keluarga}</Typography>

            </Grid>
            <Grid item xs={12} >
                <Typography>Alamat : {wilayah.alamat}</Typography>

            </Grid>

        </Grid>
    )
}


export const renderDataNIK = item => {

    return (<Grid container spacing={1}>
        <Grid item xs={12}>
            <Divider />
        </Grid>
        <Grid item xs={12} >
            <Typography variant="subtitle1" >Anggota Keluarga {item.no_urutnik}</Typography>

        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography> Nama: {item.nama_anggotakel} </Typography>

        </Grid>
        <Grid item xs={12} md={6}>
            <Typography> NIK: {item.nik} </Typography>

        </Grid>
        <Grid item xs={12} md={4}>

            <Typography> Jenis Kelamin: {options.jenis_kelamin[item.jenis_kelamin]} </Typography>

        </Grid>
        <Grid item xs={12} md={4}>

            <Typography> Hubungan Dengan Kepala Keluarga: {options.sts_hubungan[item.sts_hubungan]} </Typography>



        </Grid>
        <Grid item xs={12} md={4}>

            <Typography> Hubungan Anak Dengan Ibu: {options.sts_hubanak_ibu[item.sts_hubanak_ibu]} </Typography>


        </Grid>
        <Grid item xs={12} md={4}>

            <Typography> Kode Ibu Kandung: {item.kd_ibukandung} </Typography>


        </Grid>
        <Grid item xs={12} md={4}>
            <Typography> Memiliki Akta Lahir: {options.sts_akta[item.sts_akta]} </Typography>



        </Grid>

        <Grid item xs={12} md={4}>

            <Typography> Tanggal Lahir: {item.tgl_lahir} </Typography>

        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <Typography> Status Perkawinan: {options.sts_kawin[item.sts_kawin]} </Typography>


        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <Typography> Usia Kawin: {item.usia_kawin} </Typography>

        </Grid>
        <Grid item xs={12} md={4}>
            <Typography> Pendidikan: {options.jns_pendidikan[item.jns_pendidikan]} </Typography>

        </Grid>
        <Grid item xs={12} md={4}>
            <Typography> Kepesertaan JKN/Asurasnsi: {options.jns_asuransi[item.jns_asuransi]} </Typography>


        </Grid>

        <Grid item xs={12} sm={6} md={4}>
            <Typography> Agama: {options.id_agama[item.id_agama]} </Typography>


        </Grid>

        <Grid item xs={12} sm={6} md={4}>
            <Typography> Pekerjaan: {options.id_pekerjaan[item.id_pekerjaan]} </Typography>

        </Grid>
    </Grid>)
}