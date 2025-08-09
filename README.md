# nitzan-portfolio
#!/bin/bash

# Create React Enterprise Application README.md
cat > ~/.claude-templates/react-template/README.md << 'EOF'
# React Enterprise Application

Built with Claude Code Enterprise Infrastructure.

## Quick Start

```bash
npm install
npm run dev
```

## Available Scripts

* `npm run dev` - Development server with Vite
* `npm run build` - Production build
* `npm run test` - Run tests with Vitest
* `npm run test:ui` - Run tests with UI
* `npm run lint` - Code linting and auto-fix
* `npm run lint:check` - Check code style only
* `npm run format` - Format code with Prettier
* `npm run typecheck` - TypeScript type checking
* `npm run validate` - Full quality check (types + lint + tests)
* `npm run storybook` - Component documentation
* `npm run build-storybook` - Build Storybook

## Architecture

* **Framework:** React 18 + Vite
* **Language:** JavaScript/TypeScript
* **Testing:** Vitest + React Testing Library
* **Styling:** CSS Modules
* **Quality:** ESLint + Prettier + TypeScript
* **Documentation:** Storybook

## Project Structure

* `src/components/` - Reusable UI components
* `src/pages/` - Page components
* `src/hooks/` - Custom React hooks
* `src/utils/` - Utility functions
* `src/styles/` - CSS files
* `tests/` - Test files

## Components

* **Button** - Reusable button component with variants
* **Home** - Main page component
* **App** - Root application component with routing

Built with ❤️ using Claude Code Enterprise System.
