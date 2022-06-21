import React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import Layout from '../components/Layout';
import Register from '../components/auth/Register';

const RegisterPage: NextPage = () => {
  return (
    <Layout title="Register">
      <Register />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(RegisterPage), { ssr: false });
