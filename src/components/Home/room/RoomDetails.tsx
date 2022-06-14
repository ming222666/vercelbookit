import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Carousel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Moment from 'moment';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import useAppDispatch from '../../../hooks/useAppDispatch';
import { AppState } from '../../../store';
import { IBookingDto } from '../../../db/interfaces';
import { getBookedDates } from '../../../store/ducks/bookings/bookedDates/action';
import { RoomFeatures } from './RoomFeatures';
import { getError } from '../../../utils/getAxiosError';

export function RoomDetails(): JSX.Element {
  const [checkInOutDates, setCheckInOutDates] = useState<[Date | null, Date | null]>([new Date(), null]);

  const [daysOfStay, setDaysOfStay] = useState(0);

  const { room, error } = useSelector((state: AppState) => state.roomDetails);

  const { dates: bookedDates, error: bookedDatesError } = useSelector((state: AppState) => state.bookings.bookedDates);

  const { user } = useSelector((state: AppState) => state.auth);

  let userId = '';
  if (user) userId = user._id ? user._id : '';

  const router = useRouter();

  const roomId = router.query.id as string;

  const dispatch = useAppDispatch();

  const excludedDates: Date[] = [];
  bookedDates.forEach((date) => {
    excludedDates.push(new Date(date));
  });

  const onChange = (dates: [Date | null, Date | null]): void => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInOutDates([checkInDate, checkOutDate]);

    if (checkInDate && checkOutDate) {
      // Calclate days of stay

      const days = Math.floor((checkOutDate.getTime() - checkInDate.getTime()) / 86400000 + 1);

      setDaysOfStay(days);

      // dispatch(checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString()))
    }
  };

  useEffect((): void => {
    if (error) {
      toast.error(error.errormsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect((): void => {
    if (bookedDatesError) {
      toast.error(bookedDatesError.errormsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookedDatesError]);

  useEffect(() => {
    if (roomId) dispatch(getBookedDates(roomId));
  }, [dispatch, roomId]);

  const newBookingHandler = async () => {
    const bookingData: IBookingDto = {
      room: roomId,
      user: userId,
      checkInDate: checkInOutDates[0] && checkInOutDates[0].getTime(),
      checkOutDate: checkInOutDates[1] && checkInOutDates[1].getTime(),
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: 'STRIPE_PAYMENT_ID',
        status: 'STRIPE_PAYMENT_STATUS',
      },
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post<{ status: number; booking: IBookingDto }>('/api/bookings', bookingData, config);

      console.log('yyyyyyyyyyyyyyyyyy', data);
    } catch (error) {
      const err = getError(error);
      toast.error(err.errormsg);
    }
  };

  // const range = moment.range(moment(checkInOutDates[0]), moment(checkInOutDates[1]));

  if (checkInOutDates[1]) {
    const range = moment.range(moment(checkInOutDates[0]), moment(checkInOutDates[1]));
    console.log('range.toString() notnull', range.toString());
    console.log('getTime() notnull', checkInOutDates[0].getTime());

    const dates = Array.from(range.by('day'));
    dates.forEach((element, i) => {
      console.log('element notnull ' + i, element.toString());
    });
  } else {
    const range2 = moment.range(moment(checkInOutDates[0]), moment(checkInOutDates[0]));
    console.log('range2.toString() NULL', range2.toString());
    console.log('getTime() NULL', checkInOutDates[0].getTime());

    const dates = Array.from(range2.by('day'));
    dates.forEach((element, i) => {
      console.log('element NULL ' + i, element.toString());
    });
  }

  // const dates = Array.from(range.by('day'));
  // console.log('arry', dates);
  //////////////////// console.log('range.toString()', range.toString());

  return (
    <>
      <Head>
        <title>{room?.name || 'Room Details'} - BookIT</title>
      </Head>

      <div className="container container-fluid">
        <h2 className="mt-5">{room?.name}</h2>
        <p>{room?.address}</p>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{
                width: room ? `${(room.rating / 5) * 100}%` : undefined,
              }}
            ></div>
          </div>
          <span id="no_of_reviews">({room ? room.numOfReviews : 0} Reviews)</span>
        </div>

        <Carousel>
          {room &&
            room.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <div style={{ width: '100%', height: 440 }}>
                  <Image className="d-block m-auto" src={image.url} alt={room.name} layout="fill" />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room?.description}</p>
            <RoomFeatures room={room} />
          </div>

          <div className="col-12 col-md-6 col-lg-4" style={{ display: room ? 'block' : 'none' }}>
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${room?.pricePerNight}</b> / night
              </p>

              <hr />

              <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>

              <DatePicker
                className="w-100"
                selected={checkInOutDates[0]}
                onChange={onChange}
                startDate={checkInOutDates[0]}
                endDate={checkInOutDates[1]}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              />

              <button className="btn btn-block py-3 booking-btn" onClick={newBookingHandler}>
                Pay
              </button>
            </div>
          </div>
        </div>

        <div className="reviews w-75">
          <h3>Reviews:</h3>
          <hr />
          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>

            <hr />
          </div>

          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>

            <hr />
          </div>
        </div>
      </div>
    </>
  );
}
