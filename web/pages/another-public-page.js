import { BreadcrumbTitle } from '../components/BreadcrumbTitle'
import { DocumentTitle } from '../components/DocumentTitle'

const title = 'Another public page'

export default function AnotherPublicPage () {
  return (
    <>
      <DocumentTitle title={title}/>
      <BreadcrumbTitle title={title}/>
      {Array.from({ length: 50 }).map((_, index) => (
        <p key={index}>
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index}>Lorem ipsum lorem ipsum.</span>
          ))}
        </p>
      ))}
    </>
  )
}
