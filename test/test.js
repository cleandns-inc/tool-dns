import { dns } from "../dist/index.js";

const dom = process.argv[2] || 'ficofacil.com'; // a known malicious domain that some firewalls will attempt to block lookups on

(async () => {
    await dns(dom).then(({ A, errors }) => {
      console.log({ vanilla: { A, errors: errors.filter(({ query }) => query === 'A')}})
    });

    await dns(dom, { dnsOverHttps: true }).then(({ A, errors }) => {
      console.log({ doh: { A, errors: errors.filter(({ query }) => query === 'A')}})
    });

    await dns(dom, { defaultServers: true }).then(({ A, errors }) => {
      console.log({ defaultServers: { A, errors: errors.filter(({ query }) => query === 'A')}})
    });

    process.exit(0);
})();
