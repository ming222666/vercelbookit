import React from 'react';
import type { NextPage } from 'next';
import { ThunkDispatch } from 'redux-thunk';

import Layout from '../../../components/Layout';
import { RoomDetails } from '../../../components/Home/room';
import { wrapper } from '../../../store';
import { getRoom } from '../../../store/ducks/roomDetails/action';
import { RoomDetailsAction } from '../../../store/ducks/roomDetails/types';
import { RoomDetailsState } from '../../../store/ducks/roomDetails/models/RoomDetailsState';

const RoomDetailsPage: NextPage = () => {
  return (
    <Layout>
      <RoomDetails />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (
      ctx,
    ): Promise<{
      props: object;
    }> => {
      await (store.dispatch as ThunkDispatch<RoomDetailsState, undefined, RoomDetailsAction>)(
        getRoom(ctx.req, ctx.params?.id as string),
      );

      return {
        props: {},
      };
    },
);

export default RoomDetailsPage;
