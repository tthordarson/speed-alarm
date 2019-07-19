// import { getDistance } from "geolib";

// //@flow

// calculateSpeedMetersPerSecond => (locationA: Coordinates, locationB: Coordinates, timeTravelledSeconds: number) {
//     if (!locationA || !locationB) {
//         return 0;
//     }

//     const distanceMeters = getDistance(locationA, locationB);
    
//     if (!distanceMeters) {
//         return 0;
//     }

//     return distanceMeters / timeTravelledSeconds;
// }

// calculateSpeedKmPerHour() {
//     return convert(this.speedMetersPerSecond).from('m/s').to('km/h');
// }