# CI/CD Configuration

> **📖 Documentation Index**: [README.md](README.md) | **🏠 Main Project**: [../README.md](../README.md)

This project uses GitHub Actions for continuous integration and deployment, with comprehensive test coverage collection and artifact management.

## Workflow Overview

The CI/CD pipeline consists of three main jobs that run in parallel and sequence:

1. **Unit Tests** - Runs Vitest unit tests with coverage
2. **E2E Tests** - Runs Cypress end-to-end tests with coverage  
3. **Coverage Report** - Merges and reports combined coverage

## Workflow Jobs

### Unit Tests Job

**Purpose:** Run unit tests and collect coverage data

**Steps:**
- Checkout code
- Setup Node.js 18 with npm cache
- Install dependencies
- Run unit tests with coverage (`npm run test`)
- Upload unit test coverage artifacts
- Upload coverage to Codecov

**Artifacts Generated:**
- `unit-test-coverage/` - HTML and LCOV coverage reports
- Coverage data uploaded to Codecov with flag `unit-tests`

### E2E Tests Job

**Purpose:** Run end-to-end tests and collect coverage data

**Steps:**
- Checkout code
- Setup Node.js 18 with npm cache
- Install dependencies
- Build application (`npm run build`)
- Start preview server (`npm run preview`)
- Wait for application to be ready
- Run E2E tests in CI mode (`npm run e2e:ci`)
- Upload test videos, screenshots, and coverage
- Upload coverage to Codecov

**Artifacts Generated:**
- `e2e-test-videos/` - Test execution videos
- `e2e-test-screenshots/` - Failure screenshots
- `e2e-test-coverage/` - E2E coverage reports
- Coverage data uploaded to Codecov with flag `e2e-tests`

### Coverage Report Job

**Purpose:** Merge coverage reports and generate comprehensive coverage data

**Dependencies:** Runs after both unit-tests and e2e-tests jobs complete

**Steps:**
- Checkout code
- Setup Node.js 18 with npm cache
- Install dependencies
- Download unit test coverage artifacts
- Download E2E test coverage artifacts
- Merge coverage reports using NYC
- Generate combined HTML and text reports
- Upload merged coverage report
- Upload merged coverage to Codecov

**Artifacts Generated:**
- `merged-coverage-report/` - Combined coverage reports
- Coverage data uploaded to Codecov with flag `merged-coverage`

## Artifacts and Reports

### Available Artifacts

After each workflow run, the following artifacts are available for download:

1. **unit-test-coverage**
   - Location: `coverage/unit/`
   - Contents: HTML reports, LCOV files, JSON data
   - Retention: 30 days

2. **e2e-test-videos**
   - Location: `cypress/videos/`
   - Contents: MP4 videos of test executions
   - Retention: 30 days

3. **e2e-test-screenshots**
   - Location: `cypress/screenshots/`
   - Contents: PNG screenshots of test failures
   - Retention: 30 days

4. **e2e-test-coverage**
   - Location: `coverage/e2e/`
   - Contents: E2E test coverage reports
   - Retention: 30 days

5. **merged-coverage-report**
   - Location: `coverage/merged/`
   - Contents: Combined coverage reports
   - Retention: 30 days

### Coverage Reports

Coverage reports are generated in multiple formats:

- **HTML Reports** - Interactive coverage reports viewable in browser
- **LCOV Files** - Machine-readable coverage data
- **JSON Data** - Raw coverage data for processing
- **Text Reports** - Console-friendly coverage summaries

### Codecov Integration

Coverage data is automatically uploaded to Codecov with the following flags:

- `unit-tests` - Unit test coverage
- `e2e-tests` - E2E test coverage  
- `merged-coverage` - Combined coverage

## Workflow Triggers

The workflow runs on:

- **Push events** to `main` and `develop` branches
- **Pull request events** targeting `main` and `develop` branches

## Environment Requirements

- **Node.js:** Version 18
- **Operating System:** Ubuntu Latest
- **Browser:** Chrome (for E2E tests)
- **Dependencies:** All managed via npm

## Coverage Thresholds

The following coverage thresholds are enforced:

| Metric | Threshold |
|--------|-----------|
| Branches | 80% |
| Functions | 80% |
| Lines | 80% |
| Statements | 80% |

## Troubleshooting

### Common Issues

1. **Coverage artifacts not generated:**
   - Check if tests are running successfully
   - Verify coverage configuration in `vite.config.ts`
   - Ensure Istanbul plugin is properly configured

2. **E2E tests failing:**
   - Check if the application builds successfully
   - Verify the preview server starts correctly
   - Review test videos and screenshots for failures

3. **Coverage merge failing:**
   - Ensure both unit and E2E coverage artifacts exist
   - Check NYC configuration in `.nycrc.json`
   - Verify coverage file formats are compatible

### Debugging Steps

1. **Check workflow logs** for specific error messages
2. **Download artifacts** to inspect test results locally
3. **Review coverage reports** to identify uncovered code
4. **Examine test videos** to understand E2E test failures

## Local Testing

To test the CI/CD pipeline locally:

```bash
# Run unit tests with coverage
npm run test

# Run E2E tests with coverage
npm run e2e:ci

# Check coverage reports
open coverage/unit/index.html
open coverage/e2e/index.html
```

## Best Practices

1. **Keep tests fast** - Optimize test execution time
2. **Maintain coverage** - Don't let coverage drop below thresholds
3. **Review artifacts** - Regularly check test videos and screenshots
4. **Update dependencies** - Keep testing tools up to date
5. **Monitor performance** - Track test execution times

## Integration with External Services

### Codecov

Coverage data is automatically uploaded to Codecov for:
- Coverage trend tracking
- Pull request coverage comments
- Coverage badges and reports
- Historical coverage analysis

### GitHub Actions

The workflow provides:
- Test status checks for pull requests
- Artifact storage for test results
- Coverage reporting in pull requests
- Failure notifications and debugging information

## Environment Variables

The workflow uses GitHub environments for configuration:

- `VITE_HOST`: Application host (default: 127.0.0.1)
- `VITE_PORT`: Application port (default: 5173)
- `VITE_APP_TITLE`: Application title
- `VITE_APP_DESCRIPTION`: Application description
- `APP_URL`: Dynamic application URL constructed from VITE_HOST and VITE_PORT

### GitHub Environment Setup

1. **Create Environment**: Repository Settings → Environments → New environment
2. **Name**: `main` (matches workflow configuration)
3. **Add Variables**: Set all required environment variables

The workflow automatically:
1. Uses environment variables from GitHub environment
2. Constructs the dynamic URL for application testing
3. Passes environment variables to Cypress tests
4. Provides secure, centralized configuration management

See [GITHUB_ENVIRONMENTS.md](./GITHUB_ENVIRONMENTS.md) for detailed setup instructions.
