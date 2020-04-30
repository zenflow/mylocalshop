import { useRouter } from 'next/router'
import Link from 'next/link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import CloudCircleIcon from '@material-ui/icons/CloudCircle'
import { SimpleLink } from '../links'
import { useSession } from '../../lib/auth/react'

export const MainMenu = () => {
  const { asPath } = useRouter()
  const session = useSession()

  const items = [
    { href: '/', label: 'Home', icon: <HomeIcon/> },
    session?.user?.roleId === 'admin' && { href: '/admin/users', label: 'Users', icon: <PeopleIcon/> },
    session?.user?.roleId === 'admin' && { href: '/admin/sessions', label: 'Sessions', icon: <CloudCircleIcon/> },
  ].filter(Boolean)

  return (
    <List>{
      items.map(({href, label, icon}, index) => {
        const selected = asPath === href || asPath.startsWith(`${href}/`)
        return (
          <SimpleLink key={index} href={href}>
            <ListItem button selected={selected} component="a" href={href}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label}/>
            </ListItem>
          </SimpleLink>
        )
      })
    }</List>
  )
}
