import { graphql } from '@gqless/react'
import { useGqless } from '../lib/gqless'
import Suspense from '../lib/SsrCompatibleSuspense'

const ArrayTable = graphql(({array, fields}) => {
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
      <style jsx>{`table { width: 100%; }`}</style>
    </table>
  )
})

const PrivatePage = () => {
  const {query} = useGqless()
  return (
    <div>
      <h1>Users</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ArrayTable
          array={query.users}
          fields={'id createdAt updatedAt email firstName lastName'.split(' ')}
        />
      </Suspense>
    </div>
  )
}

PrivatePage.getInitialProps = ({ session, redirect, asPath }) => {
  if (!session) {
    redirect(['/login', {redirect: asPath}], 'replace')
  }
  return {}
}

export default PrivatePage
