import type { Marketplace } from '../models';

export const superbuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', 'TB'],
  ['weidian', 'WD'],
  ['taobao', 'TB'],
  ['1688', 'ALIBABA'],
  ['xianyu', 'XY'],
]);

export const superbuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(superbuyMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate strings, this will get the latest marketplace of the original map.
