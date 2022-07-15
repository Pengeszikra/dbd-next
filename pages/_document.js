import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="dark">
      <Head>
        <title>non dbd app</title>
      </Head>
      <body className=' dark:bg-slate-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}