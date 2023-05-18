import type { Id, Marketplace } from '../models';
import { extractId } from './extractId';
import { isRawLink } from './isRawLink';
import { toRaw } from './toRaw';

/**
 * Slower implementation of `extractId` that works with raw links and agent links.
 *
 * @param {string | URL} href - The URL from which to extract the ID.
 * @param {Marketplace} [marketplace] - The marketplace to consider for ID extraction. If not provided, it will be automatically detected.
 * @returns {Id | undefined} The extracted ID, or undefined if no ID is found.
 */
export function extractIdFromAnyLink(
  href: string | URL,
  marketplace?: Marketplace
): Id | undefined {
  const link = href instanceof URL ? href : new URL(href);

  if (isRawLink(link)) {
    return extractId(link, marketplace);
  }

  const rawLink = toRaw(link);
  if (rawLink) {
    return extractId(rawLink, marketplace);
  }
  return undefined;
}
