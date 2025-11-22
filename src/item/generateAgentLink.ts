import { acbuyMarketplaceStrings } from '../data/acbuy';
import { gtbuyMarketplaceStrings } from '../data/gtbuy';
import { hoobuyMarketplaceStrings } from '../data/hoobuy';
import { lovegobuyMarketplaceStrings } from '../data/lovegobuy';
import { oopbuyMarketplaceStrings } from '../data/oopbuy';
import { panglobalbuyMarketplaceStrings } from '../data/panglobalbuy';
import { ponybuyMarketplaceStrings } from '../data/ponybuy';
import { sifubuyMarketplaceStrings } from '../data/sifubuy';
import { usfansMarketplaceStrings } from '../data/usfans';
import type { AgentURL, AgentWithRaw, Id, Marketplace } from '../models';
import { generateRawLink } from './generateRawLink';

/**
 * Generates an agent item link by taking in an agent, the marketplace link (target), and other parameters, and putting them together.
 * Can also add affiliate extensions. Compared to the toAgent()  method, this method can work with as many inputs as possible, making it a more optimized starting point if you already have an id or marketplace for instance.
 * @param {AgentWithRaw} agent - The agent to generate a link for.
 * @param {Marketplace} [marketplace] - The marketplace for the source and target link. Few agents need this. Can be detected if not entered.
 * @param {Id} [id] - The id of the product. Can be detected if not entered.
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
    // https://www.pandabuy.com/product?ra=500&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D2724693540&inviteCode=ZQWFRJZEB
    urlParams.set('ra', ra ?? '1');
    urlParams.set('url', generateRawLink(marketplace, id).href);
    if (referral) {
      urlParams.set('inviteCode', referral);
    }
    return new URL(`https://www.pandabuy.com/product?${urlParams.toString()}`);
  }

  // Wegobuy
  if (agent === 'wegobuy') {
    // https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.html%3Fid%3D675330231400&partnercode=6t86Xk
    urlParams.set('from', 'search-input');
    urlParams.set('url', generateRawLink(marketplace, id).href);
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
    urlParams.set('url', generateRawLink(marketplace, id).href);
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
    urlParams.set(
      'productLink',
      encodeURIComponent(generateRawLink(marketplace, id).href) // Sugargoo likes double encodings
    );
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
    // https://www.cssbuy.com/item-675330231400.html?promotionCode=Y2h3ZWJkZXZlbG9wbWVudA
    // https://www.cssbuy.com/item-micro-4480454092.html?promotionCode=Y2h3ZWJkZXZlbG9wbWVudA
    if (referral) {
      urlParams.set('promotionCode', referral);
    }
    if (marketplace === 'weidian') {
      const url = `https://www.cssbuy.com/item-micro-${id}.html`;
      const paramString = urlParams.toString();
      return new URL(paramString ? `${url}?${paramString}` : url);
    }
    if (marketplace === '1688') {
      const url = `https://www.cssbuy.com/item-1688-${id}.html`;
      const paramString = urlParams.toString();
      return new URL(paramString ? `${url}?${paramString}` : url);
    }
    const url = `https://www.cssbuy.com/item-${id}.html`;
    const paramString = urlParams.toString();
    return new URL(paramString ? `${url}?${paramString}` : url);
  }

  // Hagobuy
  if (agent === 'hagobuy') {
    // https://www.hagobuy.com/item/details?url=https%3A%2F%2Fdetail.1688.com%2Foffer%2F669572555511.html
    urlParams.set('url', generateRawLink(marketplace, id).href);
    if (referral) {
      urlParams.set('affcode', referral);
    }
    return new URL(
      `https://www.hagobuy.com/item/details?${urlParams.toString()}`
    );
  }

  // Hegobuy
  if (agent === 'hegobuy') {
    // https://www.hegobuy.com/item/details?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D535661183265
    urlParams.set('url', generateRawLink(marketplace, id).href);
    if (referral) {
      urlParams.set('affcode', referral);
    }
    return new URL(
      `https://www.hegobuy.com/item/details?${urlParams.toString()}`
    );
  }

  // Kakobuy
  if (agent === 'kakobuy') {
    // https://www.kakobuy.com/item/details?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D535661183265
    urlParams.set('url', generateRawLink(marketplace, id).href);
    if (referral) {
      urlParams.set('affcode', referral);
    }
    return new URL(
      `https://www.kakobuy.com/item/details?${urlParams.toString()}`
    );
  }

  // Kameymall
  if (agent === 'kameymall') {
    urlParams.set('url', generateRawLink(marketplace, id).href);
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
    // https://cnfans.com/product?id=676700645113&platform=TAOBAO
    const url = new URL('https://cnfans.com/product');
    url.searchParams.set('id', id);
    if (marketplace === 'taobao' || marketplace === 'tmall') {
      url.searchParams.set('platform', 'TAOBAO');
    } else if (marketplace === 'weidian') {
      url.searchParams.set('platform', 'WEIDIAN');
    } else if (marketplace === '1688') {
      url.searchParams.set('platform', 'ALI_1688');
    } else {
      throw new Error('Marketplace could not be detected for CnFans');
    }

    if (referral) {
      url.searchParams.set('ref', referral);
    }

    return url;
  }

  // CnFans
  if (agent === 'mulebuy') {
    // https://mulebuy.com/product?id=6834305685837&platform=TAOBAO&ref=0
    const url = new URL('https://mulebuy.com/product');
    url.searchParams.set('id', id);
    if (marketplace === 'taobao' || marketplace === 'tmall') {
      url.searchParams.set('platform', 'TAOBAO');
    } else if (marketplace === 'weidian') {
      url.searchParams.set('platform', 'WEIDIAN');
    } else if (marketplace === '1688') {
      url.searchParams.set('platform', 'ALI_1688');
    } else {
      throw new Error('Marketplace could not be detected for CnFans');
    }

    if (referral) {
      url.searchParams.set('ref', referral);
    }

    return url;
  }

  if (agent === 'ezbuycn') {
    // https://ezbuycn.com/api/chaid.aspx?key=https://weidian.com/item.html?itemID=6308093508&spider_token=4572
    urlParams.set('key', generateRawLink(marketplace, id).href);
    return new URL(
      `https://ezbuycn.com/api/chaid.aspx?${urlParams.toString()}`
    );
  }

  // Hoobuy
  if (agent === 'hoobuy') {
    // https://hoobuy.com/product/1/692787834585?utm_source=share&utm_medium=product_details&inviteCode=2X6A1vRD
    const url = new URL(
      `https://www.hoobuy.com/product/${hoobuyMarketplaceStrings.get(
        marketplace
      )}/${id}`
    );
    if (referral) {
      url.searchParams.set('inviteCode', referral);
    }
    return url;
  }

  // UsFans
  if (agent === 'usfans') {
    // https://www.usfans.com/product/2/6767006113?ref=KaaDHE
    const url = new URL(
      `https://www.usfans.com/product/${usfansMarketplaceStrings.get(
        marketplace
      )}/${id}`
    );
    if (referral) {
      url.searchParams.set('ref', referral);
    }
    const paramString = urlParams.toString();
    return new URL(paramString ? `${url}?${paramString}` : url);
  }

  // AllChinaBuy
  if (agent === 'allchinabuy') {
    urlParams.set('from', 'search-input');
    urlParams.set('url', generateRawLink(marketplace, id).href);
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
    const correctedMarketplace =
      marketplace !== 'tmall' ? marketplace : 'taobao';
    const url = `https://www.basetao.com/best-taobao-agent-service/products/agent/${correctedMarketplace}/${id}.html`;
    return new URL(url);
  }

  if (agent === 'eastmallbuy') {
    const url = new URL('https://eastmallbuy.com/index/item/index.html');
    url.searchParams.set('searchlang', 'en');
    url.searchParams.set('url', generateRawLink(marketplace, id).href);
    if (referral) {
      url.searchParams.set('inviter', referral);
    }
    return url;
  }

  if (agent === 'hubbuycn') {
    const url = new URL('https://www.hubbuycn.com/product/item');
    url.searchParams.set('url', generateRawLink(marketplace, id).href);
    if (referral) {
      url.searchParams.set('invitation_code', referral);
    }
    return url;
  }

  if (agent === 'joyabuy') {
    const url = new URL('https://joyabuy.com/product/');
    if (marketplace === 'taobao' || marketplace === 'tmall') {
      url.searchParams.set('shop_type', 'taobao');
    } else if (marketplace === 'weidian') {
      url.searchParams.set('shop_type', 'weidian');
    } else if (marketplace === '1688') {
      url.searchParams.set('shop_type', 'ali_1688');
    } else {
      throw new Error('Marketplace could not be detected for CnFans');
    }
    url.searchParams.set('id', id);
    if (referral) {
      url.searchParams.set('ref', referral);
    }
    return url;
  }

  if (agent === 'joyagoo') {
    const url = new URL('https://joyagoo.com/product');
    url.searchParams.set('id', id);
    if (marketplace === 'taobao' || marketplace === 'tmall') {
      url.searchParams.set('platform', 'TAOBAO');
    } else if (marketplace === 'weidian') {
      url.searchParams.set('platform', 'WEIDIAN');
    } else if (marketplace === '1688') {
      url.searchParams.set('platform', 'ALI_1688');
    } else {
      throw new Error('Marketplace could not be detected for Joyagoo');
    }
    if (referral) {
      url.searchParams.set('ref', referral);
    }
    return url;
  }

  if (agent === 'orientdig') {
    const url = new URL('https://orientdig.com/product/');
    if (marketplace === 'taobao' || marketplace === 'tmall') {
      url.searchParams.set('shop_type', 'taobao');
    } else if (marketplace === 'weidian') {
      url.searchParams.set('shop_type', 'weidian');
    } else if (marketplace === '1688') {
      url.searchParams.set('shop_type', 'ali_1688');
    } else {
      throw new Error('Marketplace could not be detected for CnFans');
    }
    url.searchParams.set('id', id);
    if (referral) {
      url.searchParams.set('ref', referral);
    }
    return url;
  }

  if (agent === 'oopbuy') {
    // https://www.oopbuy.com/product/weidian/7231813764?inviteCode=ABC
    const url = new URL(
      `https://www.oopbuy.com/product/${oopbuyMarketplaceStrings.get(
        marketplace
      )}/${id}`
    );
    if (referral) {
      url.searchParams.set('inviteCode', referral);
    }
    return url;
  }

  if (agent === 'lovegobuy') {
    // https://www.lovegobuy.com/product?platform=weidian&goodsId=4480454012&id=4480454012&shop_type=weidian&invite_code=aff
    // https://www.lovegobuy.com/product?id=675330231400&shop_type=taobao&invite_code=aff
    const url = new URL('https://www.lovegobuy.com/product');
    url.searchParams.set('id', id);
    const marketplaceString = lovegobuyMarketplaceStrings.get(marketplace);
    if (!marketplaceString) {
      throw new Error('Unsupported marketplace for LoveGoBuy');
    }
    url.searchParams.set('shop_type', marketplaceString);
    if (referral) {
      url.searchParams.set('invite_code', referral);
    }
    return url;
  }

  // Blikbuy
  if (agent === 'blikbuy') {
    // https://blikbuy.com/?go=item&url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D675330231419
    urlParams.set('go', 'item');
    urlParams.set('url', generateRawLink(marketplace, id).href);
    if (referral) {
      urlParams.set('icode', referral);
    }
    return new URL(`https://www.blikbuy.com/?${urlParams.toString()}`);
  }

  if (agent === 'ponybuy') {
    // https://www.ponybuy.com/products/1/676700645113?inviteCode=ebe0050e31
    const url = new URL(
      `https://www.ponybuy.com/products/${ponybuyMarketplaceStrings.get(
        marketplace
      )}/${id}`
    );
    if (referral) {
      url.searchParams.set('inviteCode', referral);
    }
    return url;
  }

  if (agent === 'panglobalbuy') {
    // https://panglobalbuy.com/#/details?type=1&offerId=676700645111&share_id=6552
    const marketplaceString = panglobalbuyMarketplaceStrings.get(marketplace);
    if (marketplaceString === undefined) {
      throw new Error('Unsupported marketplace for PanGlobalBuy');
    }
    urlParams.set('type', marketplaceString);
    urlParams.set('offerId', id);
    if (referral) {
      urlParams.set('share_id', referral);
    }
    return new URL(
      `https://panglobalbuy.com/#/details?${urlParams.toString()}`
    );
  }

  if (agent === 'sifubuy') {
    // https://www.sifubuy.com/detail?productUrl=https%253A%252F%252Fitem.taobao.com%252Fitem.htm%253Fid%253D675330231421&type=2
    const url = new URL('https://www.sifubuy.com/detail');
    if (referral) {
      url.searchParams.set('invite_code', referral);
    }
    url.searchParams.set('id', id);
    const mp = sifubuyMarketplaceStrings.get(marketplace);
    if (!mp) {
      throw new Error('Unsupported marketplace for SifuBuy');
    }
    url.searchParams.set('type', mp);
    return url;
  }

  if (agent === 'loongbuy') {
    const url = new URL('https://www.loongbuy.com/product-details');
    url.searchParams.set('url', generateRawLink(marketplace, id).href);

    if (referral) {
      url.searchParams.set('invitecode', referral);
    }

    return url;
  }

  if (agent === 'acbuy') {
    const url = new URL('https://www.acbuy.com/product/');
    url.searchParams.set('id', id);
    const mp = acbuyMarketplaceStrings.get(marketplace);
    if (!mp) {
      throw new Error('Unsupported marketplace for AcBuy');
    }
    url.searchParams.set('source', mp);

    if (referral) {
      url.searchParams.set('u', referral);
    }

    return url;
  }

  if (agent === 'itaobuy') {
    const url = new URL('https://www.itaobuy.com/product-detail');
    url.searchParams.set('url', generateRawLink(marketplace, id).href);
    if (referral) {
      url.searchParams.set('inviteCode', referral);
    }
    return url;
  }

  if (agent === 'cnshopper') {
    // https://cnshopper.com/goods/detail?keyword=892588860718&platform=1688&invite_id=1424233
    const url = new URL('https://cnshopper.com/goods/detail');
    url.searchParams.set('keyword', id);
    url.searchParams.set('platform', marketplace);
    if (referral) {
      url.searchParams.set('invite_id', referral);
    }
    return url;
  }

  // Hipobuy
  if (agent === 'hipobuy') {
    // https://hipobuy.com/product/taobao/675330231400?inviteCode=8PW091LJH
    const mp = marketplace !== 'tmall' ? marketplace : 'taobao';
    const url = new URL(`https://hipobuy.com/product/${mp}/${id}`);
    if (referral) {
      url.searchParams.set('inviteCode', referral);
    }
    return url;
  }

  // GTbuy
  if (agent === 'gtbuy') {
    // https://gtbuy.com/product/1/675330231400?inviteCode=57DSXCOQQ
    const mp = gtbuyMarketplaceStrings.get(marketplace);
    if (!mp) {
      throw new Error('Unsupported marketplace for GTBuy');
    }
    const url = new URL(`https://gtbuy.com/product/${mp}/${id}`);
    if (referral) {
      url.searchParams.set('inviteCode', referral);
    }
    return url;
  }

  // Fishgoo
  if (agent === 'fishgoo') {
    // https://www.fishgoo.com/#/product?productLink=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D675330231401&memberId=ref
    urlParams.set(
      'productLink',
      encodeURIComponent(generateRawLink(marketplace, id).href) // Fishgoo likes double encodings
    );
    if (referral) {
      urlParams.set('memberId', referral);
    }
    return new URL(`https://www.fishgoo.com/#/product?${urlParams.toString()}`);
  }

  // Raw Links
  if (agent === 'raw') {
    // https://detail.1688.com/offer/679865234523.html
    return generateRawLink(marketplace, id);
  }

  throw new Error(`Unsupported agent: ${agent}`);
}
