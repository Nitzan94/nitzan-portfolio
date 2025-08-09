# Contributing Guidelines

Thank you for contributing to this project! Please follow these guidelines to ensure smooth collaboration.

## 🚀 Quick Start

1. **Fork & Clone**
   ```bash
   git clone https://github.com/username/project-name.git
   cd project-name
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Copy Environment**
   ```bash
   cp .env.example .env.local
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## 🔧 Development Workflow

### Branch Strategy
- `main` - Production ready code
- `develop` - Integration branch
- `feature/[name]` - New features
- `fix/[name]` - Bug fixes
- `hotfix/[name]` - Critical fixes

### Making Changes

1. **Create Branch**
   ```bash
   git checkout -b feature/awesome-feature
   ```

2. **Make Changes**
   - Follow code style guidelines
   - Add tests for new functionality
   - Update documentation

3. **Validate Changes**
   ```bash
   npm run validate  # Runs typecheck + lint + tests
   ```

4. **Commit Changes**
   ```bash
   git commit -m "feat: add awesome feature"
   ```
   
   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `style:` - Code formatting
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance

5. **Push & Pull Request**
   ```bash
   git push origin feature/awesome-feature
   ```

## 📝 Code Standards

### TypeScript
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Avoid `any` type

### React
- Use functional components with hooks
- Follow React best practices
- Use proper prop types

### Testing
- Write tests for all new features
- Maintain >90% test coverage
- Use descriptive test names

### Styling
- Use CSS modules or styled-components
- Follow BEM methodology for CSS classes
- Ensure responsive design

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## 📋 Pull Request Checklist

- [ ] Code follows project standards
- [ ] Tests are added and passing
- [ ] Documentation is updated
- [ ] All checks pass (lint, typecheck, tests)
- [ ] PR has descriptive title and description
- [ ] Breaking changes are documented

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - Detailed steps
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment** - OS, browser, Node.js version
6. **Screenshots** - If applicable

## 💡 Feature Requests

For feature requests, please:

1. Check existing issues first
2. Provide clear use case
3. Explain the benefit
4. Suggest implementation approach (if possible)

## 📞 Getting Help

- Check the documentation in `/docs`
- Search existing issues
- Ask in discussions
- Contact maintainers

Happy coding! 🎉