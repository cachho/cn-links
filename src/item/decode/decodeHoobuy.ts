import { hoobuyStringsMarketplaces } from '../../data/hoobuy';
import type { AgentLink, RawURL } from '../../models';
import { generateRawLink } from '../generateRawLink';

/**
 * @internal
 * Decrypts the Hoobuy link and returns the corresponding proper link.
 * This is an exception, as it does not infer strong input typing.
 *
 * @param {AgentLink |  string | URL} href - The Hoobuy link to decrypt. Not necessarily strongly typed.
 * @returns {RawURL} The decrypted proper link as a URL object, or undefined if decryption failed.
 */
export function decodeHoobuy(href: AgentLink | string | URL): RawURL {
  const url = typeof href === 'string' ? new URL(href) : href;

  let prefix = '/product/';
  const isMobile = url.pathname.startsWith('/m/product/');
  if (isMobile) {
    prefix = '/m/product/';
  } else if (!url.pathname.startsWith(prefix)) {
    throw new Error(`Hoobuy prefix error.`);
  }

  const slashIndex = isMobile ? 4 : 3;

  const slashSplits = url.pathname.split('/');

  const agentSpecificMarketplaceId = slashSplits[slashIndex - 1];

  const marketplace = hoobuyStringsMarketplaces.get(agentSpecificMarketplaceId);

  if (!marketplace) {
    throw new Error(`No valid Hoobuy marketplace id found in : ${url.href}`);
  }

  const id = slashSplits[slashIndex];

  if (id === undefined || id === '') {
    throw new Error(`No valid Hoobuy item id found in : ${url.href}`);
  }

  return generateRawLink(marketplace, id);
}
