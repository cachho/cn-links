import { gtbuyStringsMarketplaces } from '../../data/gtbuy';
import type { AgentLink, Marketplace, RawURL } from '../../models';
import { marketplaces } from '../../models';
import { generateRawLink } from '../generateRawLink';

/**
 * @internal
 * Decrypts the Gtbuy link and returns the corresponding proper link.
 * This is an exception, as it does not infer strong input typing.
 *
 * @param {AgentLink |  string | URL} href - The Gtbuy link to decrypt. Not necessarily strongly typed.
 * @returns {RawURL} The decrypted proper link as a URL object, or undefined if decryption failed.
 */
export function decodeGtbuy(href: AgentLink | string | URL): RawURL {
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

  const agentSpecificMarketplaceSegment =
    slashSplits[slashIndex - 1].toLowerCase();

  const id = slashSplits[slashIndex];

  if (id === undefined || id === '') {
    throw new Error(`No valid Hoobuy item id found in : ${url.href}`);
  }

  if (marketplaces.includes(agentSpecificMarketplaceSegment as Marketplace)) {
    return generateRawLink(agentSpecificMarketplaceSegment as Marketplace, id);
  }

  const marketplace = gtbuyStringsMarketplaces.get(
    agentSpecificMarketplaceSegment
  );

  if (!marketplace) {
    throw new Error(`No valid GTBuy marketplace id found in : ${url.href}`);
  }

  return generateRawLink(marketplace, id);
}
