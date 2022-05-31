export interface IErrormsgStatusDto {
  errormsg: string;
  status: number;
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
