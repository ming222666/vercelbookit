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

import useAppDispatch from '../../../hooks/useAppDispatch';
import { AppState } from '../../../store';
import { getBookedDates } from '../../../store/ducks/bookings/bookedDates/action';
import { getRoomBookingAvailability } from '../../../store/ducks/bookings/roomBookingAvailability/action';
import { RoomFeatures } from './RoomFeatures';
import { NewReview } from '../../review/NewReview';
import getStripe from '../../../utils/getStripe';
import { getError } from '../../../utils/getAxiosError';
import { Props } from '../../../pages/rooms/[id]/index';

export function RoomDetails({ room, error }: Props): JSX.Element {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [daysOfStay, setDaysOfStay] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { dates: bookedDates, error: bookedDatesError } = useSelector((state: AppState) => state.bookings.bookedDates);
  const { user } = useSelector((state: AppState) => state.auth);
  const { isAvailable, loading: roomBookingAvailabilityLoading } = useSelector(
    (state: AppState) => state.bookings.roomBookingAvailability,
  );

  const roomId = router.query.id as string;

  const excludedDates: Date[] = [];
  bookedDates.forEach((date) => {
    excludedDates.push(new Date(date));
  });

  const onChange = (dates: [Date | null, Date | null]): void => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      // Calclate days of stay

      const days = Math.floor((checkOutDate.getTime() - checkInDate.getTime()) / 86400000 + 1);

      setDaysOfStay(days);

      dispatch(getRoomBookingAvailability(roomId, checkInDate.getTime(), checkOutDate.getTime()));
    }
  };

  useEffect((): void => {
    if (error) {
      toast.error(error.errormsg);
    }
  }, [error]);

  useEffect((): void => {
    if (bookedDatesError) {
      toast.error(bookedDatesError.errormsg);
    }
  }, [bookedDatesError]);

  useEffect(() => {
    /**
     * Seems that a little timeout delay is needed.
     * Without timeout, the api of below getBookedDates() action'll fail due to mongo db connection unavailable issue --- (1)
     * This, after experiment seems to suggest, is due to Header component also making a db connection call.
     * Close proximity of the 2 db calls seems to be the cause of issue mentioned at line (1) above.
     */
    if (roomId) {
      const t = setTimeout(() => {
        dispatch(getBookedDates(roomId));
        clearTimeout(t);
      }, 500);
    }
  }, [dispatch, roomId]);

  /**
   *
   * newBookingHandler for ref only.
   */
  // const newBookingHandler = async (): Promise<void> => {
  //   // IBookingDto from '../../../db/interfaces'
  //   const bookingData: IBookingDto = {
  //     room: roomId,
  //     user: user && user._id ? user._id : '',
  //     checkInDate: checkInDate && checkInDate.getTime(),
  //     checkOutDate: checkOutDate && checkOutDate.getTime(),
  //     daysOfStay,
  //     amountPaid: 90,
  //     paymentInfo: {
  //       id: 'STRIPE_PAYMENT_ID',
  //       status: 'STRIPE_PAYMENT_STATUS',
  //     },
  //   };
  //
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //
  //     await axios.post<{ status: number; booking: IBookingDto }>('/api/bookings', bookingData, config);
  //   } catch (error) {
  //     const err = getError(error);
  //     toast.error(err.errormsg);
  //   }
  // };

  const bookRoom = async (id: string | undefined, pricePerNight: number | undefined): Promise<void> => {
    setPaymentLoading(true);

    const amount = pricePerNight ? pricePerNight * daysOfStay : 0;

    try {
      const link = `/api/checkout_session/${roomId}?checkInDate=${checkInDate?.getTime()}&checkOutDate=${checkOutDate?.getTime()}&daysOfStay=${daysOfStay}`;

      const { data } = await axios.get(link, { params: { amount } });

      const stripe = await getStripe();

      // Redirect to checkout
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      setPaymentLoading(false);
      const err = getError(error);
      toast.error(err.errormsg);
    }
  };

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
                selected={checkInDate}
                onChange={onChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              />

              {isAvailable === true && (
                <div className="alert alert-success my-3 font-weight-bold">Room is available. Book now.</div>
              )}

              {isAvailable === false && (
                <div className="alert alert-danger my-3 font-weight-bold">Room not available. Try different dates.</div>
              )}

              {isAvailable && !user && (
                <div className="alert alert-danger my-3 font-weight-bold">Login to book room.</div>
              )}

              {isAvailable && user && (
                <>
                  <div className="alert alert-success my-3">
                    Check In Date: <span className="font-weight-bold">{checkInDate?.toString().substring(0, 15)}</span>
                  </div>
                  <div className={'alert my-3 ' + `${checkOutDate ? 'alert-success' : 'alert-danger text-center'}`}>
                    {checkOutDate ? (
                      <>
                        <span>Check Out Date: </span>
                        <span className="font-weight-bold">{checkOutDate.toString().substring(0, 15)}</span>
                      </>
                    ) : (
                      <span className="font-weight-bold" style={{ color: '#ff0000' }}>
                        Please pick Check Out Date!
                      </span>
                    )}
                  </div>
                  <div className="alert alert-success my-3 text-center">
                    Days of Stay: <span className="font-weight-bold">{checkOutDate ? daysOfStay : '?'}</span>
                  </div>
                  <button
                    className="btn btn-block py-3 booking-btn"
                    onClick={(): void => {
                      bookRoom(room?._id, room?.pricePerNight);
                    }}
                    disabled={!checkOutDate || roomBookingAvailabilityLoading || paymentLoading ? true : false}
                  >
                    {daysOfStay && room && `Pay - $${checkOutDate ? daysOfStay * room.pricePerNight : '?'}`}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <NewReview />

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
