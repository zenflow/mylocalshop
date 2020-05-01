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
import { useSession } from '../../hooks/session'

export const UserMenuButton = () => {
  const session = useSession()
  if (!session) {
    return null
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const closeMenu = () => setAnchorEl(null)

  return (
    <>
      <Tooltip title="Account">
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
        open={open}
        onClose={closeMenu}
      >
        <LinkElement
          element={MenuItem}
          component="a"
          href={`/admin/users/${session.user.id}`}
          onClick={closeMenu}
        >
          <ListItemIcon>
            <AccountBoxIcon fontSize="small"/>
          </ListItemIcon>
          <Typography variant="inherit">
            Profile
          </Typography>
        </LinkElement>
        <MenuItem
          component="a"
          href="/api/auth/logout"
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
