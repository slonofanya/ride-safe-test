# Ride Safe - CarSharing App

A modern React-based CarSharing application with feature flags for passenger and driver views, built with Vite, TypeScript, and Ant Design Mobile.

## 🚀 Local Development

- **Development Server**: `http://localhost:5173/ride_safe/`
- **Preview Server**: `http://127.0.0.1:4173/ride_safe/`

## ✨ Features

- **Feature Flags**: Toggle between passenger and driver views
- **Responsive Design**: Mobile-first approach with Ant Design Mobile
- **Modern Stack**: React 18, TypeScript, Vite
- **Testing**: Comprehensive unit and E2E test coverage
- **CI/CD**: Automated testing with GitHub Actions
- **Code Quality**: ESLint for code quality and consistency

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Ant Design Mobile
- **Routing**: React Router DOM
- **Testing**: Vitest, Cypress, Testing Library
- **Build Tool**: Vite
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/username/ride_safe.git
cd ride_safe

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/ride_safe/`

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run unit tests with coverage
npm run test:ui          # Run tests with UI
npm run e2e              # Run E2E tests
npm run e2e:open         # Open Cypress test runner

# Code Quality
npm run lint             # Run ESLint
```

## 📁 Project Structure

```
ride_safe/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/            # React contexts (FeatureFlagContext)
│   ├── pages/               # Main application pages
│   ├── types/               # TypeScript type definitions
│   └── test/                # Test utilities and setup
├── cypress/                 # E2E tests
├── docs/                    # Documentation
├── scripts/                 # Build and deployment scripts
└── .github/workflows/       # GitHub Actions workflows
```

## 🧪 Testing

This project includes comprehensive testing at multiple levels:

### Unit Tests

- **Framework**: Vitest
- **Location**: `src/**/*.test.{ts,tsx}`
- **Command**: `npm run test`
- **UI Mode**: `npm run test:ui`

### E2E Tests

- **Framework**: Cypress
- **Location**: `cypress/e2e/`
- **Command**: `npm run e2e`
- **Open Mode**: `npm run e2e:open`

### Code Quality

- **Linting**: ESLint with TypeScript support
- **Command**: `npm run lint`

## 📚 Documentation

- **[Environment Configuration](docs/ENVIRONMENT.md)** - Environment variables setup
- **[GitHub Environments](docs/GITHUB_ENVIRONMENTS.md)** - GitHub-specific configuration

## 🔧 Configuration

### Environment Variables

| Variable               | Description             | Default                             |
| ---------------------- | ----------------------- | ----------------------------------- |
| `VITE_HOST`            | Development server host | `127.0.0.1`                         |
| `VITE_PORT`            | Development server port | `5173`                              |
| `VITE_APP_TITLE`       | Application title       | `Ride Safe - CarSharing App`        |
| `VITE_APP_DESCRIPTION` | Application description | `CarSharing app with feature flags` |

### Base Path

The application uses `/ride_safe/` as the base path for consistent behavior across different environments.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

1. **Code**: Make your changes
2. **Test**: Run `npm run test` to ensure all tests pass
3. **Lint**: Run `npm run lint` to check code quality
4. **Commit**: Use conventional commit messages
5. **Push**: Push to your feature branch
6. **PR**: Create a pull request

## 📊 CI/CD Pipeline

The project uses GitHub Actions for continuous integration:

- **Unit Tests**: Run on every push and PR
- **E2E Tests**: Run on every push and PR
- **Linting**: Code quality checks on every push and PR

## 🐛 Troubleshooting

### Common Issues

1. **White Screen**: Ensure you're accessing the correct URL with `/ride_safe/` path
2. **Asset 404 Errors**: Check that the base path is correctly configured
3. **Build Failures**: Verify all environment variables are set correctly
4. **Test Failures**: Run `npm run test` to see detailed error messages

### Getting Help

- Check the [documentation](docs/) for detailed guides
- Review the [GitHub Issues](https://github.com/username/ride_safe/issues) for known problems
- Create a new issue if you encounter a bug

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Ant Design Mobile](https://mobile.ant.design/) - UI components
- [Cypress](https://www.cypress.io/) - E2E testing
- [Vitest](https://vitest.dev/) - Unit testing

---

**Built with ❤️ using modern web technologies**

