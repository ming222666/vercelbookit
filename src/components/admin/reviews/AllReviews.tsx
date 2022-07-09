import React, { useEffect, useRef, useMemo, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MDBDataTable } = require('mdbreact');
import moment from 'moment';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AppState } from '../../../store';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { ReviewInfo } from '../../../store/ducks/admin/reviews/models/ReviewInfo';
import { ReviewsActionType } from '../../../store/ducks/admin/reviews/types';
import { getReviews } from '../../../store/ducks/admin/reviews/action';
import { ReviewDeleteActionType } from '../../../store/ducks/admin/reviewDelete/types';
import { reviewDelete } from '../../../store/ducks/admin/reviewDelete/action';
import Loader from '../../../components/Layout/Loader';
import ButtonLoader from '../../../components/Layout/ButtonLoader';

interface IRow {
  id: string | undefined;
  rating: number;
  comment: string;
  name: string;
  updatedAt: string;
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

export default function AllReviews(): JSX.Element {
  const isSettled = useRef(false);
  const reviews = useRef<ReviewInfo[]>([]);

  const {
    loading,
    reviews: reviewsFromState,
    error,
    success,
    roomId: roomIdFromState,
  } = useSelector((state: AppState) => state.admin.reviews);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state: AppState) => state.admin.reviewDelete);

  const dispatch = useAppDispatch();

  const roomInputValueRef = useRef('');
  const roomIdLabel = useRef('');
  const [roomValueToSubmit, setRoomValueToSubmit] = useState('');

  useEffect(() => {
    return (): void => {
      dispatch({ type: ReviewDeleteActionType.REVIEW_DELETE_RESET });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (roomValueToSubmit) dispatch(getReviews(roomValueToSubmit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomValueToSubmit]);

  useEffect((): void => {
    if (success) {
      isSettled.current = true;
      reviews.current = reviewsFromState;
      roomIdLabel.current = roomIdFromState;
      dispatch({ type: ReviewsActionType.REVIEWS_RESET_SUCCESS });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect((): void => {
    if (error) {
      isSettled.current = true;
      dispatch({ type: ReviewsActionType.REVIEWS_RESET_FAIL });
      toast.error(error.errormsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect((): void => {
    if (deleteSuccess) {
      dispatch({ type: ReviewDeleteActionType.REVIEW_DELETE_RESET });
      dispatch(getReviews(roomIdLabel.current.trim()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSuccess]);

  useEffect((): void => {
    if (deleteError) {
      toast.error(deleteError.errormsg);
      dispatch({ type: ReviewDeleteActionType.REVIEW_DELETE_RESET_FAIL });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteError]);

  const deleteReviewHandler = (e: React.SyntheticEvent<Element, Event>): void => {
    // targetId format... 'delete' + review._id
    const targetId = e.currentTarget.id;
    const reviewId = targetId.substring(6);
    dispatch(reviewDelete(roomIdLabel.current.trim(), reviewId));
  };

  const memoizedDataForTable = useMemo((): IData => {
    const data: IData = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Updated (YYYY-MM-DD HH:mm)',
          field: 'updatedAt',
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

    reviews.current &&
      reviews.current.length > 0 &&
      reviews.current.forEach((review) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          name: review.name,
          updatedAt: moment(review.updatedAt).local().format('YYYY-MM-DD HH:mm'),
          actions: (
            <button
              className="btn btn-danger mx-2"
              disabled={deleteLoading}
              id={'delete' + review._id}
              onClick={deleteReviewHandler}
            >
              <i className="fa fa-trash"></i>
            </button>
          ),
        });
      });

    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews.current]);

  return (
    <>
      <div className="container container-fluid">
        <div className="row justify-content-center mt-5">
          <div className="col-5">
            <form
              onSubmit={(e): void => {
                e.preventDefault();
                if (roomInputValueRef.current.trim()) setRoomValueToSubmit(roomInputValueRef.current.trim());
              }}
            >
              <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="roomId_field" style={{ marginTop: 0, marginBottom: 0 }}>
                  Enter&nbsp;Room&nbsp;ID&nbsp;
                </label>
                <input
                  type="text"
                  id="roomId_field"
                  className="form-control"
                  disabled={loading || deleteLoading}
                  onChange={(e): void => {
                    roomInputValueRef.current = e.target.value;
                  }}
                />
                <button type="submit" className="btn btn-success ml-1" disabled={loading || deleteLoading}>
                  {loading || deleteLoading ? <ButtonLoader /> : 'Go'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <h1 className="my-5">{`${reviews.current && reviews.current.length} Reviews`}</h1>
        <h2 className="mb-5">Room ID: {roomIdLabel.current.trim()}</h2>

        <MemoizedMDBDataTable data={memoizedDataForTable} />
        {(loading || deleteLoading) && (
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
