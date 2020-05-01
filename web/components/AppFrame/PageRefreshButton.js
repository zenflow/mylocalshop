import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import RefreshIcon from '@material-ui/icons/Refresh'
import { useRouter } from 'next/router'

export const PageRefreshButton = () => {
  const router = useRouter()
  const refreshPage = () => {
    router.replace(router.route, router.asPath)
  }
  return (
    <Tooltip title="Refresh">
      <IconButton
        aria-label="refresh page"
        onClick={refreshPage}
        color="inherit"
      >
        <RefreshIcon />
      </IconButton>
    </Tooltip>
  )
}
