import { detectMarketplace } from '../lib/detectMarketplace';
import type { Id, Marketplace } from '../models';
import type { RawLink } from '../models/LinkTypes';

/**
 * Extracts the ID from the provided URL based on the specified or detected marketplace.
 *
 * @param {RawLink} href - The URL from which to extract the ID. Must be a raw link.
 * @param {Marketplace} [marketplace] - The marketplace to consider for ID extraction. If not provided, it will be automatically detected.
 * @returns {Id} The extracted ID, or undefined if no ID is found.
 */
export function extractId(href: RawLink, marketplace?: Marketplace): Id {
  const link = href instanceof URL ? href : new URL(href);
  const mp = marketplace ?? detectMarketplace(href);

  if (!mp) {
    throw new Error(
      `Tried to extract id, but could not determine marketplace from string: ${link.href}`
    );
  }

  const url = new URL(link);
  const urlParams = new URLSearchParams(url.search ?? link);

  // It's assumed that these query parameters were typechecked before
  // They have to match `isRawLink`

  // For regular Taobao and Weidian Link
  if (mp === 'weidian') {
    if (urlParams.get('itemID')) {
      return urlParams.get('itemID')!;
    }
    if (urlParams.get('itemId')) {
      return urlParams.get('itemId')!;
    }
  } else if (mp === 'taobao') {
    if (link.hostname.indexOf('world.taobao.com') !== -1) {
      const id = link.href.split('item/')[1].split('.')[0];
      if (!Number.isNaN(Number(id))) {
        return id;
      }
    }
    if (url.pathname.startsWith('/list/item')) {
      const segments = url.pathname.split('/');
      const lastSegment = segments[segments.length - 1];
      if (lastSegment.endsWith('.htm')) {
        return lastSegment.split('.')[0];
      }
    }
    if (urlParams.get('id')) {
      return urlParams.get('id')!;
    }
  } else if (mp === '1688') {
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
      return urlParams.get('id')!;
    }
  }
  throw new Error(`Id could not be extracted from string: ${link.href}`);
}
