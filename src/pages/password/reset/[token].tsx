import React from 'react';
import type { NextPage } from 'next';

import Layout from '../../../components/Layout';
import NewPassword from '../../../components/password/NewPassword';

const NewPasswordPage: NextPage = () => {
  return (
    <Layout title="New Password">
      <NewPassword />
    </Layout>
  );
};

export default NewPasswordPage;
