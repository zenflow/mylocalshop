import { useState, useEffect } from 'react'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) => ({
  progressBar: {
    width: '100%',
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 2,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export function ProgressBar () {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const changeHandler = () => setLoading(true)
    const errorHandler = () => setLoading(false)
    const completeHandler = () => setLoading(false)
    Router.events.on('routeChangeStart', changeHandler)
    Router.events.on('routeChangeError', errorHandler)
    Router.events.on('routeChangeComplete', completeHandler)
    return () => {
      Router.events.off('routeChangeStart', changeHandler)
      Router.events.off('routeChangeError', errorHandler)
      Router.events.off('routeChangeComplete', completeHandler)
    }
  }, [])
  const classes = useStyles()
  return (
    <div className={classes.progressBar}>
      {loading && <LinearProgress/>}
    </div>
  )
}
