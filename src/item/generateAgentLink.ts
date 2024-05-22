import type {
  AgentURL,
  AgentWithRaw,
  Id,
  Marketplace,
  RawLink,
} from '../models';
import { detectMarketplace } from './detectMarketplace';
import { extractId } from './extractId';
import { generateRawLink } from './generateRawLink';

/**
 * Generates an agent item link by taking in an agent, the marketplace link (target), and other parameters, and putting them together.
 * Can also add affiliate extensions. Compared to the toAgent()  method, this method can work with as many inputs as possible, making it a more optimized starting point if you already have an id or marketplace for instance.
 * @param {AgentWithRaw} agent - The agent to generate a link for.
 * @param {RawLink} rawLink - The inner link to use in the generated link. Has to be sanitized before, it is not sanitzed again.
 * @param {Marketplace} [marketplace] - The marketplace for the source and target link. Few agents need this. Can be detected if not entered.
 * @param {Id} [id] - The id of the product. Can be detected if not entered.
 * @param {string} [referral] - The referral or affiliate code.
 * @param {string} [ra] - Set tracking parameters in the URL for internal tracking.
 * @returns {AgentURL} The generated agent link.
 * @throws {Error} If the agent is unsupported.
 */
export function generateAgentLink(
  agent: AgentWithRaw,
  rawLink: RawLink,
  marketplace?: Marketplace,
  id?: Id,
  referral?: string,
  ra?: string
): AgentURL {
  const urlParams = new URLSearchParams();
  const link = rawLink instanceof URL ? rawLink : new URL(rawLink);

  // Pandabuy
  if (agent === 'pandabuy') {
    // https://www.pandabuy.com/product?ra=500&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D2724693540&inviteCode=ZQWFRJZEB
    urlParams.set('ra', ra ?? '1');
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
    urlParams.set('productLink', encodeURIComponent(link.href));
    if (referral) {
      urlParams.set('memberId', referral);
    }
    // Old Style: `https://www.sugargoo.com/index/item/index.html?${urlParams.toString()}`
    return new URL(
      `https://www.sugargoo.com/#/home/productDetail?${urlParams.toString()}`
    );
  }

  // Cssbuy
  if (agent === 'cssbuy') {
    // https://www.cssbuy.com/item-675330231400?promotionCode=Y2h3ZWJkZXZlbG9wbWVudA
    // https://www.cssbuy.com/item-micro-4480454092?promotionCode=Y2h3ZWJkZXZlbG9wbWVudA
    if (referral) {
      urlParams.set('promotionCode', referral);
    }
    const mp = marketplace ?? detectMarketplace(link);
    const identifier = id || extractId(link, mp);
    if (mp === 'weidian') {
      const url = `https://www.cssbuy.com/item-micro-${identifier}`;
      const paramString = urlParams.toString();
      return new URL(paramString ? `${url}?${paramString}` : url);
    }
    if (mp === '1688') {
      const url = `https://www.cssbuy.com/item-1688-${identifier}`;
      const paramString = urlParams.toString();
      return new URL(paramString ? `${url}?${paramString}` : url);
    }
    const url = `https://www.cssbuy.com/item-${identifier}`;
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

  // Kameymall
  if (agent === 'kameymall') {
    urlParams.set('url', link.href);
    if (referral) {
      urlParams.set('code', referral);
    }
    // Referral currently not supported / unknown
    return new URL(
      `https://www.kameymall.com/purchases/search/item?${urlParams.toString()}`
    );
  }

  // CnFans
  if (agent === 'cnfans') {
    // https://cnfans.com/product/?shop_type=weidian&id=6481396504
    // https://cnfans.com/product/?shop_type=ali_1688&id=669590387983
    // https://cnfans.com/product/?shop_type=taobao&id=616770606113
    const mp = marketplace ?? detectMarketplace(link);
    const identifier = id || extractId(link, mp);
    if (mp === 'taobao' || mp === 'tmall') {
      urlParams.set('shop_type', 'taobao');
    } else if (mp === 'weidian') {
      urlParams.set('shop_type', 'weidian');
    } else if (mp === '1688') {
      urlParams.set('shop_type', 'ali_1688');
    } else {
      throw new Error('Marketplace could not be detected for CnFans');
    }
    urlParams.set('id', identifier);

    if (referral) {
      urlParams.set('ref', referral);
    }

    const url = 'https://cnfans.com/product/';
    const paramString = urlParams.toString();
    return new URL(paramString ? `${url}?${paramString}` : url);
  }

  if (agent === 'ezbuycn') {
    // https://ezbuycn.com/api/chaid.aspx?key=https://weidian.com/item.html?itemID=6308093508&spider_token=4572
    urlParams.set('key', link.href);
    return new URL(
      `https://ezbuycn.com/api/chaid.aspx?${urlParams.toString()}`
    );
  }

  if (agent === 'hoobuy') {
    // https://hoobuy.com/product/1/692787834585?utm_source=share&utm_medium=product_details&inviteCode=2X6A1vRD
    if (referral) {
      urlParams.set('inviteCode', referral);
    }
    const mp = marketplace ?? detectMarketplace(link);
    const identifier = id || extractId(link, mp);
    if (mp === '1688') {
      const url = `https://www.hoobuy.com/product/0/${identifier}`;
      const paramString = urlParams.toString();
      return new URL(paramString ? `${url}?${paramString}` : url);
    }
    if (mp === 'taobao' || mp === 'tmall') {
      const url = `https://www.hoobuy.com/product/1/${identifier}`;
      const paramString = urlParams.toString();
      return new URL(paramString ? `${url}?${paramString}` : url);
    }
    if (mp === 'weidian') {
      const url = `https://www.hoobuy.com/product/2/${identifier}`;
      const paramString = urlParams.toString();
      return new URL(paramString ? `${url}?${paramString}` : url);
    }
  }

  // AllChinaBuy
  if (agent === 'allchinabuy') {
    urlParams.set('from', 'search-input');
    urlParams.set('url', link.href);
    if (referral) {
      urlParams.set('partnercode', referral);
    }
    return new URL(
      `https://www.allchinabuy.com/en/page/buy?${urlParams.toString()}`
    );
  }

  // Basetao
  if (agent === 'basetao') {
    // https://www.basetao.com/best-taobao-agent-service/products/agent/taobao/655259799823.html
    const mp = detectMarketplace(link);
    const identifier = id || extractId(link, mp);
    const correctedMarketplace = mp !== 'tmall' ? mp : 'taobao';
    const url = `https://www.basetao.com/best-taobao-agent-service/products/agent/${correctedMarketplace}/${identifier}.html`;
    return new URL(url);
  }

  // Raw Links
  if (agent === 'raw') {
    // https://detail.1688.com/offer/679865234523.html
    const mp = detectMarketplace(link);
    if (!mp) {
      throw new Error(`Marketplace could not be determined: ${link}`);
    }
    const identifier = id || extractId(link, mp);
    if (!identifier) {
      throw new Error(`Id could not be determined: ${link}`);
    }
    return generateRawLink(mp, identifier);
  }

  throw new Error(`Unsupported agent: ${agent}`);
}
