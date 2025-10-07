# GitHub Environments Setup

> **📖 Documentation Index**: [README.md](README.md) | **🏠 Main Project**: [../README.md](../README.md)

This document explains how to configure GitHub environments for the Ride Safe application.

## Environment Variables

The application uses the following environment variables that need to be configured in GitHub environments:

### Required Variables

| Variable | Description | Default Value | Example |
|----------|-------------|---------------|---------|
| `VITE_HOST` | Application host address | `127.0.0.1` | `127.0.0.1` |
| `VITE_PORT` | Application port number | `5173` | `5173` |
| `VITE_APP_TITLE` | Application title | `Ride Safe - CarSharing App` | `Ride Safe - CarSharing App` |
| `VITE_APP_DESCRIPTION` | Application description | `CarSharing app with feature flags` | `CarSharing app with feature flags` |

## Setting Up GitHub Environment

### 1. Create Environment

1. Go to your GitHub repository
2. Navigate to **Settings** → **Environments**
3. Click **New environment**
4. Name it `main` (or any name you prefer)
5. Click **Configure environment**

### 2. Configure Environment Variables

1. In the environment configuration page, scroll down to **Environment variables**
2. Click **Add variable** for each required variable:

#### VITE_HOST
- **Name**: `VITE_HOST`
- **Value**: `127.0.0.1`

#### VITE_PORT
- **Name**: `VITE_PORT`
- **Value**: `5173`

#### VITE_APP_TITLE
- **Name**: `VITE_APP_TITLE`
- **Value**: `Ride Safe - CarSharing App`

#### VITE_APP_DESCRIPTION
- **Name**: `VITE_APP_DESCRIPTION`
- **Value**: `CarSharing app with feature flags for passenger and driver views`

### 3. Environment Protection Rules (Optional)

You can configure protection rules for the environment:

- **Required reviewers**: Require approval before deployment
- **Wait timer**: Add a delay before deployment
- **Deployment branches**: Restrict which branches can deploy to this environment

For CI/CD purposes, you typically don't need protection rules.

## How It Works

The GitHub Actions workflow now uses the environment variables from the GitHub environment instead of the `.env` file:

```yaml
e2e-tests:
  name: E2E Tests
  runs-on: ubuntu-latest
  environment: main  # ← Uses the 'main' environment
  
  steps:
    # ... other steps ...
    
    - name: Set environment variables
      run: |
        echo "APP_URL=http://${{ env.VITE_HOST }}:${{ env.VITE_PORT }}" >> $GITHUB_ENV
```

## Benefits

1. **Security**: Sensitive values are stored securely in GitHub
2. **Flexibility**: Different environments can have different configurations
3. **Version Control**: Environment variables are managed outside of code
4. **Audit Trail**: GitHub tracks changes to environment variables
5. **Team Access**: Team members can manage environment variables without code access

## Local Development

For local development, you can still use the `.env` file. The GitHub environment variables only affect the CI/CD pipeline.

## Troubleshooting

### Environment Not Found
If you get an error about the environment not being found:
1. Make sure the environment name in the workflow matches the environment name in GitHub
2. Check that the environment exists in your repository settings

### Variables Not Available
If environment variables are not available:
1. Verify the variable names match exactly (case-sensitive)
2. Check that the variables are set in the correct environment
3. Ensure the workflow has access to the environment

### Undefined Variables in Build/Preview
If you see `VITE_HOST: undefined` or `VITE_PORT: undefined` in the logs:
1. Make sure the environment variables are set in the GitHub environment
2. Check that the environment name in the workflow matches exactly
3. Verify the variables are passed to all relevant steps (build, preview, e2e)

### Permission Issues
If you get permission errors:
1. Make sure your GitHub account has access to manage environments
2. Check repository permissions
3. Verify the workflow has the necessary permissions
