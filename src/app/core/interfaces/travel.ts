import { Owner } from './owner';
import { Participant } from './participant';
import { GeoPosition } from './travel-payload';

export interface Travel {
  id: number;
  departure_time: string;
  owner_comment: string;
  capacity: number;
  distance: number;
  bearing: string;
  participants: Participant[];
  origin: GeoPosition;
  destination: GeoPosition;
  owner: Owner;
}
