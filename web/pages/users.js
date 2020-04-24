import { graphql } from '@gqless/react'
import { Container, Header, Loader } from 'semantic-ui-react'
import { useGqless } from '../lib/gqless'
import Suspense from '../components/SsrCompatibleSuspense'

const ArrayTable = graphql(({ array, fields }) => {
  return (
    <table>
      <thead>
        <tr>
          {fields.map((field, index) => (
            <th key={index}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {array.map((item, index) => (
          <tr key={index}>
            {fields.map((field, index) => (
              <td key={index}>{item[field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <style jsx>{'table { width: 100%; }'}</style>
    </table>
  )
})

const PrivatePage = () => {
  const { query } = useGqless()
  return (
    <Container>
      <Header as="h1">Users</Header>
      <Suspense fallback={<Loader active/>}>
        <ArrayTable
          array={query.users}
          fields={'id createdAt updatedAt email firstName lastName'.split(' ')}
        />
      </Suspense>
    </Container>
  )
}

PrivatePage.getInitialProps = ({ session, redirect, asPath }) => {
  if (!session) {
    redirect(['/login', { redirect: asPath }], 'replace')
  }
  return {}
}

export default PrivatePage
