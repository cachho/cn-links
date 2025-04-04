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

const getMarketplaceMobile = (link: URL): Marketplace | null => {
  const shopType =
    link.searchParams.get('shoptype') || link.searchParams.get('shop_type');
  if (shopType === 'weidian') {
    return 'weidian';
  }
  if (shopType === 'taobao') {
    return 'taobao';
  }
  if (shopType === 'ali_1688') {
    return '1688';
  }
  return null;
};

const getMarketplaceParams = (link: URL): Marketplace | null => {
  if (link.searchParams.get('platform')?.toLowerCase() === 'taobao') {
    return 'taobao';
  }
  if (link.searchParams.get('platform')?.toLowerCase() === 'weidian') {
    return 'weidian';
  }
  if (link.searchParams.get('platform')?.toLowerCase() === 'ali_1688') {
    return '1688';
  }
  return null;
};

/**
 * @internal
 * Decrypts the CnFans link by extracting the marketplace and id.
 *
 * @param {AgentURL} href - The CnFans link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodeCnFans(link: URL) {
  if (link.searchParams.has('id') && link.searchParams.has('platform')) {
    const marketplace = getMarketplaceParams(link);
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
    const marketplace = getMarketplace(link);
    if (!marketplace) {
      throw new Error('CnFans shop type not supported.');
    }
    const id = link.searchParams.get('id');
    if (!id) {
      throw new Error('No id provided in CnFans link.');
    }
    return generateRawLink(marketplace, id);
  }
  const marketplace = getMarketplaceMobile(link);
  if (!marketplace) {
    throw new Error('CnFans shop type not supported (mobile).');
  }
  const id = link.searchParams.get('id');
  if (!id) {
    throw new Error('No id provided in CnFans link (mobile).');
  }
  return generateRawLink(marketplace, id);
}
