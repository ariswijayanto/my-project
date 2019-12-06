 
const remotebase = "https://dev2.multisoft.co.id:36984";//"http://192.168.181.52:30984";//process.env.NODE_ENV === "development" ? "http://36.89.25.222:30984" : "https://dbd4a17b-7bc4-4dee-a0eb-eaa71a018c24-bluemix.cloudant.com";//$http://36.89.25.222:30984

export const remote = {
    usermanagement: `${remotebase}/usermanagement`,
    wilayah: `${remotebase}/wilayah`,
    data: `${remotebase}/data`,
    users: `${remotebase}/_users`,
    data_kk: `${remotebase}/data_kk`,
    data_kb: `${remotebase}/data_kb`,
    data_pk: `${remotebase}/data_pk`,
    //05Des2019
    data_bkkbn: `${remotebase}/data_bkkbn`,
    cloudant_url: `${remotebase}`
}


export const local = {
    data_kk: 'data_kk',
    data_kb: 'data_kb',
    data_pk: 'data_pk',
    //05Des2019
    data_bkkbn: `data_bkkbn`
}