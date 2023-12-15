import type { Marketplace } from '../models';
import type { AgentURL, RawURL } from '../models/LinkTypes';
import { detectAgent } from './detectAgent';
import { generateRawLink } from './generateRawLink';
import { decryptCssbuy } from './specific/decryptCssbuy';

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

  const agent = detectAgent(link.href);

  if (agent === 'sugargoo') {
    const safeLink = new URL(link.href.replace('/#/', '/'));
    const innerParam = safeLink.searchParams.get('productLink');
    if (innerParam) {
      try {
        return new URL(innerParam);
      } catch {
        return new URL(decodeURIComponent(innerParam));
      }
    }
  }

  if (agent === 'cnfans') {
    const getMarketplace = (): Marketplace | null => {
      if (link.searchParams.get('shop_type') === 'weidian') {
        return 'weidian';
      }
      if (link.searchParams.get('shop_type') === 'taobao') {
        return 'taobao';
      }
      if (link.searchParams.get('shop_type') === 'ali_1688') {
        return '1688';
      }
      return null;
    };
    const marketplace = getMarketplace();
    if (!marketplace) {
      throw new Error('CnFans shop type not supported.');
    }
    const id = link.searchParams.get('id');
    if (!id) {
      throw new Error('No id provided in CnFans link.');
    }
    return generateRawLink(marketplace, id);
  }

  let innerParam: string | null = null;

  if (agent === 'ezbuycn') {
    innerParam = link.searchParams.get('key');
  }

  if (!innerParam) {
    innerParam = link.searchParams.get('url');
  }
  if (!innerParam) {
    throw new Error(
      `Error extracting inner link, 'url' query param not found: ${link.href}`
    );
  }
  return new URL(innerParam); // Forced because it's assumed that agentUrl is valid.
}
