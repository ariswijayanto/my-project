
import { fade, makeStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/blue';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed

    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundImage: "linear-gradient(to right, #fff, #2699FB)",
        padding: ".5rem 1rem"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        color: "rgba(0, 0, 0, 0.87)"
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    logo: {

        height: 65,
        display: 'inline-block',
        paddingTop: '.3125rem',
        paddingBottom: '.3125rem',
        marginRight: '1rem',
        fontSize: '1.25rem',
        lineHeight: 'inherit',
        whiteSpace: 'nowrap'
    },
    buttonToolbar: {
        textTransform: 'none',
        margin: theme.spacing(1)
    },
    iconLeft: {
        marginRight: theme.spacing(1)
    },
    menuIcon: {
        fontSize: '2.5rem'
    },
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',

    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    orangeAvatar: {

        color: '#fff',
        backgroundColor: deepOrange[500],
        border: "solid 2px"
    },
    avatar: {
        marginLeft: theme.spacing(2)
    },
    textCenter: {
        textAlign: 'center'
    },
    iconColor: {
        color: "#fff"
    },
    space: {
        marginLeft: theme.spacing(1)
    },
    searchMobile: {
        flexGrow: 1
    },
    inputInputMobile: {
        padding: 10,
    },
    syncing: {
        fontSize: 14
    },
    notifItem: {
        whiteSpace: 'normal'
    }

}));

export default useStyles;