import { detectMarketplace } from '../../lib/detectMarketplace';
import type { Marketplace } from '../../models';
import { extractId } from '../extractId';
import { isRawLink } from '../isRawLink';

export function decodeHagobuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  if (!link.pathname.startsWith('/item/store')) {
    throw new Error('Link is not a store link');
  }
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
