import { useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { LinkElement } from '../links'
import { logOut, useAuth } from '../../lib/auth/auth-context'

export const UserMenuButton = () => {
  const { isLoggedIn, userId } = useAuth()
  if (!isLoggedIn) {
    return null
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)
  const closeMenu = () => setAnchorEl(null)

  return (
    <>
      <Tooltip title="User Account">
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={closeMenu}
      >
        <LinkElement
          element={MenuItem}
          component="a"
          href={`/admin/users/${userId}`}
          onClick={closeMenu}
        >
          <ListItemIcon>
            <AccountBoxIcon fontSize="small"/>
          </ListItemIcon>
          <Typography variant="inherit">
            My Profile
          </Typography>
        </LinkElement>
        <MenuItem
          onClick={() => {
            logOut()
            closeMenu()
          }}
        >
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small"/>
          </ListItemIcon>
          <Typography variant="inherit">
            Log out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
