import { detectMarketplace } from './detectMarketplace';
import { extractId } from './extractId';
import { extractRawLink } from './extractRawLink';
import { generateProperLink } from './generateProperLink';

/**
 * Converts a given URL (agent or raw) to its corresponding sanitized raw link.
 *
 * @param {string | URL} href - The URL to convert to raw link.
 * @returns {URL | undefined} The converted raw link, or undefined if conversion is not possible.
 */
export function toRaw(href: string | URL): URL | undefined {
  const link = href instanceof URL ? href : new URL(href);

  const innerLink = extractRawLink(link);
  if (innerLink) {
    console.log('🚀 ~ file: toRaw.ts:17 ~ toRaw ~ innerLink:', innerLink);
    return innerLink;
  }

  const marketplace = detectMarketplace(link);
  if (!marketplace) {
    return undefined;
  }
  const id = extractId(link, marketplace);
  if (!id) {
    return undefined;
  }
  return generateProperLink(marketplace, id);
}
