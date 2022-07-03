import React, { useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MDBDataTable } = require('mdbreact');

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AppState } from '../../../store';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { UserDetailsInfo } from '../../../store/ducks/admin/userDetails/models/UserDetailsInfo';
import { AdminUsersActionType } from '../../../store/ducks/admin/users/types';
import { getUsers } from '../../../store/ducks/admin/users/action';
import { UserDeleteActionType } from '../../../store/ducks/admin/userDelete/types';
import { userDelete } from '../../../store/ducks/admin/userDelete/action';
import Loader from '../../../components/Layout/Loader';

interface IRow {
  id: string | undefined;
  name: string;
  email: string;
  role: string | undefined;
  actions: JSX.Element;
}

interface IData {
  columns: { label: string; field: string; sort: string }[];
  rows: IRow[];
}

function MDBDataTableWrapper(props: { data: IData }): JSX.Element {
  return <MDBDataTable data={props.data} className="px-3" bordered striped hover small />;
}
export const MemoizedMDBDataTable = React.memo(MDBDataTableWrapper);

export default function AdminUsers(): JSX.Element {
  const isSettled = useRef(false);
  const users = useRef<UserDetailsInfo[]>([]);

  const router = useRouter();

  const { updated } = router.query;

  const { loading, users: usersFromState, error, success } = useSelector((state: AppState) => state.admin.users);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state: AppState) => state.admin.userDelete);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers(updated ? 'yes' : ''));

    return (): void => {
      dispatch({ type: UserDeleteActionType.USER_DELETE_RESET });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    if (success) {
      isSettled.current = true;
      users.current = usersFromState;
      dispatch({ type: AdminUsersActionType.ADMIN_USERS_RESET_SUCCESS });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect((): void => {
    if (error) {
      isSettled.current = true;
      dispatch({ type: AdminUsersActionType.ADMIN_USERS_RESET_FAIL });
      toast.error(error.errormsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect((): void => {
    if (deleteSuccess) {
      dispatch({ type: UserDeleteActionType.USER_DELETE_RESET });
      dispatch(getUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSuccess]);

  useEffect((): void => {
    if (deleteError) {
      toast.error(deleteError.errormsg);
      dispatch({ type: UserDeleteActionType.USER_DELETE_RESET_FAIL });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteError]);

  const onGotoEditHandler = (e: React.SyntheticEvent<Element, Event>): void => {
    e.preventDefault();
    if (deleteLoading) {
      return;
    }
    router.push(`/admin/users/${e.currentTarget.id}`);
  };

  const deleteUserHandler = (e: React.SyntheticEvent<Element, Event>): void => {
    // targetId format... 'delete' + user._id
    const targetId = e.currentTarget.id;
    const userId = targetId.substring(6);
    dispatch(userDelete(userId));
  };

  const memoizedDataForTable = useMemo((): IData => {
    const data: IData = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    users.current &&
      users.current.length > 0 &&
      users.current.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <a
                className="btn btn-primary"
                style={{ opacity: deleteLoading ? 0.5 : 1 }}
                href={`/admin/users/${user._id}`}
                id={user._id}
                onClick={onGotoEditHandler}
              >
                <i className="fa fa-pencil"></i>
              </a>

              <button
                className="btn btn-danger mx-2"
                disabled={deleteLoading}
                id={'delete' + user._id}
                onClick={deleteUserHandler}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.current]);

  return (
    <>
      <div className="container container-fluid">
        <h1 className="my-5">{`${users.current && users.current.length} Users`}</h1>

        {loading || !isSettled.current ? <Loader /> : <MemoizedMDBDataTable data={memoizedDataForTable} />}
        {deleteLoading && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'wait',
            }}
          >
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}
