# SDK Examples (Planned)

> All examples assume the SDK packages described in `javascript.md`, `python.md`, and `php.md` are published. None are released yet — these are reference shapes.

## List services in Arabic
**JS/TS**
```ts
const services = await client.services.list({ lang: "ar" });
```
**Python**
```python
services = client.services.list(lang="ar")
```
**PHP**
```php
$services = $client->services()->list(['lang' => 'ar']);
```

## Submit a contact
**JS/TS**
```ts
await client.contact.submit({ name, phone, message });
```
**Python**
```python
client.contact.submit(name=name, phone=phone, message=message)
```
**PHP**
```php
$client->contact()->submit(compact('name', 'phone', 'message'));
```

## Handle a rate-limit error
**JS/TS**
```ts
try { await client.contact.submit({ ... }); }
catch (e) {
  if (e instanceof FawazlawApiError && e.code === "rate.limited") {
    await sleep(parseInt(e.headers["retry-after"] ?? "5", 10) * 1000);
  } else { throw e; }
}
```
