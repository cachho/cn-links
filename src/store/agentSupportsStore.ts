import type { AgentWithRaw } from '../models';
import { generateAgentLink } from './generateAgentLink';

/**
 * Checks if a specific agent supports store links.
 * @param agent
 * @returns boolean
 */
export function agentSupportsStore(agent: AgentWithRaw): boolean {
  try {
    const agentLink = generateAgentLink(agent, 'taobao', '0');
    return !!agentLink;
  } catch {
    return false;
  }
}
