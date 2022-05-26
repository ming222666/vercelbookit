import React from 'react';
import type { NextPage } from 'next';

import Layout from '../components/Layout';
import Home from '../components/Home';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;
