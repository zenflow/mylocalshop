import Head from 'next/head'

export const DocumentTitle = ({ children }) => {
  return (
    <Head>
      <title>{children} | mylocalstore</title>
    </Head>
  )
}
