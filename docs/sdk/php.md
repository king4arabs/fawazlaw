# PHP SDK (Planned)

## Package
- Name: `fawazlaw/sdk` (Packagist).
- Target: PHP 8.2+.
- PSR-12, PSR-18 (HTTP client), PSR-17 (HTTP factories).

## Surface (sketch)
```php
use Fawazlaw\Sdk\Client;

$client = new Client([
    'base_url' => 'https://api.fawazlaw.sa/api/v1',
    'token'    => getenv('FAWAZLAW_TOKEN'),
    'lang'     => 'ar',
]);

$services = $client->services()->list();
$service  = $client->services()->get('corporate-law');

$client->contact()->submit([
    'name'    => 'Sara',
    'phone'   => '+9665XXXXXXXX',
    'message' => 'I need a consultation.',
]);
```

## Errors
The SDK throws `Fawazlaw\Sdk\Exception\ApiException` subclasses mapping the API envelope.

## Auth
Static token by default; pluggable token provider.

## Distribution
Generated from OpenAPI via `jane-php/open-api-3`, then hand-polished. Published via GitHub Actions on a release tag.
