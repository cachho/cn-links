import type { Marketplace } from '../models';

export function generateProperLink(marketplace: Marketplace, id: string): URL {
  if (marketplace === 'weidian') {
    const urlParams = new URLSearchParams();
    urlParams.set('itemID', id);
    return new URL(`https://weidian.com/item.html?${urlParams.toString()}`);
  }
  if (marketplace === 'taobao') {
    const urlParams = new URLSearchParams();
    urlParams.set('id', id);
    return new URL(`https://item.taobao.com/item.html?${urlParams.toString()}`);
  }
  if (marketplace === '1688') {
    return new URL(`https://detail.1688.com/offer/${id}.html`);
  }
  if (marketplace === 'tmall') {
    const urlParams = new URLSearchParams();
    urlParams.set('id', id);
    return new URL(
      `https://detail.tmall.com/item_o.htm?${urlParams.toString()}`
    );
  }

  throw new Error(`Unsupported marketplace: ${marketplace}`);
}
