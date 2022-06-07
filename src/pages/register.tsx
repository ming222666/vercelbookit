import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Layout from '../components/Layout';
import Register from '../components/auth/Register';

const RegisterPage: NextPage = () => {
  return (
    <Layout title="Register">
      <Register />
    </Layout>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
