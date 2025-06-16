import type { Marketplace } from '../models';

export const sifubuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', '2'],
  ['weidian', '4'],
  ['taobao', '2'],
  ['1688', '1'],
  ['xianyu', '5'],
]);

export const sifubuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(sifubuyMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate stringsm, This will get the latest marketplace of the original map.
