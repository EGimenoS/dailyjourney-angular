export interface TravelPayload {
  capacity: number;
  owner_comment: string;
  departure_time: string;
  periodicity: string;
  origin_attributes: GeoPosition;
  destination_attributes: GeoPosition;
}

interface GeoPosition {
  addres: string;
  latitude: number;
  logitude: number;
}
