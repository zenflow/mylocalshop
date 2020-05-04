import { ErrorPage } from '../components/errors'

const Error = ({ err }) => {
  return <ErrorPage details={err}/>
}

Error.getInitialProps = ({ err }) => ({ err: err?.toString() })

export default Error
