import type { Marketplace } from '../models';

export const acbuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', 'TB'],
  ['weidian', 'WD'],
  ['taobao', 'TB'],
  ['1688', 'AL'],
  ['xianyu', 'XY'],
]);

export const acbuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(acbuyMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate stringsm, This will get the latest marketplace of the original map.
