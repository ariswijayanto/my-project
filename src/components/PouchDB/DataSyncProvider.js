import React, { useContext, useEffect, useState } from 'react';

import { usePouchDB } from './PouchDBProvider';

const DataSyncContext = React.createContext();


export function useDataSync() {
    return useContext(DataSyncContext);
}

export default function DataSyncProvider(props) {

    const { user: { metadata }, dataKK, dataPK, dataKB } = usePouchDB();

    const [isSyncing, setSyncing] = useState({
        syncKK: false,
        syncKB: false,
        syncPK: false,
        statusNotif: { count: 0, message: [] }
    })

    useEffect(() => {


        let didCancel = false;
        let syncKK;
        let syncKB;
        let syncPK;
        let count = 0;
        let messages = [];
        dataKK.local.replicate.from(dataKK.remote, {
            filter: 'app/by_user_name',
            query_params: { "user_name": metadata.name }
        }).on('complete', () => {


            syncKK = dataKK.local.sync(dataKK.remote, {
                live: true,
                retry: true,
                // push: true,
                // pull: false,
                filter: 'app/by_user_name',
                query_params: { "user_name": metadata.name }
                // filter: function (doc, params) {

                //     return doc.user_name === params.user_name
                // }
            }).on('change', (info) => {
                // handle change

                if (!didCancel) {
                    messages = [...messages, { 'content': 'Tanggal: , update status ' + info.change.docs[0].status_sensus + ' pada no. KK: ' + info.change.docs[0].no_kk + ' a.n.: ' + info.change.docs[0].data_nik[0].nama_anggotakel }];
                    count = count + 1;
                    setSyncing(isSyncing => ({ ...isSyncing, syncKK: true, infoKK: info, statusNotif: { count: count, message: messages } }));
                }
            }).on('paused', (err) => {
                // replication paused (e.g. replication up to date, user went offline)
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKK: false, errorKK: err }));
            }).on('active', () => {
                // replicate resumed (e.g. new changes replicating, user went back online)
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKK: true }));
            }).on('denied', (err) => {
                // a document failed to replicate (e.g. due to permissions)
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKK: false, errorKK: err }));
            }).on('complete', (info) => {
                // handle complete
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKK: false, infoKK: info }));
            }).on('error', (err) => {
                // handle error
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKK: false, errorKK: err }));
            });

        })

        dataKB.local.replicate.from(dataKB.remote, {
            filter: 'app/by_user_name',
            query_params: { "user_name": metadata.name }
        }).on('complete', () => {
            syncKB = dataKB.local.sync(dataKB.remote, {
                live: true,
                retry: true,

                filter: 'app/by_user_name',
                query_params: { "user_name": metadata.name }
                // query_params: { user_name: metadata.name },
                // filter: function (doc, params) {

                //     return doc.user_name === params.user_name
                // }
            }).on('change', (info) => {
                // handle change
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKB: true, infoKB: info }));
            }).on('paused', (err) => {
                // replication paused (e.g. replication up to date, user went offline)
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKB: false, errorKB: err }));
            }).on('active', () => {
                // replicate resumed (e.g. new changes replicating, user went back online)
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKB: true }));
            }).on('denied', (err) => {
                // a document failed to replicate (e.g. due to permissions)
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKB: false, errorKB: err }));
            }).on('complete', (info) => {
                // handle complete
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKB: false, infoKB: info }));
            }).on('error', (err) => {
                // handle error
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncKB: false, errorKB: err }));
            });

        })

        dataPK.local.replicate.from(dataPK.remote, {
            filter: 'app/by_user_name',
            query_params: { "user_name": metadata.name }
        }).on('complete', () => {


            syncPK = dataPK.local.sync(dataPK.remote, {
                live: true,
                retry: true,
                filter: 'app/by_user_name',
                query_params: { "user_name": metadata.name }
                // query_params: { user_name: metadata.name },
                // filter: function (doc, params) {

                //     return doc.user_name === params.user_name
                // }
            }).on('change', (info) => {
                // handle change
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncPK: true, infoPK: info }));
            }).on('paused', (err) => {
                // replication paused (e.g. replication up to date, user went offline)
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncPK: false, errorPK: err }));
            }).on('active', () => {
                // replicate resumed (e.g. new changes replicating, user went back online)
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncPK: true }));
            }).on('denied', (err) => {
                // a document failed to replicate (e.g. due to permissions)
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncPK: false, errorPK: err }));
            }).on('complete', (info) => {
                // handle complete
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncPK: false, infoPK: info }));
            }).on('error', (err) => {
                // handle error
                if (!didCancel)
                    setSyncing(isSyncing => ({ ...isSyncing, syncPK: false, errorPK: err }));
            });
        })


        return () => {
            didCancel = true;
            if (syncKK)
                syncKK.cancel();
            if (syncKB)
                syncKB.cancel();
            if (syncPK)
                syncPK.cancel()

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log(isSyncing)

    return <DataSyncContext.Provider
        value={{
            isSyncing
        }}
    >{props.children}</DataSyncContext.Provider>
}
