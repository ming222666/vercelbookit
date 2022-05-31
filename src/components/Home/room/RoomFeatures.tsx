import React from 'react';

import { IRoomDto } from '../../../db/interfaces';

export function RoomFeatures(props: { room: IRoomDto | null }): JSX.Element {
  const room = props.room;

  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features:</h3>
      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
        <p>{!room ? '0 Guests' : room.guestCapacity === 1 ? '1 Guest' : `${room.guestCapacity} Guests`}</p>
      </div>

      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
        <p>{!room ? '0 Beds' : room.numOfBeds === 1 ? '1 Bed' : `${room.numOfBeds} Beds`}</p>
      </div>

      <div className="room-feature">
        <i
          className={room?.isAvailBreakfast ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
          aria-hidden="true"
        ></i>
        <p>Breakfast</p>
      </div>

      <div className="room-feature">
        <i
          className={room?.isAvailInternet ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
          aria-hidden="true"
        ></i>
        <p>Internet</p>
      </div>

      <div className="room-feature">
        <i
          className={room?.isAvailAirConditioned ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
          aria-hidden="true"
        ></i>
        <p>Air Conditioned</p>
      </div>

      <div className="room-feature">
        <i
          className={room?.isAllowedPets ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
          aria-hidden="true"
        ></i>
        <p>Pets Allowed</p>
      </div>

      <div className="room-feature">
        <i
          className={room?.isAvailRoomCleaning ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
          aria-hidden="true"
        ></i>
        <p>Room Cleaning</p>
      </div>
    </div>
  );
}
