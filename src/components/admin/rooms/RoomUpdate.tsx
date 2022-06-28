import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { AppState } from '../../../store';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { getRoom } from '../../../store/ducks/roomDetails/action';
import { roomUpdate } from '../../../store/ducks/admin/roomUpdate/action';
import { RoomDetailsActionType } from '../../../store/ducks/roomDetails/types';
import { RoomUpdateActionType } from '../../../store/ducks/admin/roomUpdate/types';
import Loader from '../../../components/Layout/Loader';
import { IRoomDto } from '../../../db/interfaces';
import ButtonLoader from '../../../components/Layout/ButtonLoader';

const regexInt = new RegExp('^[0-9]*$');

const testRegexInt = (val: string, f: (val: string) => void): void => {
  if (val === '') {
    f('0');
    return;
  }
  if (regexInt.test(val)) {
    f(val);
  }
};

export default function RoomUpdate(): JSX.Element {
  const [name, setName] = useState<string | undefined>('');
  const [price, setPrice] = useState<string | undefined>('0');
  const [description, setDescription] = useState<string | undefined>('');
  const [address, setAddress] = useState<string | undefined>('');
  const [category, setCategory] = useState<string | undefined>('King');
  const [guestCapacity, setGuestCapacity] = useState<string | undefined>('1');
  const [numOfBeds, setNumOfBeds] = useState<string | undefined>('1');
  const [internet, setInternet] = useState<number | undefined>(0);
  const [breakfast, setBreakfast] = useState<number | undefined>(0);
  const [airConditioned, setAirConditioned] = useState<number | undefined>(0);
  const [petsAllowed, setPetsAllowed] = useState<number | undefined>(0);
  const [roomCleaning, setRoomCleaning] = useState<number | undefined>(0);

  const { room, error, /* loading, */ success } = useSelector((state: AppState) => state.roomDetails);
  const { user } = useSelector((state: AppState) => state.auth);
  const {
    room: roomFromUpdate,
    error: errorFromUpdate,
    loading: loadingFromUpdate,
    success: successFromUpdate,
  } = useSelector((state: AppState) => state.admin.roomUpdate);

  const dispatch = useAppDispatch();
  const outcomeFetchRoomDetails = useRef('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (user && user.role === 'admin') {
      dispatch(getRoom(id as string));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect((): void => {
    if (error) {
      outcomeFetchRoomDetails.current = '-1';
      dispatch({ type: RoomDetailsActionType.ROOM_DETAILS_RESET_FAIL });
      toast.error(error.errormsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect((): void => {
    if (success) {
      outcomeFetchRoomDetails.current = 'ok';

      dispatch({ type: RoomDetailsActionType.ROOM_DETAILS_RESET_SUCCESS });
      setName(room?.name);
      setPrice(room?.pricePerNight.toString());
      setDescription(room?.description);
      setAddress(room?.address);
      setCategory(room?.category);
      setGuestCapacity(room?.guestCapacity.toString());
      setNumOfBeds(room?.numOfBeds.toString());
      setInternet(room?.isAvailInternet);
      setBreakfast(room?.isAvailBreakfast);
      setAirConditioned(room?.isAvailAirConditioned);
      setPetsAllowed(room?.isAllowedPets);
      setRoomCleaning(room?.isAvailRoomCleaning);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect((): void => {
    if (errorFromUpdate) {
      dispatch({ type: RoomUpdateActionType.ROOM_UPDATE_RESET_FAIL });
      toast.error(errorFromUpdate.errormsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorFromUpdate]);

  useEffect((): void => {
    if (successFromUpdate) {
      dispatch({ type: RoomUpdateActionType.ROOM_UPDATE_RESET_SUCCESS });
      toast.success('Room successfully updated');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successFromUpdate]);

  useEffect((): void => {
    if (roomFromUpdate) {
      setName(roomFromUpdate?.name);
      setPrice(roomFromUpdate?.pricePerNight.toString());
      setDescription(roomFromUpdate?.description);
      setAddress(roomFromUpdate?.address);
      setCategory(roomFromUpdate?.category);
      setGuestCapacity(roomFromUpdate?.guestCapacity.toString());
      setNumOfBeds(roomFromUpdate?.numOfBeds.toString());
      setInternet(roomFromUpdate?.isAvailInternet);
      setBreakfast(roomFromUpdate?.isAvailBreakfast);
      setAirConditioned(roomFromUpdate?.isAvailAirConditioned);
      setPetsAllowed(roomFromUpdate?.isAllowedPets);
      setRoomCleaning(roomFromUpdate?.isAvailRoomCleaning);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomFromUpdate]);

  const submitHandler = async (e: React.SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();

    const roomData: IRoomDto = {
      name: name?.trim() || '',
      pricePerNight: Number(price),
      description: description?.trim() || '',
      address: address?.trim() || '',
      category: category?.trim() || '',
      guestCapacity: Number(guestCapacity),
      numOfBeds: Number(numOfBeds),
      isAvailInternet: Number(internet),
      isAvailBreakfast: Number(breakfast),
      isAvailAirConditioned: Number(airConditioned),
      isAllowedPets: Number(petsAllowed),
      isAvailRoomCleaning: Number(roomCleaning),
    };

    dispatch(roomUpdate(id as string, roomData));
  };

  return (
    <>
      {user && user.role === 'admin' ? (
        !outcomeFetchRoomDetails.current ? (
          <Loader />
        ) : outcomeFetchRoomDetails.current !== '-1' ? (
          <div className="container container-fluid">
            <div className="row wrapper">
              <div className="col-10 col-lg-8">
                <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                  <h1 className="mb-4">Update Room</h1>
                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      value={name}
                      onChange={(e): void => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price_field">Price</label>
                    <input
                      type="text"
                      id="price_field"
                      className="form-control"
                      value={price}
                      onChange={(e): void => testRegexInt(e.target.value, setPrice)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description_field">Description</label>
                    <textarea
                      className="form-control"
                      id="description_field"
                      rows={8}
                      value={description}
                      onChange={(e): void => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address_field">Address</label>
                    <input
                      type="text"
                      id="address_field"
                      className="form-control"
                      value={address}
                      onChange={(e): void => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category_field">Category</label>
                    <select
                      className="form-control"
                      id="room_type_field"
                      value={category}
                      onChange={(e): void => setCategory(e.target.value)}
                    >
                      {['King', 'Single', 'Twins'].map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category_field">Guest Capacity</label>
                    <select
                      className="form-control"
                      id="guest_field"
                      value={guestCapacity}
                      onChange={(e): void => testRegexInt(e.target.value, setGuestCapacity)}
                    >
                      {['1', '2', '3', '4', '5', '6'].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category_field">Number of Beds</label>
                    <select
                      className="form-control"
                      id="numofbeds_field"
                      value={numOfBeds}
                      onChange={(e): void => testRegexInt(e.target.value, setNumOfBeds)}
                    >
                      {['1', '2', '3'].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label className="mb-3">Room Features</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="internet_checkbox"
                      value={internet}
                      onChange={(e): void => setInternet(e.target.checked ? 1 : 0)}
                      checked={internet ? true : false}
                    />
                    <label className="form-check-label" htmlFor="internet_checkbox">
                      Internet
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="breakfast_checkbox"
                      value={breakfast}
                      onChange={(e): void => setBreakfast(e.target.checked ? 1 : 0)}
                      checked={breakfast ? true : false}
                    />
                    <label className="form-check-label" htmlFor="breakfast_checkbox">
                      Breakfast
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="airConditioned_checkbox"
                      value={airConditioned}
                      onChange={(e): void => setAirConditioned(e.target.checked ? 1 : 0)}
                      checked={airConditioned ? true : false}
                    />
                    <label className="form-check-label" htmlFor="airConditioned_checkbox">
                      Air Conditioned
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="petsAllowed_checkbox"
                      value={petsAllowed}
                      onChange={(e): void => setPetsAllowed(e.target.checked ? 1 : 0)}
                      checked={petsAllowed ? true : false}
                    />
                    <label className="form-check-label" htmlFor="petsAllowed_checkbox">
                      Pets Allowed
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="roomCleaning_checkbox"
                      value={roomCleaning}
                      onChange={(e): void => setRoomCleaning(e.target.checked ? 1 : 0)}
                      checked={roomCleaning ? true : false}
                    />
                    <label className="form-check-label" htmlFor="roomCleaning_checkbox">
                      Room Cleaning
                    </label>
                  </div>

                  <button type="submit" className="btn btn-block new-room-btn py-3" disabled={loadingFromUpdate}>
                    {loadingFromUpdate ? <ButtonLoader /> : 'UPDATE'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          'Error while fetching room details'
        )
      ) : user ? (
        'Admin role is required to view page'
      ) : (
        <Loader />
      )}
    </>
  );
}
