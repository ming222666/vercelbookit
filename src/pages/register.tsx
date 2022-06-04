import React from 'react';
import type { NextPage } from 'next';

import Layout from '../components/Layout';
import Register from '../components/auth/Register';

const RegisterPage: NextPage = () => {
  return (
    <Layout title="Register">
      <Register />
    </Layout>
  );
};

export default RegisterPage;
