import React from "react";
import { render, screen } from "@testing-library/react";
import { RideCard } from "../RideCard";
import { Ride } from "../../types";

const mockRide: Ride = {
  id: "r1",
  role: "passenger",
  from: "Kyiv",
  to: "Fastiv",
  when: "2025-09-27T08:30:00+03:00",
  coords: { lat: 50.4501, lng: 30.5234 },
};

describe("RideCard Component", () => {
  it("should render ride information correctly", () => {
    render(<RideCard ride={mockRide} showMap={false} />);

    expect(screen.getByText("Kyiv")).toBeInTheDocument();
    expect(screen.getByText("Fastiv")).toBeInTheDocument();
    expect(screen.getByText("Passenger")).toBeInTheDocument();
    expect(screen.getByText("Sep 27, 05:30 AM")).toBeInTheDocument();
  });

  it("should show map placeholder when showMap is true", () => {
    render(<RideCard ride={mockRide} showMap={true} />);

    expect(
      screen.getByText("Map placeholder - Uklon style"),
    ).toBeInTheDocument();
    expect(screen.getByText("Lat:")).toBeInTheDocument();
    expect(screen.getByText("Lng:")).toBeInTheDocument();
    expect(screen.getByText("50.4501")).toBeInTheDocument();
    expect(screen.getByText("30.5234")).toBeInTheDocument();
  });

  it("should show disabled message when showMap is false", () => {
    render(<RideCard ride={mockRide} showMap={false} />);

    expect(screen.getByText("Map disabled")).toBeInTheDocument();
    expect(screen.getByText("🚫")).toBeInTheDocument();
  });

  it("should render driver role correctly", () => {
    const driverRide: Ride = {
      ...mockRide,
      role: "driver",
    };

    render(<RideCard ride={driverRide} showMap={false} />);

    expect(screen.getByText("Driver")).toBeInTheDocument();
  });

  it("should format date correctly", () => {
    const rideWithDifferentDate: Ride = {
      ...mockRide,
      when: "2025-12-25T15:45:00+03:00",
    };

    render(<RideCard ride={rideWithDifferentDate} showMap={false} />);

    expect(screen.getByText("Dec 25, 12:45 PM")).toBeInTheDocument();
  });
});
