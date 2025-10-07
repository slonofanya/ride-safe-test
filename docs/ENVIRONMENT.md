# Environment Configuration

> **📖 Documentation Index**: [README.md](README.md) | **🏠 Main Project**: [../README.md](../README.md)

This application uses environment variables to configure the development server host and port, as well as application metadata.

## Environment Variables

### Development Server Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_HOST` | `127.0.0.1` | Host address for the development server |
| `VITE_PORT` | `5173` | Port number for the development server |

### Application Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_APP_TITLE` | `Ride Safe - CarSharing App` | Application title (used in HTML title tag) |
| `VITE_APP_DESCRIPTION` | `CarSharing app with feature flags for passenger and driver views` | Application description (used in HTML meta description) |

## Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your desired configuration:
   ```bash
   # Development server configuration
   VITE_HOST=127.0.0.1
   VITE_PORT=5173

   # Application configuration
   VITE_APP_TITLE=Ride Safe - CarSharing App
   VITE_APP_DESCRIPTION=CarSharing app with feature flags for passenger and driver views
   ```

## Usage

### Running the Development Server

The application will automatically use the environment variables from your `.env` file:

```bash
# Standard development server (uses .env variables)
npm run dev

# Custom development server with explicit host/port
npm run dev:custom
```

### Running Tests

Cypress tests will automatically use the configured host and port:

```bash
# Run E2E tests
npm run e2e

# Open Cypress test runner
npm run e2e:open
```

## Examples

### Different Host/Port Configurations

**Local development:**
```bash
VITE_HOST=127.0.0.1
VITE_PORT=5173
```

**Network accessible:**
```bash
VITE_HOST=0.0.0.0
VITE_PORT=3000
```

**Custom port:**
```bash
VITE_HOST=127.0.0.1
VITE_PORT=8080
```

### Custom Application Metadata

```bash
VITE_APP_TITLE=My Custom App Title
VITE_APP_DESCRIPTION=My custom application description
```

## GitHub Actions Integration

The CI/CD pipeline uses GitHub environments for configuration instead of the `.env` file:

- **E2E Tests**: Uses `VITE_HOST` and `VITE_PORT` from GitHub environment variables
- **Cypress Configuration**: Dynamically sets `baseUrl` based on environment variables
- **Local CI Script**: Still uses `.env` file for local testing

### GitHub Environment Setup

1. **Create Environment**: Go to repository Settings → Environments → New environment
2. **Name it**: `main` (or match the name in the workflow)
3. **Add Variables**:
   - `VITE_HOST`: `127.0.0.1`
   - `VITE_PORT`: `5173`
   - `VITE_APP_TITLE`: `Ride Safe - CarSharing App`
   - `VITE_APP_DESCRIPTION`: `CarSharing app with feature flags for passenger and driver views`

The workflow will:
1. Use environment variables from the GitHub environment
2. Construct the application URL dynamically
3. Use the dynamic URL for testing and waiting
4. Pass environment variables to Cypress tests

See [GITHUB_ENVIRONMENTS.md](./GITHUB_ENVIRONMENTS.md) for detailed setup instructions.

## Notes

- Environment variables must be prefixed with `VITE_` to be accessible in the browser
- Changes to `.env` require restarting the development server
- The `.env` file is ignored by git (see `.gitignore`)
- Use `.env.example` as a template for other developers
- GitHub Actions will use the same environment variables as local development
