import Button from '@material-ui/core/Button'
import GoogleIcon from './GoogleIcon'

export const LogInButton = props => {
  return (
    <Button
      onClick={openLoginPopup}
      startIcon={<GoogleIcon/>}
      {...props}
    >
      Log in
    </Button>
  )
}

async function openLoginPopup () {
  const url = '/api/auth/google'
  const width = screen.availWidth * 0.8
  const height = screen.availHeight * 0.8
  const left = (screen.width / 2) - (width / 2)
  const top = (screen.height / 2) - (height / 2)
  const windowFeatures = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
  window.open(url, undefined, windowFeatures)
}
