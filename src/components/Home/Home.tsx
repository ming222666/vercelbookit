import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/Link';

import Pagination from 'react-js-pagination';

import { AppState } from '../../store';
import { RoomItem } from './room';

import useErrormsgStatusDtoAndExceptionError from '../../hooks/useErrormsgStatusDtoAndExceptionError';

export function Home(): JSX.Element {
  const { rooms, resPerPage, roomsCount, filteredRoomsCount, error } = useSelector((state: AppState) => state.allRooms);
  const exceptionError = useSelector((state: AppState) => state.exceptionError);
  const dispatch = useDispatch();

  useErrormsgStatusDtoAndExceptionError(error, exceptionError, dispatch);

  const router = useRouter();
  // eslint-disable-next-line prefer-const
  let { page = 1, location } = router.query;
  page = Number(page);

  const handlePagination = (pageNumber: number): void => {
    router.push(`/?page=${pageNumber}`);
  };

  let count = roomsCount;
  if (location) {
    count = filteredRoomsCount;
  }

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">{location ? `Rooms in ${location}` : 'All Rooms'}</h2>

        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search{' '}
          </a>
        </Link>
        <div className="row">
          {rooms.length === 0 ? (
            <div className="alert alert-danger">
              <b>No Rooms.</b>
            </div>
          ) : (
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>

      {resPerPage < count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={count}
            onChange={handlePagination}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
}
