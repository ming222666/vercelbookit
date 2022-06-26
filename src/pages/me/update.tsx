import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Layout from '../../components/Layout';
import Update from '../../components/me/Update';

const UpdateProfilePage: NextPage = () => {
  return (
    <Layout title="Update Profile">
      <Update />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=/me/update',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default UpdateProfilePage;
