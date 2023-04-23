import Layout from '@components/layout/Layout'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Script from 'next/script'
import DatabaseService from 'src/util/DatabaseService'

const dbService = DatabaseService.getDBInstance('chatGPT', 1)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      {/* <Script id="google-analytics" strategy="afterInteractive">
        {`
          console.log("afterInteractive 그다음 실행")
        `}
      </Script> */}
      <Component {...pageProps} dbService={dbService} />
    </Layout>
  )
}

// class 로 DB Instance를 만든다.

// 1. DB 생성 메서드 (필요한 것 : indexedDB 이름, 버전정보)
