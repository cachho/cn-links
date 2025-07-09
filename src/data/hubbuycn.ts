import type { Marketplace } from '../models';

export const hubbuycnMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', 'taobao'],
  ['weidian', 'micro'],
  ['taobao', 'taobao'],
  ['1688', '1688'],
]);

export const hubbuycnStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(hubbuycnMarketplaceStrings).map(([key, value]) => [value, key])
);
