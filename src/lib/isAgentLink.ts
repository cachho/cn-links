import { agents } from '../models/Agent';
import { extractId } from './extractId';
import { extractRawLink } from './extractRawLink';
import { getDomainFromHostname } from './getDomainFromHostname';

/**
 * Checks if the provided URL or hostname corresponds to an agent link.
 * It's important that it is an item link, agent links to other pages on their website return false,
 * for this scenario you should just use the hostname, but you can also set simpleDomainCheck to true.
 *
 * @param {string | URL} href - The URL or hostname to check.
 * @param {boolean} simpleDomainCheck - Skip checking for inner link and id and just check the domain.
 * @returns {boolean} True if the link corresponds to an agent, false otherwise.
 */
export function isAgentLink(
  href: string | URL,
  simpleDomainCheck?: boolean
): boolean {
  const link = href instanceof URL ? href : new URL(href);

  const domain = getDomainFromHostname(link.hostname);
  return agents.some(
    (agent) =>
      domain.includes(agent) &&
      (simpleDomainCheck ||
        (extractRawLink(link.href) && extractId(extractRawLink(link.href)!)))
  );
}
