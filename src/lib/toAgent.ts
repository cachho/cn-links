import type { AgentWithRaw } from '../models';
import { detectMarketplace } from './detectMarketplace';
import { extractId } from './extractId';
import { generateAgentLink } from './generateAgentLink';

export function toAgent(href: string, agent: AgentWithRaw): URL | undefined {
  const marketplace = detectMarketplace(href);
  if (!marketplace) {
    return undefined;
  }
  const id = extractId(href, marketplace);
  if (!id) {
    return undefined;
  }
  try {
    return generateAgentLink(agent, href, marketplace, id);
  } catch (error) {
    return undefined;
  }
}
