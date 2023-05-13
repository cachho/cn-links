import { marketplacesWithTld } from '../models/Marketplace';
import { extractId } from './extractId';
import { getDomainFromHostname } from './getDomainFromHostname';

/**
 * Checks if the provided URL or hostname corresponds to a marketplace (is it a raw link?).
 * If `simpleDomainCheck` is set to `true`, it skips the ID check and only checks the domain.
 *
 * @param {string | URL} href - The URL or hostname to check.
 * @param {boolean} simpleDomainCheck - Skip checking for the ID parameter and only check the domain.
 * @returns {boolean} True if the link corresponds to a marketplace, false otherwise.
 */
export function isRawLink(
  href: string | URL,
  simpleDomainCheck?: boolean
): boolean {
  let link: URL;
  try {
    link = typeof href === 'string' ? new URL(href) : href;
  } catch {
    return false;
  }

  const domain = getDomainFromHostname(link.hostname);

  const id = extractId(link.href);

  return marketplacesWithTld.some(
    (marketplace) =>
      marketplace.includes(domain) && (simpleDomainCheck || id !== undefined)
  );
}

// ALIAS - This function used to be called isMarketplaceLink
export { isRawLink as isMarketplaceLink };
