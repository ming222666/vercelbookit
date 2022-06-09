import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { wrapper } from '../store';
import '../__axiosDefaults';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
