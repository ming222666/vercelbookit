import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

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
  let { page = 1 } = router.query;
  page = Number(page);

  const handlePagination = (pageNumber: number): void => {
    router.push(`/?page=${pageNumber}`);
  };

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>

        <a href="#" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
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

      {resPerPage < roomsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={roomsCount}
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
