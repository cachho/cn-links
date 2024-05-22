import { getDomainFromHostname } from '../lib/getDomainFromHostname';
import type { NonLinkMarketplace, NonLinkMarketplaceWithTld } from '../models';

/**
 * Detects the non-link marketplace based on the provided URL or hostname.
 *
 * @param {string | URL} href - The URL or hostname to detect the non-link marketplace from.
 * @returns {NonLinkMarketplace | undefined} The detected non-link marketplace, or undefined if no marketplace is detected.
 */
export function detectNonLinkMarketplace(
  href: string | URL
): NonLinkMarketplace | undefined {
  const hostname = href instanceof URL ? href.hostname : new URL(href).hostname;

  const domain = getDomainFromHostname(hostname) as NonLinkMarketplaceWithTld;

  if (domain === 'yupoo.com') {
    return 'yupoo';
  }

  return undefined;
}
