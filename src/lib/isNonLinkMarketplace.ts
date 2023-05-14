import type { NonLinkMarketplaceWithTld } from '../models/Marketplace';
import { nonLinkMarketplacesWithTld } from '../models/Marketplace';
import { getDomainFromHostname } from './getDomainFromHostname';

/**
 * Checks if a given URL corresponds to a non-link marketplace. A non-link marketplace is a related marketplace,
 * that can't be included in the actual link transformation, the core of this package, due to the structure of the link.
 *
 * @param {string | URL} href - The URL to check.
 * @returns {boolean} Returns true if the URL corresponds to a non-link marketplace, and false otherwise.
 */
export function isNonLinkMarketplace(href: string | URL): boolean {
  let link: URL;
  try {
    link = new URL(href);
  } catch {
    return false;
  }

  // Check if the URL protocol is valid
  if (!['http:', 'https:'].includes(link.protocol)) {
    return false;
  }

  const domain = getDomainFromHostname(link.hostname);
  return nonLinkMarketplacesWithTld.includes(
    domain as NonLinkMarketplaceWithTld
  );
}
