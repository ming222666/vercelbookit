import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import { AppState } from '../../../store';
import { clearError } from '../../../store/ducks/exceptionError/action';

export function RoomDetails(): JSX.Element {
  const { room, error } = useSelector((state: AppState) => state.roomDetails);
  const exceptionError = useSelector((state: AppState) => state.exceptionError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error.errormsg);
    }
  }, [error]);

  useEffect(() => {
    if (exceptionError) {
      toast.error(exceptionError, {
        onClose: () => {
          dispatch(clearError());
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exceptionError]);

  return (
    <section id="room" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>

      <a href="#" className="ml-2 back-to-search">
        <i className="fa fa-arrow-left"></i> Back to Search
      </a>
      {/* <div className="row">
        {rooms.length === 0 ? (
          <div className="alert alert-danger">
            <b>No Rooms.</b>
          </div>
        ) : (
          rooms.map((room) => <RoomItem key={room._id} room={room} />)
        )}
      </div> */}
      {JSON.stringify(room)}
    </section>
  );
}
