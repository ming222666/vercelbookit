import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MDBDataTable } = require('mdbreact');
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AppState } from '../../../store';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { IBookingExtended } from '../../../controllers/interfaces';
import { AdminBookingsActionType } from '../../../store/ducks/admin/bookings/types';
import { adminBookings } from '../../../store/ducks/admin/bookings/action';
import { BookingDeleteActionType } from '../../../store/ducks/admin/bookingDelete/types';
import { bookingDelete } from '../../../store/ducks/admin/bookingDelete/action';
import Loader from '../../../components/Layout/Loader';

interface IRow {
  id: string | undefined;
  checkIn: string;
  checkOut: string;
  amount: string;
  actions: JSX.Element;
}

interface IData {
  columns: { label: string; field: string; sort: string }[];
  rows: IRow[];
}

function MDBDataTableWrapper(props: { data: IData; onPageChange: () => void }): JSX.Element {
  return (
    <MDBDataTable data={props.data} className="px-3" bordered striped hover small onPageChange={props.onPageChange} />
  );
}
export const MemoizedMDBDataTable = React.memo(MDBDataTableWrapper);

export default function AdminBookings(): JSX.Element {
  const isSettled = useRef(false);
  const bookings = useRef<IBookingExtended[]>([]);

  const router = useRouter();

  const {
    loading,
    bookings: bookingsFromState,
    error,
    success,
  } = useSelector((state: AppState) => state.admin.bookings);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state: AppState) => state.admin.bookingDelete);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminBookings());

    return (): void => {
      dispatch({ type: BookingDeleteActionType.BOOKING_DELETE_RESET });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    if (success) {
      isSettled.current = true;
      bookings.current = bookingsFromState;
      dispatch({ type: AdminBookingsActionType.RESET_ADMIN_BOOKINGS_SUCCESS });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect((): void => {
    if (error) {
      isSettled.current = true;
      dispatch({ type: AdminBookingsActionType.RESET_ADMIN_BOOKINGS_FAIL });
      toast.error(error.errormsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect((): void => {
    if (deleteSuccess) {
      dispatch({ type: BookingDeleteActionType.BOOKING_DELETE_RESET });
      dispatch(adminBookings());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSuccess]);

  useEffect((): void => {
    if (deleteError) {
      toast.error(deleteError.errormsg);
      dispatch({ type: BookingDeleteActionType.BOOKING_DELETE_RESET_FAIL });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteError]);

  const onViewBookingHandler = (e: React.SyntheticEvent<Element, Event>): void => {
    e.preventDefault();
    if (deleteLoading) {
      return;
    }
    router.push(`/bookings/${e.currentTarget.id}`);
  };

  const deleteBookingHandler = (e: React.SyntheticEvent<Element, Event>): void => {
    // targetId format... 'delete' + booking._id
    const targetId = e.currentTarget.id;
    const bookingId = targetId.substring(6);
    dispatch(bookingDelete(bookingId));
  };

  const memoizedDataForTable = useMemo((): IData => {
    const data: IData = {
      columns: [
        {
          label: 'Booking ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Check In',
          field: 'checkIn',
          sort: 'asc',
        },
        {
          label: 'Check Out',
          field: 'checkOut',
          sort: 'asc',
        },
        {
          label: 'Amount Paid',
          field: 'amount',
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

    bookings.current &&
      bookings.current.length > 0 &&
      bookings.current.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate ? booking.checkInDate : 0).toLocaleString('en-US'),
          checkOut: new Date(booking.checkOutDate ? booking.checkOutDate : 0).toLocaleString('en-US'),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <a
                className="btn btn-primary"
                style={{ opacity: deleteLoading ? 0.5 : 1 }}
                href={`/bookings/${booking._id}`}
                id={booking._id}
                onClick={onViewBookingHandler}
              >
                <i className="fa fa-eye"></i>
              </a>

              <a
                className="btn btn-success mx-2"
                onClick={(): void => {
                  createInvoice(booking);
                }}
                role="button"
              >
                <i className="fa fa-download"></i>
              </a>

              <button
                className="btn btn-danger mx-2"
                disabled={deleteLoading}
                id={'delete' + booking._id}
                onClick={deleteBookingHandler}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings.current]);

  const memoizedCallback = useCallback(() => {
    setBookingIdToPreviewInvoice('');
  }, []);

  const invoiceDivRef = useRef<HTMLDivElement>(null);
  const invoiceRef = useRef(<></>);
  const [bookingIdToPreviewInvoice, setBookingIdToPreviewInvoice] = useState<string | undefined>('');

  useEffect((): void => {
    if (bookingIdToPreviewInvoice) {
      invoiceDivRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [bookingIdToPreviewInvoice]);

  const createInvoice = (booking: IBookingExtended): void => {
    invoiceRef.current = (
      <PDFViewer style={{ width: window.innerWidth, height: window.innerHeight }}>
        {/* Start of the document*/}
        <Document>
          {/*render a single page*/}
          <Page size="A4" style={{ backgroundColor: '#fff', color: '#000' }}>
            <View style={{ margin: 20, padding: 20, textAlign: 'right' }}>
              <Text style={{ fontSize: 15 }}>Booking INVOICE</Text>
              <Text> </Text>
              <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold' }}>Book IT</Text>
              <Text style={{ fontSize: 10 }}>13th Street. 47 W 13th St</Text>
              <Text style={{ fontSize: 10 }}>10001, New York</Text>
              <Text style={{ fontSize: 10 }}>United States</Text>
              <Text> </Text>
              <Text> </Text>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 2,
                }}
              />
            </View>
            <View
              style={{
                margin: '10 20',
                padding: '10 20',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold' }}>{booking.user.name}</Text>
                <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', marginLeft: 'auto' }}>Invoice Number: </Text>
                <Text style={{ fontSize: 12 }}>{booking._id}</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 12 }}>{booking.user.email}</Text>
                <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', marginLeft: 'auto' }}>Invoice Date: </Text>
                <Text style={{ fontSize: 12 }}>{new Date(Date.now()).toLocaleString('en-US')}</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ fontSize: 12 }}>Check In: {'   '}</Text>
                <Text style={{ fontSize: 12 }}>
                  {new Date(booking.checkInDate ? booking.checkInDate : 0).toLocaleString('en-US')}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ fontSize: 12 }}>Check Out: </Text>
                <Text style={{ fontSize: 12 }}>
                  {new Date(booking.checkOutDate ? booking.checkOutDate : 0).toLocaleString('en-US')}
                </Text>
              </View>
            </View>
            <View> </View>
            <View> </View>
            <View> </View>
            <View> </View>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                display: 'flex',
                flexDirection: 'row',
                margin: '20 40 10 40',
                padding: '20 0 10 0',
                fontFamily: 'Helvetica-Bold',
              }}
            >
              <View style={{ width: '60%' }}>
                <Text style={{ fontSize: 12 }}>Booking</Text>
              </View>
              <View style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                <View style={{ flex: '1 1 0', textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>Days Stay</Text>
                </View>
                <View style={{ flex: '1 1 0', textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>Price</Text>
                </View>
                <View style={{ flex: '1 1 0', textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>Total</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                display: 'flex',
                flexDirection: 'row',
                margin: '0 40 0 40',
                padding: '0 0 10 0',
              }}
            >
              <View style={{ width: '60%' }}>
                <Text style={{ fontSize: 12 }}>{booking.room.name}</Text>
              </View>
              <View style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                <View style={{ flex: '1 1 0', textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>{booking.daysOfStay}</Text>
                </View>
                <View style={{ flex: '1 1 0', textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>${booking.room.pricePerNight}</Text>
                </View>
                <View style={{ flex: '1 1 0', textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>${booking.amountPaid}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '20 40 0 40',
                padding: '20 0 10 0',
                fontFamily: 'Helvetica-Bold',
              }}
            >
              <View style={{ width: '60%' }}>
                <Text> </Text>
              </View>
              <View
                style={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'row',
                  borderBottomColor: 'black',
                  borderBottomWidth: 2,
                }}
              >
                <View style={{ flex: '1 1 0' }}>
                  <Text> </Text>
                </View>
                <View style={{ flex: '1 1 0', textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>Subtotal:</Text>
                </View>
                <View style={{ flex: '1 1 0', textAlign: 'right' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Helvetica' }}>${booking.amountPaid}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '0 40 10 40',
                padding: '0 0 10 0',
                fontFamily: 'Helvetica-Bold',
              }}
            >
              <View style={{ width: '60%' }}>
                <Text> </Text>
              </View>
              <View
                style={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <View style={{ flex: '1 1 0' }}>
                  <Text> </Text>
                </View>
                <View style={{ flex: '1 1 0', textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>Total:</Text>
                </View>
                <View style={{ flex: '1 1 0', textAlign: 'right' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Helvetica' }}>${booking.amountPaid}</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 'auto', padding: 0, fontSize: 12 }}>
              <Text>This is auto generated Invoice of your booking on Book IT.</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );

    setBookingIdToPreviewInvoice(booking._id);
  };

  return (
    <>
      <div className="container container-fluid">
        <h1 className="my-5">{`${bookings.current && bookings.current.length} Bookings`}</h1>

        {loading || !isSettled.current ? (
          <Loader />
        ) : (
          <MemoizedMDBDataTable data={memoizedDataForTable} onPageChange={memoizedCallback} />
        )}
      </div>

      <div ref={invoiceDivRef}></div>
      {bookingIdToPreviewInvoice && <div style={{ marginTop: 60 }}>{invoiceRef.current}</div>}

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
    </>
  );
}
