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
    // Mobile short links are not directly supported as raw links
    if (link.hostname === 'k.youshop10.com') return false;

    return !!(
      link.searchParams.get('itemID') || link.searchParams.get('itemId')
    );
  }

  if (marketplace === 'taobao') {
    // Mobile short links are not directly supported as raw links
    if (link.hostname === 'e.tb.cn' || link.hostname === 'm.tb.cn')
      return false;

    if (link.hostname.includes('world.taobao.com')) {
      const id = link.href.split('item/')[1].split('.')[0];
      return !Number.isNaN(Number(id));
    }
    return !!link.searchParams.get('id');
  }

  if (marketplace === '1688') {
    // Mobile short links are not directly supported as raw links
    if (link.hostname === 'qr.1688.com') return false;

    if (link.href.indexOf('offer')) {
      const id =
        link.href.indexOf('offer/') !== -1
          ? link.href.split('offer/')[1].split('.')[0]
          : link.href.split('offer%2F')[1].split('.')[0];
      // Validate number
      return !Number.isNaN(Number(id));
    }
  }

  if (marketplace === 'tmall') {
    return !!link.searchParams.get('id');
  }

  if (marketplace === 'xianyu') {
    // Mobile short links are not directly supported as raw links
    if (link.hostname === 'm.tb.cn') return false;

    // Support both formats: 2.taobao.com and goofish.com
    if (link.hostname === '2.taobao.com') {
      return !!link.searchParams.get('itemId');
    }
    if (link.hostname === 'www.goofish.com') {
      return !!link.searchParams.get('id');
    }

    // Fallback check
    return !!(link.searchParams.get('itemId') || link.searchParams.get('id'));
  }

  return false;
}

// ALIAS - This function used to be called isMarketplaceLink
export { isRawLink as isMarketplaceLink };
