# Getting Started

Welcome to Fawazlaw.sa. This guide gets a new contributor productive in under an hour.

## 1. Clone and Inspect
```bash
git clone https://github.com/king4arabs/fawazlaw.git
cd fawazlaw
```
Read in order:
1. `README.md`
2. `ARCHITECTURE.md`
3. The `SKILLS/` file for your discipline
4. `SECURITY.md` and `SKILLS/security.md`

## 2. Set Up the Frontend
```bash
cd UI-WEB/frontend
npm install
npm start            # http://localhost:3000
```

## 3. Set Up the Node API (prototype)
```bash
cd API-Node
npm install
# Configure environment variables (Mongo URI, JWT secret, etc.) via your own .env
node index.js
```

## 4. Set Up the Laravel API
```bash
cd API-BACKEND/api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve    # http://localhost:8000
```

## 5. Run Validation
```bash
cd UI-WEB/frontend
CI=true npm test -- --watchAll=false --passWithNoTests
CI=false npm run build
npm audit --audit-level=high
```

## 6. Make Your First Change
- Branch off `main`: `git checkout -b feat/<short-description>`
- Keep edits focused; one logical change per commit.
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `security:`, `test:`).
- Update `CHANGELOG.md` for user-visible changes.
- Open a PR; request review from the relevant discipline owner (see `OPERATIONS.md`).

## 7. Where to Ask
- Architecture / standards questions: open an issue with the `discussion` label.
- Security questions: email `security@fawazlaw.sa` (to be configured).
- Legal/compliance questions: route through the Compliance Advisor; do not improvise.
