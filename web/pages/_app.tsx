import Axios from 'axios';
import '../styles/globals.css'
import type { AppProps } from 'next/app'


Axios.defaults.baseURL = 'http://127.0.0.1:8000'
// Axios.defaults.headers.common['Authorization'] = '';
Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
