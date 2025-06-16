import type { RawLink } from '../models/LinkTypes';

/**
 * Detects if the provided URL is a mobile short link.
 * Mobile links are short links that need to be resolved to get the actual item/store link.
 *
 * @param {RawLink} href - The URL or string to check. Must be in raw format, can't be agent link.
 * @returns {boolean} True if the link is a mobile short link, false otherwise.
 */
export function isMobileLink(href: RawLink): boolean {
  try {
    const hostname =
      href instanceof URL ? href.hostname : new URL(href).hostname;

    // Check for known mobile short link domains
    return (
      hostname === 'm.tb.cn' || // Xianyu mobile
      hostname === 'e.tb.cn' || // Taobao mobile
      hostname === 'qr.1688.com' || // 1688 mobile
      hostname === 'k.youshop10.com' // Weidian mobile
    );
  } catch {
    return false;
  }
}

/**
 * Gets the marketplace type for a mobile link.
 * Only works for mobile short links - use detectMarketplace for regular links.
 *
 * @param {RawLink} href - The mobile URL or string to detect the marketplace from.
 * @returns {string | undefined} The marketplace type ('xianyu', 'taobao', '1688', 'weidian') or undefined if not a mobile link.
 */
export function getMobileMarketplace(
  href: RawLink
): 'xianyu' | 'taobao' | '1688' | 'weidian' | undefined {
  try {
    const hostname =
      href instanceof URL ? href.hostname : new URL(href).hostname;

    switch (hostname) {
      case 'm.tb.cn':
        return 'xianyu';
      case 'e.tb.cn':
        return 'taobao';
      case 'qr.1688.com':
        return '1688';
      case 'k.youshop10.com':
        return 'weidian';
      default:
        return undefined;
    }
  } catch {
    return undefined;
  }
}
