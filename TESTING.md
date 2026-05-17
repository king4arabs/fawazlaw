# Testing

## Commands
Frontend:
- `npm install`
- `CI=false npm run build`
- `CI=true npm test -- --watchAll=false`
- `npm audit --audit-level=high`

## Current Notes
The repository has pre-existing frontend lint/build warnings and dependency audit findings. CI also appears configured at repository root while the React app lives in `UI-WEB/frontend`.
