import React from 'react';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { ThunkDispatch } from 'redux-thunk';

import Layout from '../../../components/Layout';
import BookingDetails from '../../../components/booking/BookingDetails';
import { wrapper } from '../../../store';
import { bookingDetails } from '../../../store/ducks/bookings/bookingDetails/action';
import { BookingDetailsAction } from '../../../store/ducks/bookings/bookingDetails/types';
import { BookingDetailsState } from '../../../store/ducks/bookings/bookingDetails/models/BookingDetailsState';

const BookingDetailsPage: NextPage = () => {
  return (
    <Layout title="Booking Details">
      <BookingDetails />
    </Layout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx): Promise<any> => {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=/bookings/${ctx.params?.id}`,
        permanent: false,
      },
    };
  }

  await (store.dispatch as ThunkDispatch<BookingDetailsState, undefined, BookingDetailsAction>)(
    bookingDetails(ctx.req.headers.cookie, ctx.req, ctx.params?.id as string),
  );
});

export default BookingDetailsPage;
