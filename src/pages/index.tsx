import React from 'react';
import type { NextPage } from 'next';
import { ThunkDispatch } from 'redux-thunk';

import Layout from '../components/Layout';
import Home from '../components/Home';
import { wrapper } from '../store';
import { getRooms } from '../store/ducks/allRooms/action';
import { AllRoomsAction } from '../store/ducks/allRooms/types';
import { AllRoomsState } from '../store/ducks/allRooms/models/AllRoomsState';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Home />
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
      // https://stackoverflow.com/questions/64857870/how-to-dispatch-thunkaction-with-redux-thunk-and-typescript
      /* await store.dispatch(getRooms(ctx.req)); */
      await (store.dispatch as ThunkDispatch<AllRoomsState, undefined, AllRoomsAction>)(
        getRooms(
          ctx.req,
          ctx.query['page'] as string,
          ctx.query['location'] as string,
          ctx.query['guests'] as string,
          ctx.query['category'] as string,
        ),
      );

      return {
        props: {},
      };
    },
);

export default HomePage;
