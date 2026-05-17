# Webhooks

## Inbound: MyFatoorah
Payment status updates arrive at `POST /api/v1/webhooks/myfatoorah`.

### Verification
- Verify the signature header against the shared secret before processing.
- Reject any request whose signature does not validate; respond with `401`.

### Idempotency
- MyFatoorah may retry. Persist `invoice_id` and the event hash; ignore duplicates.

### Processing
- Treat the webhook as the **source of truth** for payment state.
- Update the local payment record in a transaction.
- Append an audit row for the state transition.

### Failure Handling
- Return `2xx` only when the event has been durably stored.
- For transient processing errors, return `5xx` so MyFatoorah retries.
- Move events to a dead-letter queue after N (configurable) failed attempts; page the on-call.

## Outbound (planned)
- Client portal events (new message, document uploaded, matter updated) will be exposed as outbound webhooks for enterprise integrations.
- Outbound webhooks will sign each delivery with an HMAC of the body using a per-subscriber secret, include `X-Fawazlaw-Signature`, `X-Fawazlaw-Event`, and `X-Fawazlaw-Delivery` headers, and retry with exponential backoff.

## Local Testing
Use ngrok to expose a local development server and point the MyFatoorah sandbox to the ngrok URL.
