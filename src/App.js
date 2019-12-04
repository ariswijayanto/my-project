import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// page components
import NotFound from './pages/404';
import Login from './pages/login';
import Private from './pages/private';


// app components
import PrivateRoute from './components/PrivateRoute';
import PouchDBProvider from './components/PouchDB/PouchDBProvider';
import ScrollToTop from './components/ScrollToTop';
// material-ui components
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './config/theme';
import { SnackbarProvider } from "notistack";

// // date picker
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
// the root component
function App() {

  return (
    <>

      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <PouchDBProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Router>
                <ScrollToTop />
                <Switch>
                  <PrivateRoute path="/" exact component={Private} />
                  <PrivateRoute path="/form" component={Private} />
                  <PrivateRoute path="/list" component={Private} />
                  <PrivateRoute path="/definisi-operasional" component={Private} />
                  <Route path="/login" component={Login} />
                  <Route component={NotFound} />
                </Switch>

              </Router>
            </MuiPickersUtilsProvider>

          </PouchDBProvider>
        </SnackbarProvider>

      </ThemeProvider>

    </>
  );
}

export default App;
