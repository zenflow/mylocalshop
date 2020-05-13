import Head from 'next/head'

export const DocumentTitle = ({ title }) => {
  return (
    <Head>
      <title>{title} | mylocalstore</title>
    </Head>
  )
}
