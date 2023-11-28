import { Html, Head, Main, NextScript } from 'next/document'
import {appConfig} from '~/src/config'

const Favicon = () => (
  <>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href={`${appConfig.baseUrl}/apple-touch-icon.png`}
    />
    <link
      rel="icon"
      href={`${appConfig.baseUrl}/favicon.ico`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={`${appConfig.baseUrl}/favicon-32x32.png`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={`${appConfig.baseUrl}/favicon-16x16.png`}
    />
  </>
)

const Vendors = () => (
  <>
    <link
      rel="stylesheet"
      type="text/css"
      charSet="UTF-8"
      href={`${appConfig.baseUrl}/npm/slick-carousel@1.8.1/slick/slick.min.css`}
    />
    <link
      rel="stylesheet"
      type="text/css"
      href={`${appConfig.baseUrl}/npm/slick-carousel@1.8.1/slick/slick-theme.min.css`}
    />
  </>
)

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Favicon />
        <Vendors />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
