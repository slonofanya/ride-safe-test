import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Passenger } from "../Passenger";
import { FeatureFlagProvider } from "../../contexts/FeatureFlagContext";
import { mockApi } from "../../../api-mock";
import { vi } from "vitest";

// Mock the RideCard component
vi.mock("../../components/RideCard", () => ({
  RideCard: ({ ride, showMap }: { ride: any; showMap: boolean }) => (
    <div data-testid={`ride-card-${ride.id}`}>
      {ride.from} → {ride.to} (Map: {showMap ? "Yes" : "No"})
    </div>
  ),
}));

// Mock the API
vi.mock("../../../api-mock", () => ({
  mockApi: {
    getRides: vi.fn(),
  },
}));

// Mock window methods
const mockReload = vi.fn();
const mockBack = vi.fn();
Object.defineProperty(window, "location", {
  value: { reload: mockReload },
  writable: true,
});
Object.defineProperty(window, "history", {
  value: { back: mockBack },
  writable: true,
});

const mockRides = [
  {
    id: "1",
    from: "Downtown Office",
    to: "Airport Terminal",
    when: "2024-01-15T14:30:00Z",
    role: "passenger" as const,
    coords: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "2",
    from: "Shopping Mall",
    to: "Train Station",
    when: "2024-01-15T16:00:00Z",
    role: "passenger" as const,
    coords: { lat: 40.7589, lng: -73.9851 },
  },
];

const renderPassenger = (initialFlags = {}) => {
  return render(
    <MemoryRouter>
      <FeatureFlagProvider initialFlags={initialFlags}>
        <Passenger />
      </FeatureFlagProvider>
    </MemoryRouter>,
  );
};

describe("Passenger Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    (mockApi.getRides as any).mockImplementation(() => new Promise(() => {}));

    renderPassenger();

    expect(screen.getByText("Loading passenger rides...")).toBeInTheDocument();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should render rides when data is loaded", async () => {
    (mockApi.getRides as any).mockResolvedValue({ rides: mockRides });

    renderPassenger();

    await waitFor(() => {
      expect(screen.getByText("Passenger Rides")).toBeInTheDocument();
    });

    expect(screen.getByTestId("ride-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("ride-card-2")).toBeInTheDocument();
  });

  it("should show map status as enabled when feature flag is on", async () => {
    (mockApi.getRides as any).mockResolvedValue({ rides: mockRides });

    renderPassenger({ passengerRouteMap: true });

    await waitFor(() => {
      expect(screen.getByText("Map: Enabled")).toBeInTheDocument();
    });
  });

  it("should show map status as disabled when feature flag is off", async () => {
    (mockApi.getRides as any).mockResolvedValue({ rides: mockRides });

    renderPassenger({ passengerRouteMap: false });

    await waitFor(() => {
      expect(screen.getByText("Map: Disabled")).toBeInTheDocument();
    });
  });

  it("should render empty state when no rides", async () => {
    (mockApi.getRides as any).mockResolvedValue({ rides: [] });

    renderPassenger();

    await waitFor(() => {
      expect(
        screen.getByText("No passenger rides available"),
      ).toBeInTheDocument();
    });
  });

  it("should render error state when API fails", async () => {
    const errorMessage = "Network error";
    (mockApi.getRides as any).mockRejectedValue(new Error(errorMessage));

    renderPassenger();

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });

    expect(screen.getByText("Retry")).toBeInTheDocument();
  });

  it("should handle retry button click", async () => {
    (mockApi.getRides as any).mockRejectedValue(new Error("Network error"));

    renderPassenger();

    await waitFor(() => {
      expect(screen.getByText("Retry")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Retry"));
    expect(mockReload).toHaveBeenCalled();
  });

  it("should handle back button click", async () => {
    (mockApi.getRides as any).mockResolvedValue({ rides: mockRides });

    renderPassenger();

    await waitFor(() => {
      expect(screen.getByText("Back to Settings")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Back to Settings"));
    expect(mockBack).toHaveBeenCalled();
  });

  it("should pass showMap prop to RideCard components", async () => {
    (mockApi.getRides as any).mockResolvedValue({ rides: mockRides });

    renderPassenger({ passengerRouteMap: true });

    await waitFor(() => {
      expect(
        screen.getByText("Downtown Office → Airport Terminal (Map: Yes)"),
      ).toBeInTheDocument();
    });
  });

  it("should handle non-Error exceptions", async () => {
    (mockApi.getRides as any).mockRejectedValue("String error");

    renderPassenger();

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch rides"),
      ).toBeInTheDocument();
    });
  });
});
