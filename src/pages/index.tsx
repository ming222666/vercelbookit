import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';

import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import Layout from '../components/Layout';
import Home from '../components/Home';
import { IRoomDto, IAllRoomsDto, IErrorDto } from '../db/interfaces';
import { getError } from '../utils/getAxiosError';

export interface Props {
  rooms: IRoomDto[];
  resPerPage: number;
  roomsCount: number;
  filteredRoomsCount: number;
  error: IErrorDto | null;
}

const HomePage: NextPage<Props> = (props) => {
  return (
    <Layout>
      <Home {...props} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);

  const page = ctx.query['page'] || '1';
  const location = ctx.query['location'] || '';
  const guests = ctx.query['guests'];
  const category = ctx.query['category'];

  let link = `${origin}/api/rooms?page=${page}&location=${location}`;

  if (guests) link = link.concat(`&guestCapacity=${guests}`);
  if (category) link = link.concat(`&category=${category}`);

  try {
    const { data } = await axios.get<IAllRoomsDto>(link);

    return {
      props: {
        rooms: data.rooms,
        resPerPage: data.resPerPage,
        roomsCount: data.roomsCount,
        filteredRoomsCount: data.filteredRoomsCount,
        error: null,
      },
    };
  } catch (error) {
    const err = getError(error);

    return {
      props: {
        rooms: [],
        resPerPage: 1,
        roomsCount: 0,
        filteredRoomsCount: 0,
        error: err,
      },
    };
  }
};

export default HomePage;
