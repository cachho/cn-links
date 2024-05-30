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

  const urlParams = link.searchParams;

  // It's assumed that these query parameters were typechecked before
  // They have to match `isRawLink`

  // For regular Taobao and Weidian Link
  if (mp === 'weidian') {
    if (link.pathname.startsWith('/item')) {
      // Check for format https://shop1866344120.v.weidian.com/item.html?itemID=4161541590
      const segments = link.hostname.split('.');
      if (segments.length === 4 && segments[1] === 'v') {
        return segments[0];
      }
      throw new Error('Link is an item link, not a store link');
    }
    if (urlParams.get('userid')) {
      return urlParams.get('userid')!;
    }
    if (urlParams.get('userId')) {
      return urlParams.get('userId')!;
    }
  } else if (mp === 'taobao') {
    const segments = link.hostname
      .split('.')
      .filter((segment) => segment !== 'taobao' && segment !== 'com');
    if (segments.length === 1) {
      if (segments[0].startsWith('shop')) {
        return segments[0].slice(4);
      }
      return segments[0];
    }
    if (segments.find((segment) => segment.startsWith('shop'))) {
      const segment = segments.find((s) => s.startsWith('shop'));
      if (segment) {
        return segment.slice(4);
      }
    }
  } else if (mp === '1688') {
    const segments = link.hostname.split('.');
    if (segments.length !== 3) {
      throw new Error('Unknown 1688 link format');
    }
    if (segments[0] === 'm') {
      // Mobile link
      const pathSegments = link.pathname.split('/');
      if (pathSegments.length === 3) {
        if (
          pathSegments[2].startsWith('b2b-') &&
          pathSegments[2].endsWith('.html')
        ) {
          return pathSegments[2].slice(0, -5);
        }
      }
    } else {
      if (segments[0].startsWith('shop')) {
        return segments[0].slice(4);
      }
      return segments[0];
    }
  } else if (mp === 'tmall') {
    if (urlParams.get('id')) {
      return urlParams.get('id')!;
    }
  }
  throw new Error(`Id could not be extracted from string: ${link.href}`);
}
