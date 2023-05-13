import type { AgentWithRaw } from '../models';
import { detectMarketplace } from './detectMarketplace';
import { extractId } from './extractId';
import { generateAgentLink } from './generateAgentLink';
import { generateProperLink } from './generateProperLink';

/**
 * The simples way to converts a provided link to a specified agent link with minimal input.
 * The idea of this function, compared to generateAgentLink, is that toAgent 'just works' and gets whatever is missing from minimal input.
 *
 * @param {string | URL} href - The link to convert.
 * @param {AgentWithRaw} agent - The agent to convert the link to.
 * @param {string} [referral] - The optional referral or affiliate code.
 * @returns {URL | undefined} The converted agent link as a URL object, or undefined if conversion failed.
 */
export function toAgent(
  href: string | URL,
  agent: AgentWithRaw,
  referral?: string
): URL | undefined {
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
      generateProperLink(marketplace, id),
      marketplace,
      referral
    );
  } catch (error) {
    return undefined;
  }
}
