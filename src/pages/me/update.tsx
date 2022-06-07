import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface Props {
  session: Session;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UpdateProfilePage: NextPage<Props> = ({ session }: Props) => {
  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default UpdateProfilePage;
