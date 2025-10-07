import "@testing-library/jest-dom";
import "antd-mobile/es/global";

// Suppress warnings in tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('React Router Future Flag Warning') ||
     args[0].includes('ReactDOMTestUtils.act'))
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('[antd-mobile: Global] The px tester is not rendering properly') ||
     args[0].includes('Warning: `ReactDOMTestUtils.act` is deprecated'))
  ) {
    return;
  }
  originalConsoleError(...args);
};
