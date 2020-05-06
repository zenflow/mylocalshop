export default function AnotherPublicPage () {
  return (
    <>
      <h2>Another public page...</h2>
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
