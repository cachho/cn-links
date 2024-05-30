import { detectAgent } from '../lib/detectAgent';
import type { AgentURL, RawURL } from '../models/LinkTypes';
import { decodeAllChinaBuy } from './decode/decodeAllChinaBuy';
import { decodeCnFans } from './decode/decodeCnfans';
import { decodeCssbuy } from './decode/decodeCssbuy';
import { decodeHagobuy } from './decode/decodeHagobuy';
import { decodeHoobuy } from './decode/decodeHoobuy';
import { decodePandabuy } from './decode/decodePandabuy';
import { decodeSuperbuy } from './decode/decodeSuperbuy';
import { generateRawLink } from './generateRawLink';

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

  if (!agent) {
    throw new Error('Raw links can only be extracted from Agent links');
  }

  if (agent === 'cnfans') {
    const { marketplace, id } = decodeCnFans(link);
    return generateRawLink(marketplace, id);
  }

  if (agent === 'pandabuy') {
    // let innerParam = link.searchParams.get('url');
    // if (innerParam?.startsWith('PJ')) {
    //   const extracted = decryptPandabuy(innerParam);
    //   if (extracted) {
    //     innerParam = extracted;
    //   } else {
    //     throw new Error(`Could not decrypt Pandabuy link: ${link.href}`);
    //   }
    // }

    const { marketplace, id } = decodePandabuy(link);
    return generateRawLink(marketplace, id);
  }

  if (agent === 'cssbuy') {
    const { marketplace, id } = decodeCssbuy(link);
    return generateRawLink(marketplace, id);
  }

  if (agent === 'hagobuy') {
    const { marketplace, id } = decodeHagobuy(link);
    return generateRawLink(marketplace, id);
  }

  if (agent === 'allchinabuy') {
    const { marketplace, id } = decodeAllChinaBuy(link);
    return generateRawLink(marketplace, id);
  }

  if (agent === 'hoobuy') {
    const { marketplace, id } = decodeHoobuy(link);
    return generateRawLink(marketplace, id);
  }

  if (agent === 'superbuy') {
    const { marketplace, id } = decodeSuperbuy(link);
    return generateRawLink(marketplace, id);
  }

  throw new Error(
    `Agent ${agent} is not supported for extracting raw links. URL: ${link.href}`
  );
}
