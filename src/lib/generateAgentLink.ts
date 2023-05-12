import type { AgentWithRaw, Marketplace } from '../models';
import { generateProperLink } from './generateProperLink';

/**
 * Generates an agent item link by taking in an agent, the marketplace link (target), and other parameters, and putting them together.
 * Can also add affiliate extensions.
 * @param {AgentWithRaw} agent - The agent to generate a link for.
 * @param {string | URL} rawLink - The inner link to use in the generated link.
 * @param {Marketplace} marketplace - The marketplace for which the link is generated.
 * @param {string} id - The item ID.
 * @param {string} [referral] - The referral or affiliate code.
 * @returns {URL} The generated agent link.
 * @throws {Error} If the agent is unsupported.
 */
export function generateAgentLink(
  agent: AgentWithRaw,
  rawLink: URL | string,
  marketplace: Marketplace,
  id: string,
  referral?: string
): URL {
  const urlParams = new URLSearchParams();
  const link = rawLink instanceof URL ? rawLink : new URL(rawLink);

  // Pandabuy
  if (agent === 'pandabuy') {
    // https://www.pandabuy.com/product?ra=500&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D2724693540&inviteCode=ZQWFRJZEB
    urlParams.set('ra', '1');
    urlParams.set('url', link.href);
    if (referral) {
      urlParams.set('inviteCode', referral);
    }
    return new URL(`https://www.pandabuy.com/product?${urlParams.toString()}`);
  }

  // Wegobuy
  if (agent === 'wegobuy') {
    // https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.html%3Fid%3D675330231400&partnercode=6t86Xk
    urlParams.set('from', 'search-input');
    urlParams.set('url', link.href);
    if (referral) {
      urlParams.set('partnercode', referral);
    }
    return new URL(
      `https://www.wegobuy.com/en/page/buy?${urlParams.toString()}`
    );
  }

  // Superbuy
  if (agent === 'superbuy') {
    // https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.html%3Fid%3D675330231400&partnercode=6t86Xk
    urlParams.set('from', 'search-input');
    urlParams.set('url', link.href);
    if (referral) {
      urlParams.set('partnercode', referral);
    }
    return new URL(
      `https://www.superbuy.com/en/page/buy?${urlParams.toString()}`
    );
  }

  // Sugargoo
  if (agent === 'sugargoo') {
    // https://www.sugargoo.com/#/home/productDetail?productLink=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D{{ID}}&memberId=341947171345531121
    urlParams.set('productLink', link.href);
    if (referral) {
      urlParams.set('memberId', referral);
    }
    return new URL(
      `https://www.sugargoo.com/index/item/index.html?${urlParams.toString()}`
    );
  }

  // Cssbuy
  if (agent === 'cssbuy') {
    // https://www.cssbuy.com/item-675330231400?promotionCode=Y2h3ZWJkZXZlbG9wbWVudA
    // https://www.cssbuy.com/item-micro-4480454092?promotionCode=Y2h3ZWJkZXZlbG9wbWVudA
    if (referral) {
      urlParams.set('promotionCode', referral);
    }
    if (marketplace === 'weidian') {
      const url = `https://www.cssbuy.com/item-micro-${id}`;
      const paramString = urlParams.toString();
      return new URL(paramString ? `${url}?${paramString}` : url);
    }
    if (marketplace === '1688') {
      const url = `https://www.cssbuy.com/item-1688-${id}`;
      const paramString = urlParams.toString();
      return new URL(paramString ? `${url}?${paramString}` : url);
    }
    const url = `https://www.cssbuy.com/item-${id}`;
    const paramString = urlParams.toString();
    return new URL(paramString ? `${url}?${paramString}` : url);
  }

  // Hagobuy
  if (agent === 'hagobuy') {
    // https://www.hagobuy.com/item/details?url=https%3A%2F%2Fdetail.1688.com%2Foffer%2F669572555511.html
    urlParams.set('url', link.href);
    if (referral) {
      urlParams.set('affcode', referral);
    }
    return new URL(
      `https://www.hagobuy.com/item/details?${urlParams.toString()}`
    );
  }

  // Raw Links
  if (agent === 'raw') {
    // https://detail.1688.com/offer/679865234523.html
    return new URL(generateProperLink(marketplace, id).href);
  }

  throw new Error(`Unsupported agent: ${agent}`);
}
