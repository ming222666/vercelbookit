import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Layout from '../../../../components/Layout';
import RoomUpdate from '../../../../components/admin/rooms/RoomUpdate';

const RoomUpdatePage: NextPage = () => {
  return (
    <Layout title="All Rooms">
      <RoomUpdate />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=/admin/rooms/${context.params?.id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RoomUpdatePage;
