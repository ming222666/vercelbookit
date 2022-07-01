import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Layout from '../../../components/Layout';
import AdminBookings from '../../../components/admin/bookings/AdminBookings';

const AdminBookingsPage: NextPage = () => {
  return (
    <Layout title="All Bookings">
      <AdminBookings />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=/admin/bookings',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AdminBookingsPage;
