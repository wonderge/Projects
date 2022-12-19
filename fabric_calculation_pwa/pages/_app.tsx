import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/globals.css';
import { getFromStorage, setToStorage } from '../utils/helpers/storage';
import getLabels from '../utils/i18n/labels';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (getFromStorage('deviceId') === null) {
      setToStorage('deviceId', uuidv4())
    }
  });

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
        <title>FabricCalculation</title>
      </Head>
      <Component {...pageProps} locale={useRouter().locale} labels={getLabels(useRouter().locale)} />
    </>
  )
}

export default MyApp