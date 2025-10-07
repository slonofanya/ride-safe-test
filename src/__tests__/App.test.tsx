import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

// Mock react-router-dom to avoid Router conflicts
vi.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="browser-router">{children}</div>
  ),
  Routes: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="routes">{children}</div>
  ),
  Route: ({ path, element }: { path: string; element: React.ReactNode }) => (
    <div data-testid={`route-${path}`}>{element}</div>
  ),
  Navigate: ({ to }: { to: string; replace: boolean }) => (
    <div data-testid={`navigate-to-${to}`}>Navigate to {to}</div>
  ),
}));

// Mock the pages to avoid complex dependencies
vi.mock("../pages/Settings", () => ({
  Settings: () => <div data-testid="settings-page">Settings Page</div>,
}));

vi.mock("../pages/Passenger", () => ({
  Passenger: () => <div data-testid="passenger-page">Passenger Page</div>,
}));

vi.mock("../pages/Driver", () => ({
  Driver: () => <div data-testid="driver-page">Driver Page</div>,
}));

// Mock the FeatureFlagContext to avoid API calls
vi.mock("../contexts/FeatureFlagContext", () => ({
  FeatureFlagProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="feature-flag-provider">{children}</div>
  ),
}));

// Mock antd-mobile ConfigProvider
vi.mock("antd-mobile", () => ({
  ConfigProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="config-provider">{children}</div>
  ),
}));

import App from "../App";

describe("App Component", () => {
  it("should render the app with all providers and routing structure", () => {
    const { container } = render(<App />);

    // Check that all providers are rendered
    expect(screen.getByTestId("config-provider")).toBeInTheDocument();
    expect(screen.getByTestId("feature-flag-provider")).toBeInTheDocument();
    expect(screen.getByTestId("browser-router")).toBeInTheDocument();
    expect(screen.getByTestId("routes")).toBeInTheDocument();
    
    // Check that the app div has the correct class
    expect(container.querySelector(".app")).toBeInTheDocument();
  });

  it("should render all route components", () => {
    render(<App />);

    // Check that all routes are defined
    expect(screen.getByTestId("route-/")).toBeInTheDocument();
    expect(screen.getByTestId("route-/settings")).toBeInTheDocument();
    expect(screen.getByTestId("route-/passenger")).toBeInTheDocument();
    expect(screen.getByTestId("route-/driver")).toBeInTheDocument();
  });

  it("should render navigate component for root route", () => {
    render(<App />);

    // Check that the root route has a Navigate component
    expect(screen.getByTestId("navigate-to-/settings")).toBeInTheDocument();
  });

  it("should render page components for each route", () => {
    render(<App />);

    // Check that page components are rendered
    expect(screen.getByTestId("settings-page")).toBeInTheDocument();
    expect(screen.getByTestId("passenger-page")).toBeInTheDocument();
    expect(screen.getByTestId("driver-page")).toBeInTheDocument();
  });
});
