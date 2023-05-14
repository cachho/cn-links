import type { Marketplace, MarketplaceWithTld } from '../models';
import { getDomainFromHostname } from './getDomainFromHostname';

/**
 * Detects the marketplace based on the provided URL or hostname.
 *
 * @param {string | URL} href - The URL or hostname to detect the marketplace from.
 * @returns {Marketplace | undefined} The detected marketplace, or undefined if no marketplace is detected.
 */
export function detectMarketplace(href: string | URL): Marketplace | undefined {
  const hostname = href instanceof URL ? href.hostname : new URL(href).hostname;

  const domain = getDomainFromHostname(hostname) as MarketplaceWithTld;

  if (domain === 'weidian.com') {
    return 'weidian';
  }
  if (domain === 'taobao.com') {
    return 'taobao';
  }
  if (domain === '1688.com') {
    return '1688';
  }
  if (domain === 'tmall.com') {
    return 'tmall';
  }

  return undefined;
}
