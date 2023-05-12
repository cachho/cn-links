import type { Marketplace } from '../models';
import { detectMarketplace } from './detectMarketplace';

/**
 * Extracts the ID from the provided URL based on the specified or detected marketplace.
 *
 * @param {string} href - The URL from which to extract the ID.
 * @param {Marketplace} [marketplace] - The marketplace to consider for ID extraction. If not provided, it will be automatically detected.
 * @returns {string | undefined} The extracted ID, or undefined if no ID is found.
 */
export function extractId(href: string, marketplace?: Marketplace) {
  const mp = marketplace ?? detectMarketplace(href);

  if (!mp) {
    return undefined;
  }

  const url = new URL(href);
  const urlParams = new URLSearchParams(url.search ?? href);

  // For regular Taobao and Weidian Link
  if (mp === 'weidian') {
    if (urlParams.get('itemID')) {
      return urlParams.get('itemID');
    }
    if (urlParams.get('itemId')) {
      return urlParams.get('itemId');
    }
  } else if (mp === 'taobao') {
    if (href.indexOf('world.taobao.com') !== -1) {
      const id = href.split('item/')[1].split('.')[0];
      if (!Number.isNaN(Number(id))) {
        return id;
      }
    }
    if (urlParams.get('id')) {
      return urlParams.get('id');
    }
  } else if (mp === '1688') {
    // If it's still shortened at this point it can't be saved.
    if (href.indexOf('qr.1688.com') !== -1) {
      return undefined;
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
  } else if (mp === 'tmall') {
    if (urlParams.get('id')) {
      return urlParams.get('id');
    }
  }

  return undefined;
}
