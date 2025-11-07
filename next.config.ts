import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      // ... Seus padrões existentes
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    // ⚠️ Adicione esta linha com CAUTELA, apenas para o domínio específico
    dangerouslyAllowSVG: true, 
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
