import React from 'react';
import type { NextPage } from 'next';

import Layout from '../components/Layout';
import NotFound from '../components/Layout/NotFound';

const NotFoundPage: NextPage = () => {
  return (
    <Layout title="Page Not Found">
      <NotFound />
    </Layout>
  );
};

export default NotFoundPage;
