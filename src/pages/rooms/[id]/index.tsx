import React from 'react';
import type { NextPage } from 'next';
import { ThunkDispatch } from 'redux-thunk';

import Layout from '../../../components/Layout';
import { RoomDetails } from '../../../components/Home/room';
import { wrapper } from '../../../store';
import { getRoom } from '../../../store/ducks/roomDetails/action';
import { RoomDetailsAction } from '../../../store/ducks/roomDetails/types';
import { RoomDetailsState } from '../../../store/ducks/roomDetails/models/RoomDetailsState';
import { ExceptionErrorActionType } from '../../../store/ducks/exceptionError/types';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const x = await (store.dispatch as ThunkDispatch<RoomDetailsState, undefined, RoomDetailsAction>)(
        getRoom(ctx.req, ctx.params?.id as string),
      );

      // eslint-disable-next-line no-console
      console.log('x', x);
      if (x instanceof Error) {
        store.dispatch({
          type: ExceptionErrorActionType.SET_ERROR,
          payload: x.message,
        });
      }

      return {
        props: {},
      };
    },
);

export default RoomDetailsPage;
