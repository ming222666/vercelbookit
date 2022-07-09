import { ILES } from '../../../../../db/interfaces';
import { ReviewInfo } from './ReviewInfo';

export interface ReviewsState extends ILES {
  reviews: ReviewInfo[];
  roomId: string;
}
