# CleanDNS Tools: DNS lookup

DNS lookups for hostnames.

## Documentation

```typescript
import { dns } from "@cleandns/dns";

const records = await dns("google.com");```

## Installation

```
npm install @cleandns/dns
```

## Caveats / limitations

- This package is currently intended for **hostname** lookups only. IPv4/IPv6 addresses are not supported.
