export interface FeatureFlagAPI {
  isEnabled: (key: "passengerRouteMap" | "driverRouteMapPreview") => boolean;
  enable: (key: string) => void;
  disable: (key: string) => void;
}

export interface FeatureFlags {
  passengerRouteMap: boolean;
  driverRouteMapPreview: boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Ride {
  id: string;
  role: "passenger" | "driver";
  from: string;
  to: string;
  when: string;
  coords: Coordinates;
}

export interface RidesResponse {
  rides: Ride[];
}

export interface HealthResponse {
  status: string;
}
