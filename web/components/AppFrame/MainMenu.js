import { useRouter } from 'next/router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import CloudCircleIcon from '@material-ui/icons/CloudCircle'
import { SimpleLink } from '../links'
import { useSession } from '../../hooks/session'

const MyListItem = ({ href, label, icon, selected }) => {
  const { asPath } = useRouter()
  selected = typeof selected === 'function' ? selected(asPath, href) : selected
  return (
    <SimpleLink href={href}>
      <ListItem button component="a" href={href} selected={selected}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label}/>
      </ListItem>
    </SimpleLink>
  )
}

const isPathEqual = (asPath, href) => asPath === href
const isPathInside = (asPath, href) => asPath === href || asPath.startsWith(`${href}/`)

export const MainMenu = () => {
  const session = useSession()
  return (
    <List>
      <MyListItem
        href="/"
        label="Home"
        icon={<HomeIcon/>}
        selected={isPathEqual}
      />
      {session?.user.isAdmin && (
        <MyListItem
          href="/admin/users"
          label="Users"
          icon={<PeopleIcon/>}
          selected={isPathInside}
        />
      )}
      {session?.user.isAdmin && (
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
