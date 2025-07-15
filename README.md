# Todo Next.js App

This is a simple Next.js application for managing todos, backed by a PostgreSQL database using `sequelize-typescript`.

## Setup
1. Install dependencies (requires internet access):
   ```bash
   npm install
   ```
2. Configure database connection using environment variables:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`

## Docker Compose
To run the app along with a local PostgreSQL instance, use Docker Compose:

```bash
docker-compose up --build
```

The application will be available at http://localhost:3000.

The PostgreSQL service exposes port `5432`, allowing you to connect for
debugging purposes using tools like `psql` or graphical clients.

## Development
Start the development server:
```bash
npm run dev
```

The API endpoints live under `pages/api/todos`. They use `sequelize-typescript` models from the `models` directory.
