# DoKnowWhatToDo - Frontend

A modern, full-featured Kanban board application built with React and powered by TanStack Start. This frontend application provides an intuitive interface for task management and workflow automation.

## Overview

This project is a responsive, type-safe frontend application designed to work seamlessly with a Spring Boot GraphQL backend. Built with modern web technologies and best practices, it delivers a robust user experience with real-time data synchronization.

## Technology Stack

- **Framework:** TanStack Start (React)
- **Build Tool:** Vite
- **API Client:** Apollo Client (GraphQL)
- **Styling:** Tailwind CSS + Shadcn UI Components
- **Forms:** TanStack Form
- **Package Manager:** Yarn v4 (Plug'n'Play)
- **Language:** TypeScript

## Prerequisites

- Node.js v22 or higher
- Yarn v4 (managed via Corepack)

## Installation & Setup

### 1. Configure Yarn

Enable Corepack to ensure you're using the correct Yarn version:

```bash
corepack enable
```

### 2. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd doknowhatodo-frontend
yarn install
```

**Note:** This project uses Yarn Plug'n'Play, so you won't see a `node_modules` directory. Dependencies are stored as zipped files in `.yarn/cache`.

### 3. IDE Configuration

#### VS Code
Since Yarn PnP stores packages differently, you need to configure VS Code to find TypeScript definitions:

1. Open any `.ts` or `.tsx` file
2. Press `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows/Linux)
3. Select "TypeScript: Select TypeScript Version"
4. Choose "Use Workspace Version"

The TypeScript errors should resolve within a few seconds.

#### IntelliJ/WebStorm
The IDE should automatically detect Yarn PnP. Ensure:
- Node.js plugin is enabled
- Package manager is set to Yarn

### 4. Environment Configuration

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

If `.env.example` doesn't exist, create `.env` manually and add:

```
VITE_GRAPHQL_API_URL=http://localhost:8080/graphql
```

### 5. Start Development Server

```bash
yarn dev
```

The application will be available at `http://localhost:3000` (or the port Vite specifies).

## Available Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start the development server |
| `yarn build` | Build the application for production |
| `yarn start` | Run the production build locally |
| `yarn storybook` | Launch Storybook for component development and testing |

## Project Guidelines

### Package Management
- Use `yarn add <package>` to install dependencies
- Do not use `npm install`

### Routing
- Routes are defined in `src/routes/`
- The file `routeTree.gen.ts` is automatically generated and should not be manually edited
- New route files in `src/routes/` will automatically update the routing tree

### GraphQL
- All queries and mutations must be strongly typed
- Keep Apollo Client schema up to date with the backend
- Ensure type safety across all API interactions

## Architecture

The application follows a modular structure with clear separation of concerns:
- Components are organized by feature
- GraphQL operations are centralized
- Routes are automatically generated from file structure
- Styling is managed through Tailwind CSS with Shadcn UI components

## Contributing

When contributing to this project:
1. Follow the established directory structure
2. Maintain TypeScript strict mode compliance
3. Use the available command-line tools for development
4. Ensure all GraphQL operations are properly typed