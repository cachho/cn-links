import { type Marketplace, marketplaces } from '../models';
import type { AgentURL, RawURL } from '../models/LinkTypes';
import { decodeCssbuy } from './decode/decodeCssbuy';
import { decodeHoobuy } from './decode/decodeHoobuy';
import { decryptPandabuy } from './decrypt/decryptPandabuy';
import { detectAgent } from './detectAgent';
import { generateRawLink } from './generateRawLink';

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
    const innerLink = decodeCssbuy(link);
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

  if (agent === 'superbuy' && link.hostname === 'm.superbuy.com') {
    if (link.href.includes('/#/')) {
      link.href = link.href.replace('/#/', '/');
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

  if (agent === 'hoobuy') {
    const innerLink = decodeHoobuy(link);
    if (!innerLink) {
      throw new Error(`Could not extract inner Hoobuy link from ${link.href}`);
    }
    return innerLink;
  }

  if (agent === 'basetao') {
    const segments = link.pathname.split('/');
    if (!segments.includes('products')) {
      throw new Error(
        `This type of basetao link is not a compatible product link: ${link.href}`
      );
    }
    const getMarketplace = (): Marketplace | null => {
      return (
        marketplaces.find((marketplace) => segments.includes(marketplace)) ??
        null
      );
    };
    const marketplace = getMarketplace();
    if (!marketplace) {
      throw new Error(`No marketplace detected in Basetao link ${link.href}`);
    }
    // Get following segment
    const idSegment = segments[segments.indexOf(marketplace) + 1];
    const id = idSegment.split('.')[0];
    return generateRawLink(marketplace, id);
  }

  if (agent === 'kameymall') {
    if (link.pathname.startsWith('/purchases')) {
      // Check that the second part of the pathname is purely numerical
      const segments = link.pathname.split('/');
      if (segments[2] && /^\d+$/.test(segments[2])) {
        throw new Error(
          'Kameymall link is a purchase history link. This type of link cannot be decoded.'
        );
      }
    }
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

  if (agent === 'pandabuy' && innerParam.startsWith('PJ')) {
    const extracted = decryptPandabuy(innerParam);
    return new URL(extracted);
  }

  return new URL(innerParam); // Forced because it's assumed that agentUrl is valid.
}
