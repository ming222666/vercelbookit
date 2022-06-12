import React from 'react';
import type { NextPage } from 'next';

import Layout from '../../components/Layout';
import ForgotPassword from '../../components/password/ForgotPassword';

const ForgotPasswordPage: NextPage = () => {
  return (
    <Layout title="Forgot Password">
      <ForgotPassword />
    </Layout>
  );
};

export default ForgotPasswordPage;
