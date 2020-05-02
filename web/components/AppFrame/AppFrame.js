import { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import NoSsr from '@material-ui/core/NoSsr'
import { makeStyles } from '@material-ui/core/styles'
import { useSession } from '../../hooks/session'
import { UserMenuButton } from './UserMenuButton'
import { MainMenu } from './MainMenu'
import { PageRefreshButton } from './PageRefreshButton'
import { useRouter } from 'next/router'
import GoogleIcon from '../GoogleIcon'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export const AppFrame = ({ children }) => {
  const classes = useStyles()
  const session = useSession()
  const router = useRouter()

  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap className={classes.title}>
            mylocalshop
          </Typography>
          <PageRefreshButton/>
          {session
            ? <UserMenuButton/>
            : (
              <Button
                href={`/api/auth/google?${new URLSearchParams({ redirect: router.asPath })}`}
                startIcon={<GoogleIcon/>}
                color="inherit"
              >
                Log in
              </Button>
            )
          }
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="main menu">
        <NoSsr>{/* No ssr for the mobile menu, to avoid duplicate links & bad SEO */null}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <MainMenu/>
            </Drawer>
          </Hidden>
        </NoSsr>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            <div className={classes.toolbar} />
            <MainMenu/>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}
