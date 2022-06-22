import React from 'react';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { ThunkDispatch } from 'redux-thunk';

import Layout from '../../components/Layout';
import MyBookings from '../../components/booking/MyBookings';
import { wrapper } from '../../store';
import { myBookings } from '../../store/ducks/bookings/myBookings/action';
import { MyBookingsAction } from '../../store/ducks/bookings/myBookings/types';
import { MyBookingsState } from '../../store/ducks/bookings/myBookings/models/MyBookingsState';

const MyBookingsPage: NextPage = () => {
  return (
    <Layout title="My Bookings">
      <MyBookings />
    </Layout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx): Promise<any> => {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=/bookings/me',
        permanent: false,
      },
    };
  }

  await (store.dispatch as ThunkDispatch<MyBookingsState, undefined, MyBookingsAction>)(
    myBookings(ctx.req.headers.cookie, ctx.req),
  );
});

export default MyBookingsPage;
