import { PageHeading } from '../components/PageHeading'

export default function AnotherPublicPage () {
  return (
    <>
      <PageHeading title="Another public page"/>
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
