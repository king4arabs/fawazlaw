# Mohamaa Monorepo

Monorepo starter that uses `Next.js` for the frontend and `Laravel` for the backend API.

## Structure

```text
apps/
  web/  -> Next.js frontend
  api/  -> Laravel backend
```

## Requirements

- Node.js 20+
- npm 10+
- PHP 8.3+
- Composer 2+

## Setup

```bash
npm install
composer install --working-dir=apps/api
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
php apps/api/artisan key:generate
php apps/api/artisan migrate
```

## Run

Run both apps together from the repo root:

```bash
npm run dev
```

This starts:

- Next.js on `http://localhost:3000`
- Laravel on `http://127.0.0.1:8000`

You can also run each side separately:

```bash
npm run dev:web
npm run dev:api
```

## Notes

- The Next.js homepage reads from Laravel at `/api/health`.
- Update `apps/web/.env.local` if your Laravel API runs on another URL.
