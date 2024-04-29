# Client Manager

Welcome to the `Client Manager` application. This client-side application is built with _React_, _Express_, and _Postgres_, designed for managing client information efficiently with functionalities that include searching clients by name, editing client details, and deleting client records.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v18.17.1)
- Yarn package manager
- Docker

These prerequisites are necessary to install and run the application.

## Installation and Usage for Frontend

To Install:

```bash
# Clone the repository
git clone https://github.com/purecodework/client-manager.git
```

Follow these steps to get the application up and running on your local machine:

```bash
# From the root directory, Navigate to the frontend project directory
cd client-manager/client-manager-frontend

# Install dependencies
yarn

# After installation, you can start the application using the following command:

yarn dev
```

This will launch the front end application on `localhost:3000` where you can interact with the UI to manage client data.

## Installation and Usage for Backend

Follow these steps to get the application up and running on your local machine:

```bash
# From the root directory, Navigate to the frontend project directory
cd client-manager/client-manager-server

# Install dependencies
yarn

# After installation, you can start the application using the following command:

docker compose up
```

.

## Future Roadmap

1. Robust Testing: Comprehensive unit (_Jest_, _React Testing Library_) and E2E (_Cypress_) tests.
2. Refined Styling: CSS Modules and mixins for maintainable, component-oriented styles.
3. State Management: As our business logic grows, we may consider integrating _Redux_ or _React Query_ to manage more complex state.
4. CI/CD: Build pipeline App with AWS pipleine and delpoy with _ECR_ and _Fargate_.
5. Other AWS Services in considering: _load balancer_, _RDS_, and _Elastic Cache_.

## License

Distributed under the MIT License. See `LICENSE` for more information.
