import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { TopToolbar } from 'react-admin'
import { useReactAdminTitle } from '../lib/useReactAdminTitle'
import { BreadcrumbTitle } from '../../components/BreadcrumbTitle'
import { DocumentTitle } from '../../components/DocumentTitle'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
  },
}))

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`

export function BaseActionsToolbar ({ resource, hasList, children }) {
  const classes = useStyles()
  const title = useReactAdminTitle()
  const router = useRouter()
  const currentPath = router.asPath.split('#')[0].split('?')[0]
  const resourceBasePath = `/admin/${resource}`
  const crumbs = hasList && (currentPath !== resourceBasePath) &&
    { title: capitalize(resource), path: resourceBasePath }
  return (
    <TopToolbar className={classes.root}>
      <DocumentTitle title={title}/>
      <BreadcrumbTitle title={title} crumbs={crumbs} skipLeadingMargin/>
      <span>{children}</span>
    </TopToolbar>
  )
}
