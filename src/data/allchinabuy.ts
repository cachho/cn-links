import type { Marketplace } from '../models';

export const allchinabuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', 'TB'],
  ['weidian', 'WD'],
  ['taobao', 'TB'],
  ['1688', 'ALIBABA'],
]);

export const allchinabuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(allchinabuyMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate stringsm, This will get the latest marketplace of the original map.
