import type { Marketplace } from '../../models';

const array: Array<[Marketplace, string]> = [
  ['tmall', '1'],
  ['taobao', '1'],
  ['1688', '0'],
  ['weidian', '2'],
  ['weidian', 'weidian'],
];

export const oopbuyMarketplaceStrings = new Map<Marketplace, string>(array);

export const oopbuyStringsMarketplaces = new Map<string, Marketplace>(
  array.map(([key, value]) => [value, key])
);

// Now you can access all Marketplaces associated with a particular key
console.log(oopbuyStringsMarketplaces);
// Map(3) { '1' => ['tmall', 'taobao'], '0' => ['1688'], '2' => ['weidian'], 'weidian' => ['weidian'] }
