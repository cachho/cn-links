import type { Marketplace } from '../../models';
import { generateRawLink } from '../generateRawLink';

const getMarketplaceShopType = (link: URL): Marketplace | null => {
  const shopType = (
    link.searchParams.get('shoptype') || link.searchParams.get('shop_type')
  )?.toLowerCase();
  switch (shopType) {
    case 'weidian':
      return 'weidian';
    case 'taobao':
      return 'taobao';
    case 'ali_1688':
      return '1688';
    default:
      return null;
  }
};

const getMarketplacePlatform = (link: URL): Marketplace | null => {
  const platform = link.searchParams.get('platform')?.toLowerCase();
  switch (platform) {
    case 'weidian':
      return 'weidian';
    case 'taobao':
      return 'taobao';
    case 'ali_1688':
      return '1688';
    default:
      return null;
  }
};

/**
 * @internal
 * Decrypts the CnFans link by extracting the marketplace and id.
 * Mulebuy also uses the CnFans link format, so this function is used for both.
 *
 * @param {AgentURL} href - The CnFans link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodeCnFans(link: URL) {
  if (link.searchParams.has('id') && link.searchParams.has('platform')) {
    const marketplace = getMarketplacePlatform(link);
    if (!marketplace) {
      throw new Error('CnFans shop type not supported.');
    }
    const id = link.searchParams.get('id');
    if (!id) {
      throw new Error('No id provided in CnFans link.');
    }
    return generateRawLink(marketplace, id);
  }
  if (!link.hostname.startsWith('m.')) {
    const marketplace = getMarketplaceShopType(link);
    if (!marketplace) {
      throw new Error('CnFans shop type not supported.');
    }
    const id = link.searchParams.get('id');
    if (!id) {
      throw new Error('No id provided in CnFans link.');
    }
    return generateRawLink(marketplace, id);
  }
  const marketplace = getMarketplaceShopType(link);
  if (!marketplace) {
    throw new Error('CnFans shop type not supported (mobile).');
  }
  const id = link.searchParams.get('id');
  if (!id) {
    throw new Error('No id provided in CnFans link (mobile).');
  }
  return generateRawLink(marketplace, id);
}
