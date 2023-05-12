import type { AgentWithRaw } from '../models';
import { detectMarketplace } from './detectMarketplace';
import { extractId } from './extractId';
import { generateAgentLink } from './generateAgentLink';

/**
 * Converts the provided link to the specified agent link.
 *
 * @param {string} href - The link to convert.
 * @param {AgentWithRaw} agent - The agent to convert the link to.
 * @param {string} [referral] - The referral or affiliate code.
 * @returns {URL | undefined} The converted agent link as a URL object, or undefined if conversion failed.
 */
export function toAgent(
  href: string,
  agent: AgentWithRaw,
  referral?: string
): URL | undefined {
  const marketplace = detectMarketplace(href);
  if (!marketplace) {
    return undefined;
  }
  const id = extractId(href, marketplace);
  if (!id) {
    return undefined;
  }
  try {
    return generateAgentLink(agent, href, marketplace, id, referral);
  } catch (error) {
    return undefined;
  }
}
