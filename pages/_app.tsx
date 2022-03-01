import '../styles/globals.css';
import type { AppProps } from 'next/app';
import recoil from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <recoil.RecoilRoot>
      <Component {...pageProps} />
    </recoil.RecoilRoot>
  );
}

export default MyApp;
