import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import MuiLink from '@material-ui/core/Link'
import { LinkElement } from './links'

const useStyles = makeStyles(theme => ({
  leadingMargin: {
    marginTop: '24px',
  },
}))

export function BreadcrumbTitle ({ title, crumbs, skipLeadingMargin }) {
  crumbs = crumbs ? (Array.isArray(crumbs) ? crumbs : [crumbs]) : []
  const classes = useStyles()
  const isHome = title === 'Home'
  if (!isHome) {
    crumbs.unshift({ title: 'Home', path: '/' })
  }
  return (
    <Breadcrumbs aria-label="breadcrumb" className={!skipLeadingMargin && classes.leadingMargin}>
      {crumbs.map(({ title, path }) => (
        <LinkElement key={path} element={MuiLink} href={path} color="inherit">
          {title}
        </LinkElement>
      ))}
      <Typography variant="h6" color="textPrimary">{title}</Typography>
    </Breadcrumbs>
  )
}
