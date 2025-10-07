# Test Coverage

This project automatically collects test coverage from unit tests (Vitest) and end-to-end tests (Cypress) whenever you run tests.

## Coverage Collection

### Unit Test Coverage (Vitest)

Unit test coverage is automatically collected using Vitest's built-in coverage provider with V8.

**Configuration:**
- Provider: V8
- Thresholds: 80% for branches, functions, lines, and statements
- Reports: text, json, html, lcov
- Output: `coverage/unit/`
- **Enabled by default** - No special commands needed

**Commands:**
```bash
# Run unit tests with coverage (automatic)
npm run test

# Run unit tests with coverage UI (automatic)
npm run test:ui

# Run unit tests in CI mode (automatic)
npm run test:run
```

### E2E Test Coverage (Cypress)

E2E test coverage is automatically collected using `@cypress/code-coverage` with Istanbul.

**Configuration:**
- Plugin: `@cypress/code-coverage`
- Instrumentation: `vite-plugin-istanbul`
- Output: `coverage/e2e/`
- **Enabled by default** - No special commands needed

**Commands:**
```bash
# Run E2E tests with coverage (automatic)
npm run e2e

# Open Cypress with coverage (automatic)
npm run e2e:open

# Run E2E tests in CI mode (automatic)
npm run e2e:ci
```

## Coverage Reports

> **📖 Documentation Index**: [README.md](README.md) | **🏠 Main Project**: [../README.md](../README.md)

Coverage reports are automatically generated whenever you run tests.

### Unit Test Coverage
- **Location:** `coverage/unit/`
- **HTML Report:** `coverage/unit/index.html`
- **LCOV Report:** `coverage/unit/lcov.info`

### E2E Test Coverage
- **Location:** `coverage/e2e/`
- **HTML Report:** `coverage/e2e/index.html`
- **LCOV Report:** `coverage/e2e/lcov.info`

## Coverage Thresholds

The following coverage thresholds are enforced:

| Metric | Threshold |
|--------|-----------|
| Branches | 80% |
| Functions | 80% |
| Lines | 80% |
| Statements | 80% |

## Excluded Files

The following files are excluded from coverage:

- Test files: `**/*.test.{ts,tsx}`, `**/*.spec.{ts,tsx}`
- Test directories: `**/__tests__/**/*`, `src/test/**/*`
- Type definitions: `**/*.d.ts`
- Story files: `**/*.stories.{ts,tsx}`
- Config files: `**/*.config.{ts,tsx}`

## CI/CD Integration

### GitHub Actions

Coverage reports can be uploaded to services like Codecov or Coveralls:

```yaml
- name: Run tests with coverage
  run: npm run coverage:all

- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/merged/lcov.info
```

### Coverage Badges

Add coverage badges to your README:

```markdown
[![Coverage](https://codecov.io/gh/username/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/username/repo)
```

## Troubleshooting

### Common Issues

1. **Coverage not collected in E2E tests:**
   - Ensure `@cypress/code-coverage/support` is imported in `cypress/support/e2e.ts`
   - Verify `vite-plugin-istanbul` is configured in `vite.config.ts`
   - Coverage is now enabled by default - no special configuration needed

2. **Coverage thresholds failing:**
   - Check if new code is properly tested
   - Review excluded files in configuration
   - Adjust thresholds if needed

3. **Coverage merge failing:**
   - Ensure both unit and E2E coverage reports exist
   - Check that `.nycrc.json` is properly configured
   - Verify nyc is installed globally or locally

### Debug Commands

```bash
# Check coverage configuration
npx vitest run --coverage --reporter=verbose

# Debug Cypress coverage
npx cypress run --config-file vite.config.coverage.ts --browser chrome

# Check nyc configuration
npx nyc --help
```

## Best Practices

1. **Write comprehensive tests** - Aim for high coverage with meaningful tests
2. **Review coverage reports** - Focus on uncovered critical paths
3. **Maintain thresholds** - Keep coverage requirements realistic but meaningful
4. **Regular updates** - Update coverage configuration as the project grows
5. **CI integration** - Include coverage checks in your CI pipeline
