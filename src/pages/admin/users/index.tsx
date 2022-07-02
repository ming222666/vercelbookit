import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Layout from '../../../components/Layout';
import AdminUsers from '../../../components/admin/users/AdminUsers';

const AdminUsersPage: NextPage = () => {
  return (
    <Layout title="All Users">
      <AdminUsers />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=/admin/users',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AdminUsersPage;
