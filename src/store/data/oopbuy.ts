import type { Marketplace } from '../../models';

export const oopbuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', '1'],
  ['weidian', 'weidian'],
  ['taobao', '1'],
  ['1688', '0'],
]);

export const oopbuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(oopbuyMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate stringsm, This will get the latest marketplace of the original map.
