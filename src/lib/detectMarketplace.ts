import type { Marketplace, MarketplaceWithTld, RawLink } from '../models';
import { getDomainFromHostname } from './getDomainFromHostname';

/**
 * Detects the marketplace based on the provided URL or string.
 *
 * @param {RawLink} href - The URL or string  to detect the marketplace from. Must be in raw format, can't be agent link.
 * @returns {Marketplace | undefined} The detected marketplace, or undefined if no marketplace is detected.
 */
export function detectMarketplace(href: RawLink): Marketplace | undefined {
  const hostname = href instanceof URL ? href.hostname : new URL(href).hostname;
  // Handle mobile short link domains
  if (hostname === 'm.tb.cn') {
    return 'xianyu';
  }
  if (hostname === 'e.tb.cn') {
    return 'taobao';
  }
  if (hostname === 'qr.1688.com') {
    return '1688';
  }
  if (hostname === 'k.youshop10.com') {
    return 'weidian';
  }

  const domain = getDomainFromHostname(hostname) as MarketplaceWithTld;
  if (domain === 'weidian.com') {
    return 'weidian';
  }
  if (domain === 'taobao.com') {
    // Check if it's a Xianyu link (2.taobao.com)
    if (hostname === '2.taobao.com') {
      return 'xianyu';
    }
    return 'taobao';
  }
  if (domain === '1688.com') {
    return '1688';
  }
  if (domain === 'tmall.com') {
    return 'tmall';
  }
  if (domain === 'goofish.com') {
    return 'xianyu';
  }

  return undefined;
}
