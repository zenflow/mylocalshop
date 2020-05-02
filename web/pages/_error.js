import { ErrorPage } from '../components/errors'

const Error = ({ err }) => {
  return <ErrorPage details={err?.toString()}/>
}

Error.getInitialProps = ({ err }) => ({ err })

export default Error
