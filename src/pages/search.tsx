import React from 'react';
import type { NextPage } from 'next';

import Layout from '../components/Layout';
import Search from '../components/Search';

const SearchPage: NextPage = () => {
  return (
    <Layout title="Search Rooms">
      <Search />
    </Layout>
  );
};

export default SearchPage;
