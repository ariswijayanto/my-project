import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
const useStyles = makeStyles(theme => ({

    container: {
        // marginTop: theme.spacing(8),
        padding: theme.spacing(2),
        //  textAlign: 'center'
    },
    textCenter: {
        textAlign: 'center'
    }

}))

export default useStyles;