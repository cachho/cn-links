import { detectMarketplace } from '../lib/detectMarketplace';

/**
 * Checks if the provided URL or hostname corresponds to a marketplace (is it a raw link?).
 * This is strongly typed and means that it includes an id and all other required parameters.
 *
 * @param {string | URL} href - The URL or hostname to check.
 * @returns {boolean} True if the link corresponds to a marketplace, false otherwise.
 */
export function isRawLink(href: string | URL): boolean {
  let link: URL;
  try {
    link = typeof href === 'string' ? new URL(href) : href;
  } catch {
    return false;
  }

  const marketplace = detectMarketplace(link);

  if (!marketplace) return false;

  if (marketplace === 'weidian') {
    if (link.searchParams.get('userid') || link.searchParams.get('userId')) {
      return true;
    }
    return false;
  }

  if (marketplace === 'taobao') {
    const segments = link.hostname.split('.');
    if (segments.some((segment) => segment.startsWith('shop'))) {
      return true;
    }
    if (
      segments.length === 3 &&
      segments[0] !== 'item' &&
      segments[1] === 'taobao' &&
      segments[2] === 'com'
    ) {
      return true;
    }
  }

  if (marketplace === '1688') {
    const hostSegments = link.hostname.split('.');
    if (hostSegments[0] === 'm') {
      const segments = link.pathname.split('/');
      const b2bSegment = segments.find((segment) => segment.startsWith('b2b-'));
      // Check that the segment ends with .html
      if (b2bSegment && b2bSegment.endsWith('.html')) {
        return true;
      }
      return false;
    }
    return hostSegments[0].startsWith('shop');
  }
  if (marketplace === 'tmall') {
    throw new Error('Tmall links are not supported yet.');
  }
  if (marketplace === 'xianyu') {
    // Check for user store links like https://www.goofish.com/user/{id}
    const segments = link.pathname.split('/').filter((s) => s);
    if (segments.length >= 2 && segments[0] === 'user') {
      return true;
    }
    // Reject item links - they have /item path
    if (segments.length >= 1 && segments[0] === 'item') {
      return false;
    }
    // Check for user store query parameters (not item parameters)
    if (link.searchParams.get('userId')) {
      return true;
    }
    return false;
  }

  return false;
}

// ALIAS - This function used to be called isMarketplaceLink
export { isRawLink as isMarketplaceLink };
