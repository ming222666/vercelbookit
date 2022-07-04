import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Layout from '../../../components/Layout';
import AllReviews from '../../../components/admin/reviews/AllReviews';

const AllReviewsPage: NextPage = () => {
  return (
    <Layout title="All Reviews">
      <AllReviews />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=/admin/reviews',
        permanent: false,
      },
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((session.user as any).role !== 'admin') {
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

export default AllReviewsPage;
