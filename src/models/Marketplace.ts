export const marketplaces = ['weidian', 'taobao', '1688', 'tmall'] as const;
export const marketplacesWithTld = [
  'weidian.com',
  'taobao.com',
  '1688.com',
  'tmall.com',
] as const;

export type Marketplace = (typeof marketplaces)[number];
export type MarketplaceWithTld = (typeof marketplacesWithTld)[number];
