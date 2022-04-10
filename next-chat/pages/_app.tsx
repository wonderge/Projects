import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head><title>Next-Chat</title></Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
