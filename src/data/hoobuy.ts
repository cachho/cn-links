import type { Marketplace } from '../models';

export const hoobuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', '1'],
  ['weidian', '2'],
  ['taobao', '1'],
  ['1688', '0'],
]);

export const hoobuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(hoobuyMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate stringsm, This will get the latest marketplace of the original map.
