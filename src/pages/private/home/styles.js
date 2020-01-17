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
    iconLeft: {
        marginRight: theme.spacing(1)
    },
    iconRight: {
        marginLeft: theme.spacing(1)
    },
    imgResponsive: {
        width: "100%"
    },
    progressKerja: {
        backgroundColor: green[500],
        padding: "1.25rem",
        color: "#fff"
    },
    wilayahKerja: {
        backgroundColor: red[500],
        padding: "1.25rem",
        color: "#fff"
    },
    floatRightIcon: {
        float: 'right'
    },
    blueGreyBackground: {
        backgroundColor: blueGrey[500],
        padding: "1.25rem",
        color: "#fff",
        textAlign: 'center',
        width: "100%"
    },

    fullWidth: {
        width: "100%"
    }

}))

export default useStyles;