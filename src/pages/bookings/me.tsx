import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Layout from '../../components/Layout';
import MyBookings from '../../components/booking/MyBookings';

const MyBookingsPage: NextPage = () => {
  return (
    <Layout title="My Bookings">
      <MyBookings />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=/bookings/me',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default MyBookingsPage;
