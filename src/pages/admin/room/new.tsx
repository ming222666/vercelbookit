import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Layout from '../../../components/Layout';
import RoomCreate from '../../../components/admin/rooms/RoomCreate';

const RoomCreatePage: NextPage = () => {
  return (
    <Layout title="New Room">
      <RoomCreate />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=/admin/room/new',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RoomCreatePage;
