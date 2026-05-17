# API Examples

> Replace `https://api.fawazlaw.sa/api/v1` with your local URL during development.

## List services
```bash
curl -sS https://api.fawazlaw.sa/api/v1/services?lang=ar
```

## Get a service by slug
```bash
curl -sS https://api.fawazlaw.sa/api/v1/services/corporate-law?lang=ar
```

## Submit a contact form
```bash
curl -sS -X POST https://api.fawazlaw.sa/api/v1/contact \
  -H 'Content-Type: application/json' \
  -d '{ "name": "Sara", "phone": "+9665XXXXXXXX", "message": "I need a consultation." }'
```

## Authenticate (admin)
```bash
curl -sS -X POST https://api.fawazlaw.sa/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{ "email": "admin@fawazlaw.sa", "password": "********" }'
```

## Authenticated admin call
```bash
curl -sS https://api.fawazlaw.sa/api/v1/admin/services \
  -H "Authorization: Bearer $TOKEN"
```

## Initiate a payment
```bash
curl -sS -X POST https://api.fawazlaw.sa/api/v1/payments/initiate \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: 8c1a...UUID' \
  -d '{ "amount": 500.00, "currency": "SAR", "purpose": "consultation" }'
```
