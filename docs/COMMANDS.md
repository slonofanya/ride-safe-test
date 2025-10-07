# Available Commands

> **📖 Documentation Index**: [README.md](README.md) | **🏠 Main Project**: [../README.md](../README.md)

This project provides a simplified set of commands for development, testing, and building.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Testing

### Unit Tests (Vitest)
```bash
# Run unit tests with coverage
npm run test

# Run unit tests with UI
npm run test:ui

# Run unit tests in CI mode
npm run test:run
```

### E2E Tests (Cypress)
```bash
# Run E2E tests with coverage
npm run e2e

# Open Cypress test runner
npm run e2e:open

# Run E2E tests in CI mode
npm run e2e:ci
```

## Coverage

Coverage is automatically collected for both unit and E2E tests:

- **Unit Test Coverage:** `coverage/unit/`
- **E2E Test Coverage:** `coverage/e2e/`

No special commands needed - coverage is included in all test runs.

## Environment Variables

The application uses environment variables for configuration:

- `VITE_HOST` - Development server host (default: 127.0.0.1)
- `VITE_PORT` - Development server port (default: 5173)
- `VITE_APP_TITLE` - Application title
- `VITE_APP_DESCRIPTION` - Application description

See `.env.example` for configuration options.

## CI/CD Testing

Test the complete CI/CD pipeline locally:

```bash
# Run the full CI/CD pipeline locally
npm run test:ci
```

This will:
- Run unit tests with coverage
- Build the application
- Start preview server
- Run E2E tests with coverage
- Merge coverage reports
- Generate all artifacts

## GitHub Actions

The project includes a comprehensive GitHub Actions workflow that:

- Runs unit tests with coverage collection
- Runs E2E tests with video/screenshot capture
- Merges coverage reports
- Uploads artifacts (videos, screenshots, coverage reports)
- Integrates with Codecov for coverage tracking

See `.github/workflows/cypress.yml` for the complete workflow configuration.
