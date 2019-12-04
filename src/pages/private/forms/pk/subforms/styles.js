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


    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        wordWrap: 'break-word',
        backgroundColor: 'rgba(0,0,0,.03)',
        backgroundClip: 'border-box',
        border: "1px solid rgba(255,255,255,.125)",
        borderRadius: '.25rem'
    },
    cardHeader: {
        padding: '12px 10px 5px 20px',
        marginBottom: 0,
        backgroundColor: 'rgba(0,0,0,.01)',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        "&:first-child": {
            borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
        }
    },

    cardBody: {
        flex: '1 1 auto',
        padding: '.7rem 1.0rem',
        backgroundColor: 'rgba(255,255,255,.2)'
    },

    badge: {
        fontSize: '100%',
        color: '#212529',
        backgroundColor: '#ffc107',
        paddingRight: '.6em',
        paddingLeft: '.6em',
        borderRadius: '10rem',
        display: 'inline-block',
        padding: '.25em .4em',

        fontWeight: 700,
        lineHeight: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'baseline',
        marginRight: theme.spacing(1)
    },

    inputMini: {
        padding: "10.5px 14px"
    },
    inputAdornmentNoWrap: {
        whiteSpace: 'nowrap'
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row !important'
    },
    radioSection: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flex: 1
    }

}))


export default useStyles;