import { Resolver } from "dns/promises";
import { DnsParameters, DnsResponse } from "../dns.js";
export { DnsResponse };

const dnsServers = [
  '1.1.1.1', '1.0.0.1', // Cloudflare
  '8.8.8.8', '8.8.4.4', // Google
  '9.9.9.9', '149.112.112.112', // Quad9
  '208.67.222.222', '208.67.220.220', // OpenDNS
  '185.228.168.9', '185.228.169.9', // CleanBrowsing
];

export async function dns(
  target: string,
  {
    tries = 3,
    timeout = 1000,
    servers,
  }: DnsParameters = {}
): Promise<DnsResponse> {
  const DNS = new Resolver({ tries, timeout });
  DNS.setServers(servers || shuffle(dnsServers));

  const record: DnsResponse = {
    A: [],
    AAAA: [],
    MX: [],
    NS: [],
    TXT: [],
    SOA: {},
    errors: [],
  };

  await Promise.all([
    DNS.resolve4(target)
      .then((r: string[]) => {
        record.A = r;
      })
      .catch((err) => {
        record.errors.push({ query: "A", code: err.code });
      }),
    DNS.resolve6(target)
      .then((r: string[]) => {
        record.AAAA = r;
      })
      .catch((err) => {
        record.errors.push({ query: "AAAA", code: err.code });
      }),
    DNS.resolveNs(target)
      .then((r: string[]) => {
        record.NS = r;
      })
      .catch((err) => {
        record.errors.push({ query: "NS", code: err.code });
      }),
    DNS.resolveMx(target)
      .then((r: { priority: number; exchange: string }[]) => {
        record.MX = r;
      })
      .catch((err) => {
        record.errors.push({ query: "MX", code: err.code });
      }),
    DNS.resolveTxt(target)
      .then((r: string[][]) => {
        record.TXT = r.map((txt) => txt.join(""));
      })
      .catch((err) => {
        record.errors.push({ query: "TXT", code: err.code });
      }),
    DNS.resolveSoa(target)
      .then((r: object) => {
        record.SOA = r;
      })
      .catch((err) => {
        record.errors.push({ query: "SOA", code: err.code });
      }),
  ]);

  return record;
}

function shuffle (array: any[]) {
  const copy = [...array];
  const shuffled: any[] = [];

  while (copy.length) {
    const index = Math.floor(Math.random() * copy.length);
    shuffled.push(copy.splice(index, 1)[0]);
  }

  return shuffled;
}