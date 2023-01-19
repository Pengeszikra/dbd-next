import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="dark">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="manifest.json"></link>
      </Head>
      <body className=' dark:bg-slate-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}