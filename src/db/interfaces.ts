export interface IErrorDto {
  errormsg: string;
  status: number;
  internalServerErrorText?: string;
  exceptionErrorText?: string;
}

export interface IRoomDummyDto {
  message: string;
}

export interface IRoomDtodddd {
  room: string;
}

export interface IRoomDto {
  _id: string;
  name: string;
  pricePerNight: number;
  description: string;
  address: string;
  guestCapacity: number;
  numOfBeds: number;
  isAvailInternet: number;
  isAvailBreakfast: number;
  isAvailAirConditioned: number;
  isAvailRoomCleaning: number;
  isAllowedPets: number;
  rating: number;
  numOfReviews: number;
  images: [
    {
      public_id: string;
      url: string;
    },
  ];
  category: string;
  reviews: [
    {
      _id?: string;
      user: string;
      name: string;
      rating: number;
      comment: string;
    },
  ];
  user: string;
  createdAt: number;
  updatedAt: number;
}

export interface IAllRoomsDto {
  roomsCount: number;
  resPerPage: number;
  filteredRoomsCount: number;
  rooms: IRoomDto[];
}

/**
 * User
 */
export interface IUserDto {
  _id?: string;
  name: string;
  email: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role?: string;
  createdAt?: number;
  updatedAt?: number;
}

/**
 * Booking
 */
export interface IBookingDto {
  _id?: string;
  room: string;
  user: string;
  checkInDate: number | null;
  checkOutDate: number | null;
  amountPaid: number;
  daysOfStay: number;
  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt?: number;
  createdAt?: number;
}

export interface ILES {
  loading: boolean;
  error: IErrorDto | null;
  success: true | null;
}
