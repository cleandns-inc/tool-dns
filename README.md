# CleanDNS Tools: DNS lookup

DNS lookups for hostnames.

## Documentation

### `dns(target: string, options?: DnsParameters): Promise<DnsResponse>`

Performs DNS resolution for a given hostname using specified or default DNS servers.

### Parameters

- `target` (string): The hostname to resolve.
- `options` (DnsParameters): Optional parameters for DNS resolution.
  - `tries` (number): Number of attempts for each DNS query (default: 3).
  - `timeout` (number): Timeout for each DNS query in milliseconds (default: 1000).
  - `servers` (string[]): Array of DNS server IP addresses to use (default: shuffled list of predefined servers).

### Returns

- `Promise<DnsResponse>`: A promise that resolves to a `DnsResponse` object containing the DNS records and any errors encountered.

### DnsResponse

An object containing the resolved DNS records and any errors encountered.

- `A` (string[]): Array of IPv4 addresses.
- `AAAA` (string[]): Array of IPv6 addresses.
- `MX` ({ priority: number; exchange: string }[]): Array of MX records.
- `NS` (string[]): Array of NS records.
- `TXT` (string[]): Array of TXT records.
- `SOA` (object): SOA record.
- `errors` ({ query: string; code: string }[]): Array of errors encountered during DNS resolution.

### Example

```typescript
import { dns } from '@cleandns/dns';

dns('example.com', { tries: 5, timeout: 2000 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Installation

```
npm install @cleandns/dns
```

## Caveats / limitations

- This package is currently intended for **hostname** lookups only. IPv4/IPv6 addresses are not supported.
