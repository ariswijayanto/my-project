import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    textCenter: {
        textAlign: 'center'
    },
    iconRight: {
        marginLeft: theme.spacing(1)
    },
    iconLeft: {
        marginRight: theme.spacing(1)
    },

    form: {
        paddingBottom: theme.spacing(8)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    btnWrap: {
        // width: '100%',
        position: 'relative',
        margin: '25px 0 40px',
    },
    buttonProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}))


export default useStyles;