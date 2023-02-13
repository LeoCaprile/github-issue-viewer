import '@styles/globals.css';
import '@styles/markdown.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import favicon from '@public/favicon.ico';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }: AppProps) {
  const QC = new QueryClient();
  return (
    <>
      <Head>
        <title>Github Issue Viewer</title>
        <meta name="Github Issue Viewer" content="Created by Matias Fuentes <3" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <NextNProgress />
      <QueryClientProvider client={QC}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
