import { ILES } from '../../../../db/interfaces';

export interface ReviewAvailabilityState extends ILES {
  isAvailable: boolean;
}
