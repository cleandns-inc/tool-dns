global {
  namespace NodeJS {
    interface ProcessEnv {
    }
  }
}

export type DnsParameters = {
  tries?: number;
  timeout?: number;
  servers?: string[];
}

export type DnsResponse = {
  A: string[];
  AAAA: string[];
  NS: string[];
  MX: {
    priority: number;
    exchange: string;
  }[];
  TXT: string[];
  SOA: Partial<{
    nsname: string;
    hostmaster: string;
    serial: number;
    refresh: number;
    retry: number;
    expire: number;
    minttl: number;
  }>;
  errors: {
    query: string;
    code: string;
  }[];
}
