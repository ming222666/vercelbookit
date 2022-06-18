import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';

import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import Layout from '../../../components/Layout';
import { RoomDetails } from '../../../components/Home/room';
import { IRoomDto, IErrorDto } from '../../../db/interfaces';
import { getError } from '../../../utils/getAxiosError';

export interface Props {
  room: IRoomDto | null;
  error: IErrorDto | null;
}

const RoomDetailsPage: NextPage<Props> = (props) => {
  return (
    <Layout>
      <RoomDetails {...props} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);

  const roomId = ctx.params?.id;

  try {
    const { data } = await axios.get<IRoomDto>(`${origin}/api/rooms/${roomId}`);

    return {
      props: {
        room: data,
        error: null,
      },
    };
  } catch (error) {
    const err = getError(error);

    return {
      props: {
        room: null,
        error: err,
      },
    };
  }
};

export default RoomDetailsPage;
