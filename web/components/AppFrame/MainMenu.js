import { useRouter } from 'next/router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import CloudCircleIcon from '@material-ui/icons/CloudCircle'
import HelpIcon from '@material-ui/icons/Help'
import { SimpleLink } from '../links'
import { useAuth } from '../../lib/auth/auth-context'

const MyListItem = ({ href, label, icon, selected }) => {
  const router = useRouter()
  const currentPath = router.asPath.split('#')[0].split('?')[0]
  selected = typeof selected === 'function' ? selected(currentPath, href) : selected
  return (
    <SimpleLink href={href}>
      <ListItem button component="a" href={href} selected={selected}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label}/>
      </ListItem>
    </SimpleLink>
  )
}

const isPathEqual = (path, href) => path === href
const isPathInside = (path, href) => path === href || path.startsWith(`${href}/`)

export const MainMenu = () => {
  const { isUserAdmin } = useAuth()
  return (
    <List>
      <MyListItem
        href="/"
        label="Home"
        icon={<HomeIcon/>}
        selected={isPathEqual}
      />
      <MyListItem
        href="/another-public-page"
        label="Another Public Page"
        icon={<HelpIcon/>}
        selected={isPathEqual}
      />
      {isUserAdmin && (
        <MyListItem
          href="/admin/users"
          label="Users"
          icon={<PeopleIcon/>}
          selected={isPathInside}
        />
      )}
      {isUserAdmin && (
        <MyListItem
          href="/admin/sessions"
          label="Sessions"
          icon={<CloudCircleIcon/>}
          selected={isPathInside}
        />
      )}
    </List>
  )
}
