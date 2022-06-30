import React, { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MDBDataTable } = require('mdbreact');

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AppState } from '../../../store';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { IRoomDto } from '../../../db/interfaces';
import { AdminRoomsActionType } from '../../../store/ducks/admin/rooms/types';
import { getRooms } from '../../../store/ducks/admin/rooms/action';
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

  const { loading, rooms: roomsFromState, error, success } = useSelector((state: AppState) => state.admin.rooms);
  // const { error: deleteError, isDeleted } = useSelector(state => state.room)

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRooms());
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
              <Link href={`/admin/rooms/${room._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>

              <button
                className="btn btn-danger mx-2"
                onClick={(): void => {
                  deleteRoom(room._id ? room._id : '');
                }}
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

  const deleteRoom = (roomId: string): void => {
    /* dispatch(deleteRoom(id)) */
  };

  return (
    <>
      <div className="container container-fluid">
        <h1 className="my-5">
          {`${rooms && rooms.current.length} Rooms`}

          <Link href="/admin/room/new">
            <a className="mt-0 btn text-white float-right new-room-btn">Create Room</a>
          </Link>
        </h1>

        {loading || !isSettled.current ? <Loader /> : <MemoizedMDBDataTable data={memoizedDataForTable} />}
      </div>
    </>
  );
}
