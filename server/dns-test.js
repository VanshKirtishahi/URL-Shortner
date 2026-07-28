import dns from "node:dns/promises";

try {
  const result = await dns.resolveSrv(
    "_mongodb._tcp.url-shortner.rkm4n9d.mongodb.net"
  );
  console.log(result);
} catch (err) {
  console.error(err);
}