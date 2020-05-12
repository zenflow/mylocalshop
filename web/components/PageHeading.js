import { TopToolbar } from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import MuiLink from '@material-ui/core/Link'
import { LinkElement } from './links'
import { DocumentTitle } from './DocumentTitle'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
  },
}))

export function PageHeading ({ title, crumbs, children }) {
  crumbs = crumbs ? (Array.isArray(crumbs) ? crumbs : [crumbs]) : []
  const isHome = title === 'Home'
  if (!isHome) {
    crumbs.unshift({ title: 'Home', path: '/' })
  }
  const classes = useStyles()
  return (
    <TopToolbar className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <DocumentTitle>{title}</DocumentTitle>
        {crumbs.map(({ title, path }) => (
          <LinkElement key={path} element={MuiLink} href={path} color="inherit">
            {title}
          </LinkElement>
        ))}
        <Typography variant="h6" color="textPrimary">{title}</Typography>
      </Breadcrumbs>
      <span>{children}</span>
    </TopToolbar>
  )
}
