import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axiosSetup from '../utils/setupAxios';

axiosSetup()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
