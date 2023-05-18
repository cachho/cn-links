import type { Id, Marketplace } from '../models';
import { RawLink } from '../models/LinkTypes';
import { detectMarketplace } from './detectMarketplace';

/**
 * Extracts the ID from the provided URL based on the specified or detected marketplace.
 *
 * @param {RawLink} href - The URL from which to extract the ID. Must be a raw link.
 * @param {Marketplace} [marketplace] - The marketplace to consider for ID extraction. If not provided, it will be automatically detected.
 * @returns {Id | undefined} The extracted ID, or undefined if no ID is found.
 */
export function extractId(
  href: RawLink,
  marketplace?: Marketplace
): Id | undefined {
  // TODO: It makes sense to restrict the input of this to raw links.
  // Users can convert to raw links before, but I expect performance to be more important on this function than other, so I don't want to add checks and conversions to this.
  // For this it should be stronger typed.
  const link = href instanceof URL ? href : new URL(href);
  const mp = marketplace ?? detectMarketplace(href);

  if (!mp) {
    return undefined;
  }

  const url = new URL(link);
  const urlParams = new URLSearchParams(url.search ?? link);

  // For regular Taobao and Weidian Link
  if (mp === 'weidian') {
    if (urlParams.get('itemID')) {
      return urlParams.get('itemID') ?? undefined;
    }
    if (urlParams.get('itemId')) {
      return urlParams.get('itemId') ?? undefined;
    }
  } else if (mp === 'taobao') {
    if (link.hostname.indexOf('world.taobao.com') !== -1) {
      const id = link.href.split('item/')[1].split('.')[0];
      if (!Number.isNaN(Number(id))) {
        return id;
      }
    }
    if (urlParams.get('id')) {
      return urlParams.get('id') ?? undefined;
    }
  } else if (mp === '1688') {
    // If it's still shortened at this point it can't be saved.
    if (link.hostname.indexOf('qr.1688.com') !== -1) {
      return undefined;
    }
    // 1688 doesn't use urlParams
    if (link.href.indexOf('offer')) {
      const id =
        link.href.indexOf('offer/') !== -1
          ? link.href.split('offer/')[1].split('.')[0]
          : link.href.split('offer%2F')[1].split('.')[0];
      // Validate number
      if (!Number.isNaN(Number(id))) {
        return id;
      }
    }
  } else if (mp === 'tmall') {
    if (urlParams.get('id')) {
      return urlParams.get('id') ?? undefined;
    }
  }

  return undefined;
}
