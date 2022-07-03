import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter room number'],
    trim: true,
    maxLength: [100, 'Room name cannot exceed 100 characters'],
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Please enter room price per night'],
    maxLength: [4, 'Room price cannot exceed 4 characters'],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, 'Please enter room description'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Please enter room address'],
    trim: true,
  },
  guestCapacity: {
    type: Number,
    required: [true, 'Please enter room guest capacity'],
  },
  numOfBeds: {
    type: Number,
    required: [true, 'Please enter number of beds in room'],
  },
  isAvailInternet: {
    type: Number,
    default: 0,
  },
  isAvailBreakfast: {
    type: Number,
    default: 0,
  },
  isAvailAirConditioned: {
    type: Number,
    default: 0,
  },
  isAvailRoomCleaning: {
    type: Number,
    default: 0,
  },
  isAllowedPets: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please enter room category'],
    enum: {
      values: ['King', 'Single', 'Twins'],
      message: 'Please select correct category for room',
    },
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // required: true
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true, trim: true },
      createdAt: {
        type: Number,
        default: Date.now,
      },
      updatedAt: {
        type: Number,
        default: Date.now,
      },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // required: true
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: Date.now,
  },
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

export default Room;
