# Deployment Guide

> **📖 Documentation Index**: [README.md](README.md) | **🏠 Main Project**: [../README.md](../README.md)

## GitHub Pages Deployment

This application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### How it works

1. **Automatic Deployment**: The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys the application when:
   - Code is pushed to the `main` branch
   - A pull request is opened against the `main` branch

2. **Build Process**: 
   - Installs dependencies with `npm ci`
   - Builds the application with `npm run build`
   - Uploads the built files to GitHub Pages

3. **Access**: The application will be available at:
   - `https://[your-username].github.io/ride_safe/`
   - Local development: `http://127.0.0.1:4174/ride_safe/`

### Manual Deployment

If you need to deploy manually:

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

2. **Trigger Deployment**:
   - Push changes to the `main` branch
   - Or manually trigger the workflow from the Actions tab

### Environment Variables

The deployment uses the following environment variables (with defaults):
- `VITE_HOST`: `127.0.0.1`
- `VITE_PORT`: `5173`
- `VITE_APP_TITLE`: `Ride Safe - CarSharing App`
- `VITE_APP_DESCRIPTION`: `CarSharing app with feature flags for passenger and driver views`

### Troubleshooting

- **Build Failures**: Check the Actions tab for build logs
- **404 Errors**: Ensure the base path is correctly set in `vite.config.ts`
- **Environment Issues**: Verify environment variables are set correctly

### Local Testing

To test the production build locally:

```bash
npm run build
npm run preview
```

The application will be available at `http://127.0.0.1:4174/ride_safe/` with the same configuration as the deployed version.
