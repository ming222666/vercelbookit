import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Layout from '../../../../components/Layout';
import UserUpdate from '../../../../components/admin/users/UserUpdate';

const UserUpdatePage: NextPage = () => {
  return (
    <Layout title="Update User">
      <UserUpdate />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=/admin/users/${context.params?.id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default UserUpdatePage;
