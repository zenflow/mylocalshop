import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

export const BlockLoader = (props) => (
  <CircularProgress {...props} style={{ display: 'block', margin: '0 auto' }}/>
)

const useStyles = makeStyles(
  theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
    message: {
      textAlign: 'center',
      opacity: 0.5,
    },
  }),
  { name: 'FullPageLoader' },
)

export const FullPageLoader = props => {
  const classes = useStyles(props)
  return (
    <div className={classes.container}>
      <BlockLoader/>
      <h1 className={classes.message}>
        Loading...
      </h1>
    </div>
  )
}
