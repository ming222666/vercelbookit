import { IBookingDto } from '../../db/interfaces';

export interface IBookingExtended extends Omit<IBookingDto, 'room' | 'user'> {
  room: {
    _id: string;
    name: string;
    pricePerNight: number;
    images: [
      {
        _id: string;
        public_id: string;
        url: string;
      },
    ];
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
}
