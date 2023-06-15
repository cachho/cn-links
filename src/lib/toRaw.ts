import type { RawURL } from '../models';
import { detectMarketplace } from './detectMarketplace';
import { extractId } from './extractId';
import { extractRawLink } from './extractRawLink';
import { generateRawLink } from './generateRawLink';
import { isAgentLink } from './isAgentLink';

/**
 * Converts a given URL (agent or raw) to its corresponding sanitized raw link.
 *
 * @param {string | URL} href - The URL to convert to raw link.
 * @returns {RawURL | undefined} The converted raw link, or undefined if conversion is not possible.
 */
export function toRaw(href: string | URL): RawURL | undefined {
  const link = href instanceof URL ? href : new URL(href);

  // Todo: This is redundant if the Input is of AgentURL type.
  if (isAgentLink(link)) {
    const innerLink = extractRawLink(link);
    if (innerLink) {
      return innerLink;
    }
  }

  const marketplace = detectMarketplace(link);
  if (!marketplace) {
    return undefined;
  }
  const id = extractId(link, marketplace);
  if (!id) {
    return undefined;
  }
  return generateRawLink(marketplace, id);
}
