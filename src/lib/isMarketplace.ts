import { marketplacesWithTld } from '../models/Marketplace';
import { getDomainFromHostname } from './getDomainFromHostname';

export function isMarketplace(href: string | URL): boolean {
  const hostname =
    typeof href === 'string' ? new URL(href).hostname : href.hostname;
  const domain = getDomainFromHostname(hostname);

  return marketplacesWithTld.some((marketplace) =>
    marketplace.includes(domain)
  );
}
