import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <Script id="google-analytics" strategy="beforeInteractive">
          {`
          console.log("beforeInteractive 제일 먼저 실행")
        `}
        </Script> */}
      </Head>
      <body>
        <div id="portal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
