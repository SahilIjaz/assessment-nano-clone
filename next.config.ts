import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "@libsql/core", "@libsql/hrana-client", "@libsql/isomorphic-ws", "@libsql/isomorphic-fetch", "libsql", "nodemailer"],
  async redirects() {
    return [
      // Legal documents are PDFs on the original site as well.
      { source: "/privacy", destination: "/PRIVACY.pdf", permanent: false },
      { source: "/terms", destination: "/NAANO-Terms-of-Sale-and-Use-FlatFee-v2.1-EN.pdf", permanent: false },
    ];
  },
};

export default nextConfig;
