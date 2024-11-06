import type { Marketplace } from '../models';

export const panglobalbuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', '1'],
  ['weidian', '3'],
  ['taobao', '1'],
  ['1688', '2'],
]);

export const panglobalbuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(panglobalbuyMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate stringsm, This will get the latest marketplace of the original map.
