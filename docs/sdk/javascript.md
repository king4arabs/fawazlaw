# JavaScript / TypeScript SDK (Planned)

## Package
- Name: `@fawazlaw/sdk` (npm, scoped under the firm's npm org once registered).
- Targets: Node 18+, modern browsers.
- Module formats: ESM + CJS, with TypeScript types.

## Surface (sketch)
```ts
import { FawazlawClient } from "@fawazlaw/sdk";

const client = new FawazlawClient({
  baseUrl: "https://api.fawazlaw.sa/api/v1",
  token: process.env.FAWAZLAW_TOKEN,
  lang: "ar",
});

const services = await client.services.list();
const service = await client.services.get("corporate-law");

await client.contact.submit({
  name: "Sara",
  phone: "+9665XXXXXXXX",
  message: "I need a consultation.",
});
```

## Errors
The SDK throws typed errors that wrap the API error envelope (`FawazlawApiError`), with `code`, `message`, `details`, and `requestId`.

## Auth
- Static token via constructor.
- Pluggable token provider for refresh-token flows.

## Distribution
- Generated from OpenAPI via `openapi-typescript-codegen` or `orval`, then hand-polished.
- Published via GitHub Actions on a release tag.
