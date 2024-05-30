import type { Marketplace } from '../../models';

export const kameymallMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', '1'],
  ['weidian', '7'],
  ['taobao', '1'],
  ['1688', '4'],
]);

export const kameymallStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(kameymallMarketplaceStrings).map(([key, value]) => [value, key])
);
// For duplicate stringsm, This will get the latest marketplace of the original map.
