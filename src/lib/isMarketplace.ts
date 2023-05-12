import { marketplacesWithTld } from '../models/Marketplace';
import { getDomainFromHostname } from './getDomainFromHostname';

/**
 * Checks if the provided URL or hostname corresponds to a marketplace.
 *
 * @param {string | URL} href - The URL or hostname to check.
 * @returns {boolean} True if the link corresponds to a marketplace, false otherwise.
 */
export function isMarketplace(href: string | URL): boolean {
  const hostname =
    typeof href === 'string' ? new URL(href).hostname : href.hostname;
  const domain = getDomainFromHostname(hostname);

  return marketplacesWithTld.some((marketplace) =>
    marketplace.includes(domain)
  );
}
