export const resourceLinks = {
  request: '/requests',
  userCenter: '/profile',
  agentHub: '/agenthub',
  agentSpace: '/agentspace',
  question: '/faq',
  privacy: '/privacy',
  terms: "/terms",
  x402: "/x402",
  final: "/final-run",


  twitter: 'https://x.com/4ainet',
  telegram: 'https://t.me/rh4ai',
  discord: 'https://discord.gg/Pf6W8sJ5q4',
  github: 'https://github.com/4ainet/4AI-Agent-Space',
  link3: 'https://linktr.ee/4ainet',

  docs: 'https://docs.4ai.network',
  gitbook: 'https://docs.4ai.network',

  nebulaiNetwork: 'https://github.com/NebulaiNetwork',
};

export const requestDomain = process.env.NEXT_PUBLIC_REQUEST_DOMAIN!;

export const originDomain = process.env.NEXT_PUBLIC_ORIGIN_DOMAIN! || requestDomain;

export const cryptoRawKey = process.env.NEXT_PUBLIC_CRYPTO_RAW_KEY!;

export const authorizationKey = process.env.NEXT_PUBLIC_CRYPTO_AUTHORIZATION;

export const wallectConnectId = process.env.NEXT_PUBLIC_PROJECT_ID!

export const cooldownTime = 86400

export const timerNum = 15000
