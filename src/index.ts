import { Resolver } from "dns/promises";
import { DnsParameters, DnsResponse } from "../dns.js";

export async function dns(
  target: string,
  {
    tries = 3,
    timeout = 1000,
    servers = ["8.8.8.8", "1.1.1.1"],
  }: DnsParameters = {}
): Promise<DnsResponse> {
  const DNS = new Resolver({ tries, timeout });
  DNS.setServers(servers);

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
      .then((r) => {
        record.A = r;
      })
      .catch((err) => {
        record.errors.push({ query: "A", code: err.code });
      }),
    DNS.resolve6(target)
      .then((r) => {
        record.AAAA = r;
      })
      .catch((err) => {
        record.errors.push({ query: "AAAA", code: err.code });
      }),
    DNS.resolveNs(target)
      .then((r) => {
        record.NS = r;
      })
      .catch((err) => {
        record.errors.push({ query: "NS", code: err.code });
      }),
    DNS.resolveMx(target)
      .then((r) => {
        record.MX = r;
      })
      .catch((err) => {
        record.errors.push({ query: "MX", code: err.code });
      }),
    DNS.resolveTxt(target)
      .then((r) => {
        record.TXT = r.map((txt) => txt.join(""));
      })
      .catch((err) => {
        record.errors.push({ query: "TXT", code: err.code });
      }),
    DNS.resolveSoa(target)
      .then((r) => {
        record.SOA = r;
      })
      .catch((err) => {
        record.errors.push({ query: "SOA", code: err.code });
      }),
  ]);

  return record;
}
