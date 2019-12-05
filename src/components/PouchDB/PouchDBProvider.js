import React, { useContext, useEffect, useState } from 'react';

import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';
import PouchDBAuth from 'pouchdb-authentication';
import { remote, local } from '../../config/db';
import { useSnackbar } from 'notistack';


//localforage
//import localforage from 'localforage';

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBAuth);

// db 05Des2019
const dataBkkbn = {
    local: new PouchDB(local.data_bkkbn),
    remote: new PouchDB(remote.data_bkkbn)
}

// db 
const dataPK = {
    local: new PouchDB(local.data_pk),
    remote: new PouchDB(remote.data_pk)
}

const dataKK = {
    local: new PouchDB(local.data_kk),
    remote: new PouchDB(remote.data_kk)
}

const dataKB = {
    local: new PouchDB(local.data_kb),
    remote: new PouchDB(remote.data_kb)
}

const dataFrontend = new PouchDB('frontend');



const PouchDBContext = React.createContext();

//create indexes 05Des2019
dataBkkbn.local.createIndex({
    index: {
        fields: ['No_KK']
    }
});

// //create indexes
dataKK.local.createIndex({
    index: {
        fields: ['user_name', 'no_kk']
    }
});
dataKB.local.createIndex({
    index: {
        fields: ['No_KK']
    }
});

dataPK.local.createIndex({
    index: {
        fields: ['No_KK']
    }
});

// create filter
(async () => {
    try {
        await dataBkkbn.local.put({
            "_id": "_design/app",
            "filters": {
                "by_user_name": "function(doc, req) {return doc.user_name === req.query.user_name;}"
            }
        })

        await dataKK.local.put({
            "_id": "_design/app",
            "filters": {
                "by_user_name": "function(doc, req) {return doc.user_name === req.query.user_name;}"
            }
        })

        await dataPK.local.put({
            "_id": "_design/app",
            "filters": {
                "by_user_name": "function(doc, req) {return doc.user_name === req.query.user_name;}"
            }
        })

        await dataKB.local.put({
            "_id": "_design/app",
            "filters": {
                "by_user_name": "function(doc, req) {return doc.user_name === req.query.user_name;}"
            }
        })
    } catch (e) {

    }
})();





export function usePouchDB() {

    return useContext(PouchDBContext);
}


function PouchDBProvider(props) {

    const [user, setUser] = useState({
        isLoggedIn: false,
        loading: true
    })
    const [auth, setAuth] = useState({})
    const { enqueueSnackbar } = useSnackbar();

    //console.log(user)
    // auth
    useEffect(() => {

        const auth = new PouchDB(remote.users);
        setAuth(auth);
        const getSession = async () => {
            setUser(user => ({ ...user, loading: true }))

            try {

                const localsession = await dataFrontend.get('auth');
                // console.log(localsession)
                setUser(localsession.authData)


            } catch (e) {
                // console.log(e.message)
                // console.log(e)
                if (e.name === 'not_found') {
                    try {
                        const session = await auth.getSession();
                        // console.log(session)

                        if (session.userCtx.name) {

                            const metadata = await auth.getUser(session.userCtx.name)
                            setUser(user => ({
                                ...user,
                                ...session,
                                isLoggedIn: true,
                                metadata,
                            }))

                            const authData = {
                                ...session,
                                isLoggedIn: true,
                                metadata
                            }
                            await dataFrontend.put({
                                _id: 'auth',
                                authData
                            })




                        } else {
                            setUser({

                                isLoggedIn: false,
                                loading: false
                            })
                        }
                    } catch (e) {
                        setUser({

                            isLoggedIn: false,
                            loading: false
                        })
                    }
                } else {
                    setUser({

                        isLoggedIn: false,
                        loading: false
                    })
                }
            }

            setUser(user => ({ ...user, loading: false }))
        }

        getSession()


    }, [user.isLoggedIn])

    const logoutAndClearLocal = async () => {
        try {
            await auth.logOut()
            const localsession = await dataFrontend.get('auth')
            await dataFrontend.remove(localsession);
            setUser(user => ({ ...user, isLoggedIn: false }))
        } catch (e) {
            console.log(JSON.stringify(e))
            if (e.name === 'not_found') {
                setUser(user => ({ ...user, isLoggedIn: false }))
            } else if (e.name === 'unknown') {
                enqueueSnackbar('Anda sedang offline, logout hanya bisa dilakukan saat anda online', { variant: 'error' })
            } else {
                enqueueSnackbar('Terjadi kesalahan silahkan coba lagi', { variant: 'error' })
            }
        }
    }


    return <PouchDBContext.Provider value={{
        logoutAndClearLocal,
        auth,
        user,
        setUser,
        dataKK,
        dataPK,
        dataKB,
        dataBkkbn,
        PouchDB
    }}>
        {props.children}
    </PouchDBContext.Provider>

}

export default PouchDBProvider;
