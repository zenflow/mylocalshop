import { ErrorPage } from '../components/errors'

const Error = ({ err }) => {
  return <ErrorPage details={err}/>
}

Error.getInitialProps = ({ err }) => ({ err: JSON.stringify(err) })

export default Error
