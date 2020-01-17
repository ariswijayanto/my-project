import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    textCenter: {
        textAlign: 'center'
    },
    iconRight: {
        marginLeft: theme.spacing(1)
    },
    form: {
        paddingBottom: theme.spacing(8)
    }
}))


export default useStyles;