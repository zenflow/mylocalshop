import { useRouter } from 'next/router'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { makeStyles } from '@material-ui/core/styles'
import ErrorIcon from '@material-ui/icons/Report'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useTranslate } from 'react-admin'
import GoogleIcon from './GoogleIcon'
import { useSession } from '../hooks/session'

const useStyles = makeStyles(
  theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        padding: '1em',
      },
      fontFamily: 'Roboto, sans-serif',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      opacity: 0.7,
    },
    icon: {
      width: '2em',
      height: '2em',
      marginRight: '0.5em',
    },
    panel: {
      marginTop: '1em',
    },
    panelDetails: {
      whiteSpace: 'pre-wrap',
    },
    toolbar: {
      marginTop: '2em',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
  { name: 'RaError' },
)

export const ErrorPage = ({ title = null, details = null, buttons = null }) => {
  const classes = useStyles()
  const translate = useTranslate()
  return (
    <div className={classnames(classes.container)}>
      <h1 className={classes.title} role="alert">
        <ErrorIcon className={classes.icon}/>
        {title || translate('ra.page.error')}
      </h1>
      {details && (
        <ExpansionPanel className={classes.panel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            {translate('ra.message.details')}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelDetails}>
            <div>
              <h2>{details}</h2>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
      <div className={classes.toolbar}>
        <Button
          variant="contained"
          onClick={() => window.history.go(-1)}
        >
          {translate('ra.action.back')}
        </Button>
        {buttons}
      </div>
    </div>
  )
}

export const NotFoundErrorPage = () => {
  return <ErrorPage title="404 Not Found"/>
}

export const AccessDeniedErrorPage = () => {
  const session = useSession()
  const router = useRouter()
  return (
    <ErrorPage
      title="403 Access Denied"
      buttons={!session && (
        <Button
          variant="contained"
          href={`/api/auth/google?${new URLSearchParams({ redirect: router.asPath })}`}
          startIcon={<GoogleIcon/>}
          color="primary"
        >
          Log in
        </Button>
      )}
    />
  )
}
