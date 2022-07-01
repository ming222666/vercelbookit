import React, { useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MDBDataTable } = require('mdbreact');

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AppState } from '../../../store';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { IRoomDto } from '../../../db/interfaces';
import { AdminRoomsActionType } from '../../../store/ducks/admin/rooms/types';
import { getRooms } from '../../../store/ducks/admin/rooms/action';
import { RoomDeleteActionType } from '../../../store/ducks/admin/roomDelete/types';
import { roomDelete } from '../../../store/ducks/admin/roomDelete/action';
import Loader from '../../../components/Layout/Loader';

interface IRow {
  id: string | undefined;
  name: string;
  price: string;
  category: string;
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

export default function AdminRooms(): JSX.Element {
  const isSettled = useRef(false);
  const rooms = useRef<IRoomDto[]>([]);

  const router = useRouter();

  const { sort } = router.query;

  const { loading, rooms: roomsFromState, error, success } = useSelector((state: AppState) => state.admin.rooms);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state: AppState) => state.admin.roomDelete);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRooms(sort ? 'yes' : ''));

    return (): void => {
      dispatch({ type: RoomDeleteActionType.ROOM_DELETE_RESET });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    if (success) {
      isSettled.current = true;
      rooms.current = roomsFromState;
      dispatch({ type: AdminRoomsActionType.ADMIN_ROOMS_RESET_SUCCESS });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect((): void => {
    if (error) {
      isSettled.current = true;
      dispatch({ type: AdminRoomsActionType.ADMIN_ROOMS_RESET_FAIL });
      toast.error(error.errormsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect((): void => {
    if (deleteSuccess) {
      dispatch({ type: RoomDeleteActionType.ROOM_DELETE_RESET });
      dispatch(getRooms());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSuccess]);

  useEffect((): void => {
    if (deleteError) {
      toast.error(deleteError.errormsg);
      dispatch({ type: RoomDeleteActionType.ROOM_DELETE_RESET_FAIL });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteError]);

  const onGotoEditHandler = (e: React.SyntheticEvent<Element, Event>): void => {
    e.preventDefault();
    if (deleteLoading) {
      return;
    }
    router.push(`/admin/rooms/${e.currentTarget.id}`);
  };

  const deleteRoomHandler = (e: React.SyntheticEvent<Element, Event>): void => {
    // targetId format... 'delete' + room._id
    const targetId = e.currentTarget.id;
    const roomId = targetId.substring(6);
    dispatch(roomDelete(roomId));
  };

  const memoizedDataForTable = useMemo((): IData => {
    const data: IData = {
      columns: [
        {
          label: 'Room ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price / Night',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'category',
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

    rooms &&
      rooms.current.length > 0 &&
      rooms.current.forEach((room) => {
        data.rows.push({
          id: room._id,
          name: room.name,
          price: '$' + room.pricePerNight,
          category: room.category,
          actions: (
            <>
              <a
                className="btn btn-primary"
                style={{ opacity: deleteLoading ? 0.5 : 1 }}
                href={`/admin/rooms/${room._id}`}
                id={room._id}
                onClick={onGotoEditHandler}
              >
                <i className="fa fa-pencil"></i>
              </a>

              <button
                className="btn btn-danger mx-2"
                disabled={deleteLoading}
                id={'delete' + room._id}
                onClick={deleteRoomHandler}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms.current]);

  return (
    <>
      <div className="container container-fluid">
        <h1 className="my-5">
          {`${rooms && rooms.current.length} Rooms`}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            className="mt-0 btn text-white float-right new-room-btn"
            style={{ opacity: deleteLoading ? 0.5 : 1 }}
            href="/admin/room/new"
            onClick={(e): void => {
              e.preventDefault();
              if (deleteLoading) {
                return;
              }
              router.push('/admin/room/new');
            }}
          >
            Create Room
          </a>
        </h1>

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
