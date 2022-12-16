import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import getLabels from '../utils/i18n/labels';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const locale = useRouter().locale;
  const labels = getLabels(locale)
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
        <title>FabricCalculation</title>
      </Head>
      <Component {...pageProps} locale={locale} labels={labels} />
    </>
  )
}

export default MyApp