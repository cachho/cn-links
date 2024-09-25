import { decryptPandabuy } from '../lib/decryptPandabuy';
import { detectAgent } from '../lib/detectAgent';
import type { AgentURL, RawURL } from '../models/LinkTypes';
import { decodeBasetao } from './decode/decodeBasetao';
import { decodeCnFans } from './decode/decodeCnFans';
import { decodeCssbuy } from './decode/decodeCssbuy';
import { decodeHoobuy } from './decode/decodeHoobuy';
import { decodeHubbuyCn } from './decode/decodeHubbuyCn';
import { decodeJoyabuy } from './decode/decodeJoyabuy';
import { decodeLovegobuy } from './decode/decodeLoveGoBuy';
import { decodeMulebuy } from './decode/decodeMulebuy';
import { decodeOopbuy } from './decode/decodeOopbuy';
import { decodeOrientdig } from './decode/decodeOrientdig';
import { decodePonybuy } from './decode/decodePonybuy';

/**
 * @Internal
 * Extracts the raw link from the search params of a provided (agent) URL.
 * Is internal because end-users can use the `toRaw` or `generateRawLinks` to extract a raw link with more flexible inputs.
 *
 * @param {AgentURL} href - The URL from which to extract the raw link. It's assumed that it's typeguarded.
 * @returns {RawURL} The extracted raw link as a URL object, or undefined if no raw link is found.
 */
export function extractRawLink(href: AgentURL): RawURL {
  const link = href instanceof URL ? href : new URL(href);

  const agent = detectAgent(link.href);

  if (agent === 'cssbuy') {
    const innerLink = decodeCssbuy(link);
    if (!innerLink) {
      throw new Error(
        `Error extracting inner link, cssbuy link could not be decrypted: ${link.href}`
      );
    }
    return innerLink; // Forced because it's assumed that agentUrl is valid.
  }

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
    return decodeCnFans(link);
  }

  if (agent === 'mulebuy') {
    return decodeMulebuy(link);
  }

  if (agent === 'joyabuy') {
    return decodeJoyabuy(link);
  }

  if (agent === 'orientdig') {
    return decodeOrientdig(link);
  }

  if (agent === 'hoobuy') {
    const innerLink = decodeHoobuy(link);
    if (!innerLink) {
      throw new Error(`Could not extract inner Hoobuy link from ${link.href}`);
    }
    return innerLink;
  }

  if (agent === 'basetao') {
    return decodeBasetao(link);
  }

  if (agent === 'hubbuycn') {
    const innerLink = decodeHubbuyCn(link);
    if (!innerLink) {
      throw new Error(`Could not extract inner Hubbuy link from ${link.href}`);
    }
    return innerLink;
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
      // Regular Kameymall links have a `url` search parameter
    }
  }

  if (agent === 'oopbuy') {
    return decodeOopbuy(link);
  }

  if (agent === 'lovegobuy') {
    return decodeLovegobuy(link);
  }

  if (agent === 'ponybuy') {
    return decodePonybuy(link);
  }

  let innerParam: string | null = null;

  if (agent === 'ezbuycn') {
    innerParam = link.searchParams.get('key');
  }

  // General fallback starts here

  if (!innerParam) {
    innerParam = link.searchParams.get('url');
  }
  if (!innerParam) {
    throw new Error(
      `Error extracting inner link, 'url' query param not found: ${link.href}`
    );
  }

  // Special case for pandabuy decryption

  if (agent === 'pandabuy' && innerParam.startsWith('PJ')) {
    const extracted = decryptPandabuy(innerParam);
    return new URL(extracted);
  }

  return new URL(innerParam); // Forced because it's assumed that agentUrl is valid.
}
