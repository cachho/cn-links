import type { AgentURL, RawURL } from '../models/LinkTypes';
import { decryptCssbuy } from './decryptCssbuy';
import { detectAgent } from './detectAgent';

/**
 * @Internal
 * Extracts the raw link from the search params of a provided (agent) URL.
 * Is internal because end-users can use the `toRaw` or `generateRawLinks` to extract a raw link with more flexible inputs.
 *
 * @param {AgentURL} href - The URL from which to extract the raw link. It's assumed that it's typeguarded.
 * @param {boolean} [cantBeCssbuy] - Indicates whether the raw link cannot be from the 'cssbuy' agent. If this is true the call to detectAgent is skipped. *Legacy functionality that makes little sense on a internal function.* Default is false.
 * @returns {RawURL} The extracted raw link as a URL object, or undefined if no raw link is found.
 */
export function extractRawLink(href: AgentURL, cantBeCssbuy?: boolean): RawURL {
  const link = href instanceof URL ? href : new URL(href);

  if (!cantBeCssbuy && detectAgent(link.href) === 'cssbuy') {
    const innerLink = decryptCssbuy(link);
    if (!innerLink) {
      throw new Error(
        `Error extracting inner link, cssbuy link could not be decrypted: ${link.href}`
      );
    }
    return innerLink; // Forced because it's assumed that agentUrl is valid.
  }

  const urlParams = new URLSearchParams(link.search ?? link);
  const innerParam = urlParams.get('url');
  if (!innerParam) {
    throw new Error(
      `Error extracting inner link, 'url' query param not found: ${link.href}`
    );
  }
  return new URL(innerParam); // Forced because it's assumed that agentUrl is valid.
}
