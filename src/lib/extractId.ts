import type { Marketplace } from '../models';

export function extractId(marketplace: Marketplace, href: string) {
  const url = new URL(href);
  const urlParams = new URLSearchParams(url.search ?? href);

  // For regular Taobao and Weidian Link
  if (marketplace === 'weidian') {
    if (urlParams.get('itemID')) {
      return urlParams.get('itemID');
    }
    if (urlParams.get('itemId')) {
      return urlParams.get('itemId');
    }
  } else if (marketplace === 'taobao') {
    if (href.indexOf('world.taobao.com') !== -1) {
      const id = href.split('item/')[1].split('.')[0];
      if (!Number.isNaN(Number(id))) {
        return id;
      }
    }
    if (urlParams.get('id')) {
      return urlParams.get('id');
    }
  } else if (marketplace === '1688') {
    // If it's still shortened at this point it can't be saved.
    if (href.indexOf('qr.1688.com') !== -1) {
      return null;
    }
    // 1688 doesn't use urlParams
    if (href.indexOf('offer')) {
      const id =
        href.indexOf('offer/') !== -1
          ? href.split('offer/')[1].split('.')[0]
          : href.split('offer%2F')[1].split('.')[0];
      // Validate number
      if (!Number.isNaN(Number(id))) {
        return id;
      }
    }
  } else if (marketplace === 'tmall') {
    if (urlParams.get('id')) {
      return urlParams.get('id');
    }
  }

  return null;
}
