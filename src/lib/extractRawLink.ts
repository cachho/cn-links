import { AgentLink, RawLink, RawURL } from '../models/LinkTypes';
import { decryptCssbuy } from './decryptCssbuy';
import { detectAgent } from './detectAgent';

/**
 * @Internal
 * Extracts the raw link from the search params of a provided (agent) URL.
 * Is internal because end-users can use the `toRaw` or `generateRawLinks` to extract a raw link with more flexible inputs.
 *
 * @param {AgentLink} href - The URL from which to extract the raw link.
 * @param {boolean} [cantBeCssbuy] - Indicates whether the raw link cannot be from the 'cssbuy' agent. If this is true the call to detectAgent is skipped. *Legacy functionality that makes little sense on a internal function.* Default is false.
 * @returns {RawURL | undefined} The extracted raw link as a URL object, or undefined if no raw link is found.
 */
export function extractRawLink(
  href: AgentLink,
  cantBeCssbuy?: boolean
): RawURL | undefined {
  const link = href instanceof URL ? href : new URL(href);

  if (!cantBeCssbuy && detectAgent(link.href) === 'cssbuy') {
    return decryptCssbuy(link);
  }

  const urlParams = new URLSearchParams(link.search ?? link);
  const innerParam = urlParams.get('url');

  if (!innerParam) {
    return undefined;
  }

  return new URL(innerParam);
}
