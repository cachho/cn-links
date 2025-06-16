import type { Marketplace } from '../../models';
import { generateRawLink } from '../generateRawLink';

const getMarketplace = (link: URL): Marketplace | null => {
  if (link.searchParams.get('platform') === 'weidian') {
    return 'weidian';
  }
  if (link.searchParams.get('platform') === 'taobao') {
    return 'taobao';
  }
  if (link.searchParams.get('platform') === 'xianyu') {
    return 'xianyu';
  }
  if (link.searchParams.get('platform') === '1688') {
    return '1688';
  }
  return null;
};

/**
 * @internal
 * Decrypts the Ponybuy link by extracting the marketplace and id.
 *
 * @param {AgentURL} href - The Ponybuy link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodePonybuy(link: URL) {
  const marketplace = getMarketplace(link);
  if (!marketplace) {
    throw new Error('Ponybuy shop type not supported.');
  }
  const id = link.searchParams.get('product_id');
  if (!id) {
    throw new Error('No id provided in Ponybuy link.');
  }
  return generateRawLink(marketplace, id);
}
