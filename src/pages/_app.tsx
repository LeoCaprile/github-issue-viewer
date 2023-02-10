import '@styles/globals.css';
import '@styles/markdown.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Github Issue Viewer</title>
        <meta name="Github Issue Viewer" content="Created by Matias Fuentes <3" />
        <link rel="icon" href="../images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
}
