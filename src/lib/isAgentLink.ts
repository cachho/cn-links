import { agents } from '../models/Agent';
import { getDomainFromHostname } from './getDomainFromHostname';

export function isAgentLink(href: string | URL): boolean {
  const hostname = href instanceof URL ? href.hostname : new URL(href).hostname;

  const domain = getDomainFromHostname(hostname);
  return agents.some((agent) => domain.includes(agent));
}
