import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// pouchdb hooks
import { usePouchDB } from './PouchDB/PouchDBProvider';

import DataSyncProvider from './PouchDB/DataSyncProvider';

// import
import AppLoading from './AppLoading';
function PrivateRoute({ component: Component, ...restProps }) {
    const { user } = usePouchDB();
    ////console.log(auth)

    if (user.loading) {
        return <AppLoading />
    }

    return <Route
        {...restProps}
        render={props => {
            return user.isLoggedIn ?
                <DataSyncProvider><Component  {...props} /></DataSyncProvider>
                :
                <Redirect to={{
                    pathname: "/login",
                    state: {
                        //from: props.location
                    }
                }} />
        }}
    />
}

export default PrivateRoute;