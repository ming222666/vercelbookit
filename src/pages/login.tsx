import React from 'react';
import type { NextPage } from 'next';

import Layout from '../components/Layout';
import Login from '../components/auth/Login';

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login">
      <Login />
    </Layout>
  );
};

export default LoginPage;
