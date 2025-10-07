import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { FeatureFlagProvider } from "../FeatureFlagContext";
import { useFeatureFlags } from "../useFeatureFlags";
import { mockApi } from "../../../api-mock";

// Mock the API
import { vi } from "vitest";

vi.mock("../../../api-mock", () => ({
  mockApi: {
    getFeatureFlags: vi.fn(),
  },
}));

const mockGetFeatureFlags = vi.mocked(mockApi.getFeatureFlags);

// Test component that uses the context
const TestComponent: React.FC = () => {
  const { isEnabled, enable, disable, loading, error } = useFeatureFlags();

  return (
    <div>
      <div data-testid="loading">{loading ? "loading" : "loaded"}</div>
      <div data-testid="error">{error || "no-error"}</div>
      <div data-testid="passenger-flag">
        {isEnabled("passengerRouteMap") ? "enabled" : "disabled"}
      </div>
      <div data-testid="driver-flag">
        {isEnabled("driverRouteMapPreview") ? "enabled" : "disabled"}
      </div>
      <button
        data-testid="toggle-passenger"
        onClick={() =>
          isEnabled("passengerRouteMap")
            ? disable("passengerRouteMap")
            : enable("passengerRouteMap")
        }
      >
        Toggle Passenger
      </button>
      <button
        data-testid="toggle-driver"
        onClick={() =>
          isEnabled("driverRouteMapPreview")
            ? disable("driverRouteMapPreview")
            : enable("driverRouteMapPreview")
        }
      >
        Toggle Driver
      </button>
    </div>
  );
};

describe("FeatureFlagContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should provide initial loading state", () => {
    mockGetFeatureFlags.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>,
    );

    expect(screen.getByTestId("loading")).toHaveTextContent("loading");
  });

  it("should load feature flags from API", async () => {
    const mockFlags = {
      passengerRouteMap: true,
      driverRouteMapPreview: false,
    };
    mockGetFeatureFlags.mockResolvedValue(mockFlags);

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
    });

    expect(screen.getByTestId("passenger-flag")).toHaveTextContent("enabled");
    expect(screen.getByTestId("driver-flag")).toHaveTextContent("disabled");
  });

  it("should handle API errors", async () => {
    mockGetFeatureFlags.mockRejectedValue(new Error("API Error"));

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
    });

    expect(screen.getByTestId("error")).toHaveTextContent("API Error");
  });

  it("should toggle feature flags", async () => {
    const mockFlags = {
      passengerRouteMap: false,
      driverRouteMapPreview: false,
    };
    mockGetFeatureFlags.mockResolvedValue(mockFlags);

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
    });

    // Initially disabled
    expect(screen.getByTestId("passenger-flag")).toHaveTextContent("disabled");

    // Toggle passenger flag
    act(() => {
      screen.getByTestId("toggle-passenger").click();
    });

    expect(screen.getByTestId("passenger-flag")).toHaveTextContent("enabled");

    // Toggle driver flag
    act(() => {
      screen.getByTestId("toggle-driver").click();
    });

    expect(screen.getByTestId("driver-flag")).toHaveTextContent("enabled");
  });

  it("should throw error when used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useFeatureFlags must be used within a FeatureFlagProvider");

    consoleSpy.mockRestore();
  });

  it("should handle non-Error exceptions", async () => {
    mockGetFeatureFlags.mockRejectedValue("String error");

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
    });

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Failed to fetch feature flags",
    );
  });

  it("should handle enable and disable functions", async () => {
    const mockFlags = {
      passengerRouteMap: false,
      driverRouteMapPreview: false,
    };
    mockGetFeatureFlags.mockResolvedValue(mockFlags);

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
    });

    // Test enable function
    act(() => {
      screen.getByTestId("toggle-passenger").click();
    });

    expect(screen.getByTestId("passenger-flag")).toHaveTextContent("enabled");

    // Test disable function
    act(() => {
      screen.getByTestId("toggle-passenger").click();
    });

    expect(screen.getByTestId("passenger-flag")).toHaveTextContent("disabled");
  });
});
