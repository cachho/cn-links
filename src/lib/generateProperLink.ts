import type { Marketplace } from '../models';

export function generateProperLink(
  marketplace: Marketplace,
  id: string
): string {
  if (marketplace === 'weidian') {
    const urlParams = new URLSearchParams();
    urlParams.set('itemID', id);
    return `https://weidian.com/item.html?${urlParams.toString()}`;
  }
  if (marketplace === 'taobao') {
    const urlParams = new URLSearchParams();
    urlParams.set('id', id);
    return `https://item.taobao.com/item.html?${urlParams.toString()}`;
  }
  if (marketplace === '1688') {
    // https://detail.1688.com/offer/669220179358.html
    return `https://detail.1688.com/offer/${id}.html`;
  }
  if (marketplace === 'tmall') {
    const urlParams = new URLSearchParams();
    urlParams.set('id', id);
    return `https://detail.tmall.com/item_o.htm?${urlParams.toString()}`;
  }
  return '';
}
