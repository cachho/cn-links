import type { Marketplace } from '../models';

export const pandabuyMarketplaceStrings = new Map<Marketplace, string>([
  ['tmall', 'taobao'],
  ['weidian', 'wd'],
  ['taobao', 'taobao'],
  ['1688', 'alibaba'],
  ['xianyu', 'xianyu'],
]);

export const pandabuyStringsMarketplaces = new Map<string, Marketplace>(
  Array.from(pandabuyMarketplaceStrings).map(([key, value]) => [value, key])
);
