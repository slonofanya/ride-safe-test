import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Settings } from "../Settings";
import { FeatureFlagProvider } from "../../contexts/FeatureFlagContext";
import { mockApi } from "../../../api-mock";

// Mock the API
import { vi } from "vitest";

vi.mock("../../../api-mock", () => ({
  mockApi: {
    getFeatureFlags: vi.fn(),
  },
}));

const mockGetFeatureFlags = vi.mocked(mockApi.getFeatureFlags);

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock antd-mobile Toast
vi.mock("antd-mobile", async () => {
  const actual = await vi.importActual("antd-mobile");
  return {
    ...actual,
    Toast: {
      show: vi.fn(),
    },
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <FeatureFlagProvider>{component}</FeatureFlagProvider>
    </BrowserRouter>,
  );
};

describe("Settings Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    mockGetFeatureFlags.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithProviders(<Settings />);

    expect(screen.getByText("Loading settings...")).toBeInTheDocument();
  });

  it("should render feature flag toggles when loaded", async () => {
    const mockFlags = {
      passengerRouteMap: true,
      driverRouteMapPreview: false,
    };
    mockGetFeatureFlags.mockResolvedValue(mockFlags);

    renderWithProviders(<Settings />);

    await waitFor(() => {
      expect(screen.getByText("Feature Settings")).toBeInTheDocument();
    });

    expect(screen.getByText("Passenger Route Map")).toBeInTheDocument();
    expect(screen.getByText("Driver Route Preview")).toBeInTheDocument();
  });

  it("should show error state when API fails", async () => {
    mockGetFeatureFlags.mockRejectedValue(new Error("API Error"));

    renderWithProviders(<Settings />);

    await waitFor(() => {
      expect(screen.getByText("Error: API Error")).toBeInTheDocument();
    });
  });

  it("should navigate to passenger page when button clicked", async () => {
    const mockFlags = {
      passengerRouteMap: true,
      driverRouteMapPreview: false,
    };
    mockGetFeatureFlags.mockResolvedValue(mockFlags);

    renderWithProviders(<Settings />);

    await waitFor(() => {
      expect(screen.getByText("View Passenger Page")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("View Passenger Page"));

    expect(mockNavigate).toHaveBeenCalledWith("/passenger");
  });

  it("should navigate to driver page when button clicked", async () => {
    const mockFlags = {
      passengerRouteMap: true,
      driverRouteMapPreview: false,
    };
    mockGetFeatureFlags.mockResolvedValue(mockFlags);

    renderWithProviders(<Settings />);

    await waitFor(() => {
      expect(screen.getByText("View Driver Page")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("View Driver Page"));

    expect(mockNavigate).toHaveBeenCalledWith("/driver");
  });

  it("should toggle passenger route map feature flag", async () => {
    const mockFlags = {
      passengerRouteMap: false,
      driverRouteMapPreview: false,
    };
    mockGetFeatureFlags.mockResolvedValue(mockFlags);

    renderWithProviders(<Settings />);

    await waitFor(() => {
      expect(screen.getByText("Feature Settings")).toBeInTheDocument();
    });

    // Find the switch by data-testid
    const passengerSwitch = screen.getByTestId("switch-passengerRouteMap");
    fireEvent.click(passengerSwitch);

    // Check that Toast.show was called
    const { Toast } = await import("antd-mobile");
    expect(Toast.show).toHaveBeenCalledWith("passengerRouteMap enabled");
  });

  it("should toggle driver route preview feature flag", async () => {
    const mockFlags = {
      passengerRouteMap: false,
      driverRouteMapPreview: true,
    };
    mockGetFeatureFlags.mockResolvedValue(mockFlags);

    renderWithProviders(<Settings />);

    await waitFor(() => {
      expect(screen.getByText("Feature Settings")).toBeInTheDocument();
    });

    // Find the switch by data-testid
    const driverSwitch = screen.getByTestId("switch-driverRouteMapPreview");
    fireEvent.click(driverSwitch);

    // Check that Toast.show was called
    const { Toast } = await import("antd-mobile");
    expect(Toast.show).toHaveBeenCalledWith("driverRouteMapPreview disabled");
  });

  it("should handle non-Error exceptions", async () => {
    mockGetFeatureFlags.mockRejectedValue("String error");

    renderWithProviders(<Settings />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch feature flags"),
      ).toBeInTheDocument();
    });
  });
});
