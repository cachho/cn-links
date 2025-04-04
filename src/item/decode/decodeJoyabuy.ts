import type { Marketplace } from '../../models';
import { generateRawLink } from '../generateRawLink';

const getMarketplace = (link: URL): Marketplace | null => {
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

/**
 * @internal
 * Decodes the Joyabuy or Joyagoo link by extracting the marketplace and id.
 *
 * @param {AgentURL} href - The Joyabuy link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodeJoyabuy(link: URL) {
  const marketplace = getMarketplace(link);
  if (!marketplace) {
    throw new Error('Joyabuy shop type not supported.');
  }
  const id = link.searchParams.get('id');
  if (!id) {
    throw new Error('No id provided in Joyabuy link.');
  }
  return generateRawLink(marketplace, id);
}
