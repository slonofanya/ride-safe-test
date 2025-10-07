// Mock API for CarSharing app
export interface HealthResponse {
  status: string;
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
  role: 'passenger' | 'driver';
  from: string;
  to: string;
  when: string;
  coords: Coordinates;
}

export interface RidesResponse {
  rides: Ride[];
}

// Mock data
const mockRides: Ride[] = [
  {
    id: "r1",
    role: "passenger",
    from: "Kyiv",
    to: "Fastiv",
    when: "2025-09-27T08:30:00+03:00",
    coords: { lat: 50.4501, lng: 30.5234 }
  },
  {
    id: "r2",
    role: "driver",
    from: "Kyiv",
    to: "Lviv",
    when: "2025-09-27T12:15:00+03:00",
    coords: { lat: 49.8397, lng: 24.0297 }
  },
  {
    id: "r3",
    role: "passenger",
    from: "Lviv",
    to: "Ternopil",
    when: "2025-09-27T14:00:00+03:00",
    coords: { lat: 49.5535, lng: 25.5948 }
  }
];

const mockFeatureFlags: FeatureFlags = {
  passengerRouteMap: true,
  driverRouteMapPreview: false
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getHealth(): Promise<HealthResponse> {
    await delay(100);
    return { status: "ok" };
  },

  async getFeatureFlags(): Promise<FeatureFlags> {
    await delay(200);
    return { ...mockFeatureFlags };
  },

  async getRides(role?: 'passenger' | 'driver'): Promise<RidesResponse> {
    await delay(300);
    let filteredRides = mockRides;

    if (role) {
      filteredRides = mockRides.filter(ride => ride.role === role);
    }

    return { rides: filteredRides };
  }
};

