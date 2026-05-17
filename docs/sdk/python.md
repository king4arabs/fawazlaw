# Python SDK (Planned)

## Package
- Name: `fawazlaw` (PyPI).
- Target: Python 3.10+.
- Distribution: wheel + sdist.

## Surface (sketch)
```python
from fawazlaw import FawazlawClient

client = FawazlawClient(
    base_url="https://api.fawazlaw.sa/api/v1",
    token=os.environ["FAWAZLAW_TOKEN"],
    lang="ar",
)

services = client.services.list()
service = client.services.get("corporate-law")

client.contact.submit(
    name="Sara",
    phone="+9665XXXXXXXX",
    message="I need a consultation.",
)
```

## Errors
The SDK raises `FawazlawApiError` subclasses (`AuthError`, `ValidationError`, `RateLimitError`, `ServerError`).

## Auth
Static token by default; pluggable token provider for refresh flows.

## Distribution
Generated from OpenAPI via `openapi-python-client`, then hand-polished. Published via GitHub Actions on a release tag.
