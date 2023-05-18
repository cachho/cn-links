import type { AgentLink, AgentURL, AgentWithRaw, RawLink } from '../models';
import { detectMarketplace } from './detectMarketplace';
import { extractId } from './extractId';
import { generateAgentLink } from './generateAgentLink';
import { generateRawLink } from './generateRawLink';

/**
 * The simples way to converts a provided link to a specified agent link with minimal input.
 * If it is an agent link already, it's sanitized.
 * The idea of this function, compared to generateAgentLink, is that `toAgent` 'just works' and gets whatever is missing from minimal input.
 *
 * @param {RawLink | AgentLink} href - The link to convert.
 * @param {AgentWithRaw} agent - The agent to convert the link to.
 * @param {string} [referral] - The optional referral or affiliate code.
 * @returns {AgentURL | undefined} The converted agent link as a URL object, or undefined if conversion failed.
 */
export function toAgent(
  href: string | URL,
  agent: AgentWithRaw,
  referral?: string
): AgentURL | undefined {
  const link = href instanceof URL ? href : new URL(href);
  const marketplace = detectMarketplace(link);
  if (!marketplace) {
    return undefined;
  }
  const id = extractId(link, marketplace);
  if (!id) {
    return undefined;
  }
  try {
    return generateAgentLink(
      agent,
      generateRawLink(marketplace, id),
      marketplace,
      id,
      referral
    );
  } catch (error) {
    return undefined;
  }
}
