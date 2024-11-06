import type { Marketplace } from '../models';

export const lovegobuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', 'taobao'],
  ['weidian', 'weidian'],
  ['taobao', 'taobao'],
  ['1688', 'ali_1688'],
]);

export const lovegobuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(lovegobuyMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate stringsm, This will get the latest marketplace of the original map.
