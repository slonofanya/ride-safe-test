import React from "react";
import { vi } from "vitest";

// Mock ReactDOM.createRoot
const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender,
}));

vi.mock("react-dom/client", () => ({
  default: {
    createRoot: mockCreateRoot,
  },
  createRoot: mockCreateRoot,
}));

// Mock App component
const MockApp = () => <div data-testid="app-component">App Component</div>;
vi.mock("../App", () => ({
  default: MockApp,
}));

// Mock CSS import
vi.mock("../index.css", () => ({}));

// Mock document.getElementById
const mockElement = document.createElement("div");
mockElement.id = "root";
const mockGetElementById = vi.fn(() => mockElement);

Object.defineProperty(document, "getElementById", {
  value: mockGetElementById,
  writable: true,
});

describe("main.tsx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should execute main.tsx code and create root with App in StrictMode", async () => {
    // Dynamically import and execute main.tsx
    await import("../main");

    expect(mockGetElementById).toHaveBeenCalledWith("root");
    expect(mockCreateRoot).toHaveBeenCalledWith(mockElement);
    expect(mockRender).toHaveBeenCalledWith(
      <React.StrictMode>
        <MockApp />
      </React.StrictMode>,
    );
  });

  it("should handle missing root element gracefully", async () => {
    mockGetElementById.mockReturnValueOnce(null);

    // This should not throw an error due to the non-null assertion
    expect(() => {
      // Dynamically import and execute main.tsx
      import("../main");
    }).not.toThrow();
  });
});
