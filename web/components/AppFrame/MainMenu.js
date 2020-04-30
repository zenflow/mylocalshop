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

export const MainMenu = () => {
  const { asPath } = useRouter()

  const items = [
    { href: '/', label: 'Home', icon: <HomeIcon/> },
    { href: '/admin/users', label: 'Users', icon: <PeopleIcon/> },
    { href: '/admin/sessions', label: 'Sessions', icon: <CloudCircleIcon/> },
  ]

  return (
    <List>{
      items.map(({href, label, icon}) => {
        const selected = asPath === href || asPath.startsWith(`${href}/`)
        return (
          <SimpleLink href={href}>
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
