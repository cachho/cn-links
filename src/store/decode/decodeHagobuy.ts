import { detectMarketplace } from '../../lib/detectMarketplace';
import type { Marketplace } from '../../models';
import { extractId } from '../extractId';
import { isRawLink } from '../isRawLink';

export function decodeHagobuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  const innerUrl = new URL(link.searchParams.get('url') || '');

  if (!isRawLink(innerUrl)) {
    throw new Error('Invalid inner URL');
  }

  const marketplace = detectMarketplace(innerUrl);

  if (!marketplace) {
    throw new Error('Unsupported marketplace');
  }

  const id = extractId(innerUrl);

  return { marketplace, id };
}
