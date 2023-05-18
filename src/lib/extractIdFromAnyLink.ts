import type { AgentURL, Id, Marketplace, RawURL } from '../models';
import { extractId } from './extractId';
import { isRawLink } from './isRawLink';
import { toRaw } from './toRaw';

/**
 * Slower implementation of `extractId` that works with raw links and agent links.
 *
 * @param {AgentURL | RawURL} href - The URL from which to extract the ID.
 * @param {Marketplace} [marketplace] - The marketplace to consider for ID extraction. If not provided, it will be automatically detected.
 * @returns {Id} The extracted ID, or undefined if no ID is found.
 */
export function extractIdFromAnyLink(
  href: string | URL,
  marketplace?: Marketplace
): Id {
  const link = href instanceof URL ? href : new URL(href);

  if (isRawLink(link)) {
    return extractId(link, marketplace);
  } else {
    const rawLink = toRaw(link);
    if (rawLink) {
      return extractId(rawLink, marketplace);
    }
    throw new Error(`Id could not be extracted from string: ${link.href}`);
  }
}
