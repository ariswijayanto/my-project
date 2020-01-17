import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    title: {
        //color: theme.palette.primary.main
        textAlign: 'center',
        marginBottom: theme.spacing(1)
    },
    container: {
        marginTop: theme.spacing(8),

    },
    paper: {
        padding: theme.spacing(6),
        backgroundColor: 'rgba(255,255,255,.3)'
    },
    buttons: {
        marginTop: theme.spacing(2)
    },
    forgotPassword: {
        marginTop: theme.spacing(3)
    },
    logo: {
        height: 92
    },
    textCenter: {
        textAlign: 'center'
    }
}))


export default useStyles;