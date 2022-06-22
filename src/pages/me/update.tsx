import React from 'react';
import type { NextPage /* , GetServerSideProps */ } from 'next';
import dynamic from 'next/dynamic';
// import { getSession } from 'next-auth/react';

import Layout from '../../components/Layout';
import Update from '../../components/me/Update';

const UpdateProfilePage: NextPage = () => {
  return (
    <Layout title="Update Profile">
      <Update />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(UpdateProfilePage), { ssr: false });
