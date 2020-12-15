import { getDistance } from 'geolib';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';

export const calculateDistance = (pointA: GeoPosition, pointB: GeoPosition) => {
  return getDistance(
    { latitude: pointA.latitude, longitude: pointA.longitude },
    { latitude: pointB.latitude, longitude: pointB.longitude },
    1
  );
};
