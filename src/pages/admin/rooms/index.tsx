import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Layout from '../../../components/Layout';
import AdminRooms from '../../../components/admin/rooms/AdminRooms';

const AdminRoomsPage: NextPage = () => {
  return (
    <Layout title="All Rooms">
      <AdminRooms />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=/admin/rooms',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AdminRoomsPage;
