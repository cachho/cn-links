import type { Marketplace } from '../models';

export const hipobuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', '1'],
  ['weidian', '2'],
  ['taobao', '1'],
  ['1688', '0'],
]);

export const hipobuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(hipobuyMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate strings, This will get the latest marketplace of the original map.
