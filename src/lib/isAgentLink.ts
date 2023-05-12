import { agents } from '../models/Agent';
import { getDomainFromHostname } from './getDomainFromHostname';

/**
 * Checks if the provided URL or hostname corresponds to an agent link.
 *
 * @param {string | URL} href - The URL or hostname to check.
 * @returns {boolean} True if the link corresponds to an agent, false otherwise.
 */
export function isAgentLink(href: string | URL): boolean {
  const hostname = href instanceof URL ? href.hostname : new URL(href).hostname;

  const domain = getDomainFromHostname(hostname);
  return agents.some((agent) => domain.includes(agent));
}
