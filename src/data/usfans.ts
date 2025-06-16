import type { Marketplace } from '../models';

export const usfansMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', '2'],
  ['weidian', '3'],
  ['taobao', '2'],
  ['1688', '1'],
  ['xianyu', '4'],
]);

export const usfansStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(usfansMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate stringsm, This will get the latest marketplace of the original map.
