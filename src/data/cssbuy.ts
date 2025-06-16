import type { Marketplace } from '../models';

export const cssbuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', 'taobao'],
  ['weidian', 'micro'],
  ['taobao', 'taobao'],
  ['1688', '1688'],
  ['xianyu', 'xianyu'],
]);

export const cssbuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(cssbuyMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate stringsm, This will get the latest marketplace of the original map.
