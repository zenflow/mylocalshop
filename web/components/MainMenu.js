import { useRouter } from 'next/router'
import Link from 'next/link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import CloudCircleIcon from '@material-ui/icons/CloudCircle'

export const MainMenu = () => {
  const router = useRouter()
  return (
    <>
      <List>
        <Link href="/">
          <ListItem button selected={router.asPath === '/'} component="a" href="/">
            <ListItemIcon children={<HomeIcon/>}/>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/admin/[...args]" as="/admin/users">
          <ListItem button component="a" href="/admin/users">
            <ListItemIcon children={<PeopleIcon/>}/>
            <ListItemText primary="Users"/>
          </ListItem>
        </Link>
        <Link href="/admin/[...args]" as="/admin/sessions">
          <ListItem button component="a" href="/admin/sessions">
            <ListItemIcon children={<CloudCircleIcon/>}/>
            <ListItemText primary="Sessions"/>
          </ListItem>
        </Link>
      </List>
    </>
  )
}
