import type { AgentURL, AgentWithRaw, Id, Marketplace } from '../models';
import { allchinabuyMarketplaceStrings } from './data/allchinabuy';
import { cssbuyMarketplaceStrings } from './data/cssbuy';
import { hoobuyMarketplaceStrings } from './data/hoobuy';
import { pandabuyMarketplaceStrings } from './data/pandabuy';
import { generateRawLink } from './generateRawLink';

/**
 * Generates an agent item link by taking in an agent, the marketplace link (target), and other parameters, and putting them together.
 * Can also add affiliate extensions. Compared to the toAgent()  method, this method can work with as many inputs as possible, making it a more optimized starting point if you already have an id or marketplace for instance.
 * @param {AgentWithRaw} agent - The agent to generate a link for.
 * @param {Marketplace} marketplace - The marketplace for the source and target link. Few agents need this. Can be detected if not entered.
 * @param {Id} id - The id of the product. Can be detected if not entered.
 * @param {string} [referral] - The referral or affiliate code.
 * @param {string} [ra] - Set tracking parameters in the URL for internal tracking.
 * @returns {AgentURL} The generated agent link.
 * @throws {Error} If the agent is unsupported.
 */
export function generateAgentLink(
  agent: AgentWithRaw,
  marketplace: Marketplace,
  id: Id,
  referral?: string,
  ra?: string
): AgentURL {
  const urlParams = new URLSearchParams();

  // Pandabuy
  if (agent === 'pandabuy') {
    // https://www.pandabuy.com/shopdetail?ra=1&t=wd&id=1625671124
    urlParams.set('ra', ra ?? '1');
    if (pandabuyMarketplaceStrings.has(marketplace)) {
      urlParams.set('t', pandabuyMarketplaceStrings.get(marketplace)!);
    } else {
      throw new Error('Unsupported marketplace');
    }
    urlParams.set('id', id);
    if (referral) {
      urlParams.set('inviteCode', referral);
    }
    return new URL(
      `https://www.pandabuy.com/shopdetail?${urlParams.toString()}`
    );
  }

  if (agent === 'cssbuy') {
    // https://cssbuy.com/productlist?t=taobao&shop=106592833&shop1=676198570
    const url = new URL('https://cssbuy.com/productlist');
    const mp = cssbuyMarketplaceStrings.get(marketplace);
    if (!mp) {
      throw new Error('Unsupported marketplace for cssbuy');
    }
    url.searchParams.set('t', mp);
    url.searchParams.set('shop', id);
    // TODO: Its unkown what shop1 actually does, and since no working links found right now we have to update this later
    url.searchParams.set('shop1', '676198570');
    return url;
  }

  if (agent === 'hagobuy') {
    const url = new URL('https://www.hagobuy.com/item/store');
    url.searchParams.set('url', generateRawLink(marketplace, id).href);
    return url;
  }

  if (agent === 'cnfans') {
    // https://cnfans.com/shops/?shop_type=weidian&shop_id=1866344120&num=1&sort=default
    const url = new URL('https://cnfans.com/shops/');
    url.searchParams.set('shop_type', marketplace);
    url.searchParams.set('shop_id', id);
    return url;
  }

  if (agent === 'allchinabuy') {
    const url = new URL('https://www.allchinabuy.com/en/page/shop/shop/');
    const mp = allchinabuyMarketplaceStrings.get(marketplace);
    if (!mp) {
      throw new Error('Unsupported marketplace for allchinabuy');
    }
    url.searchParams.set('shopid', id);
    url.searchParams.set('platform', mp);
    return url;
  }

  if (agent === 'hoobuy') {
    const mp = hoobuyMarketplaceStrings.get(marketplace);
    if (!mp) {
      throw new Error('Unsupported marketplace for hoobuy');
    }
    return new URL(`https://hoobuy.com/shop/${mp}/${id}`);
  }

  // Raw Links
  if (agent === 'raw') {
    return generateRawLink(marketplace, id);
  }

  throw new Error(`The agent '${agent}' does not support store pages`);
}
