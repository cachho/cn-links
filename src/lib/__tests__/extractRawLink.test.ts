import { agents, marketplaces } from '../../models';
import { extractRawLink } from '../extractRawLink';
import { generateAgentLink } from '../generateAgentLink';
import { generateMarketplaceLink } from '../generateRawLink';

describe('extractRawLink', () => {
  it('should extract the inner URL for a valid agent link', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.html%3Fid%3D675330231400&partnercode=6t86Xk';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://item.taobao.com/item.html?id=675330231400')
    );
  });

  it('should extract the inner URL from old sugargoo link', () => {
    const href =
      'https://sugargoo.com/index/item/index.html?tp=taobao&searchlang=en&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D5789470155';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://weidian.com/item.html?itemID=5789470155')
    );
  });

  it('should extract the inner URL from new sugargoo link', () => {
    const href =
      'https://www.sugargoo.com/#/home/productDetail?productLink=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fspm%3Da1z10.3%26id%3D695240235157&memberId=123';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://item.taobao.com/item.htm?spm=a1z10.3&id=695240235157')
    );
  });

  it('should work with double encoded sugargoo links', () => {
    const href =
      'https://www.sugargoo.com/#/home/productDetail?productLink=https%253A%252F%252Fweidian.com%252Fitem.html%253FitemID%253D5418645467%2526spider_token%253D4572';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL(
        'https://weidian.com/item.html?itemID=5418645467&spider_token=4572'
      )
    );
  });

  it('should extract the inner URL for a valid obscure agent link', () => {
    const href =
      'https://m.superbuy.com/en/goodsdetail/?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D705339617846';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://item.taobao.com/item.htm?id=705339617846')
    );
  });

  it('should return undefined for a link without the inner URL parameter', () => {
    const href = 'https://www.example.com/';
    const rawLink = new URL(href);
    expect(() => extractRawLink(rawLink)).toThrowError(
      "Error extracting inner link, 'url' query param not found: https://www.example.com/"
    );
  });

  it('should accept a URL object as input', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.html%3Fid%3D675330231400&partnercode=6t86Xk';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://item.taobao.com/item.html?id=675330231400')
    );
  });

  it('should extract the inner URL for a valid cssbuy raw link with parameters', () => {
    const href =
      'https://www.cssbuy.com/item-675330231400?promotionCode=Y2h3ZWJkZXZlbG9wbWVudA';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://item.taobao.com/item.htm?id=675330231400')
    );
  });

  it('should extract the inner URL for a valid cssbuy raw link', () => {
    const href = 'https://www.cssbuy.com/item-675330231400';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://item.taobao.com/item.htm?id=675330231400')
    );
  });

  it('should return undefined for an invalid cssbuy raw link', () => {
    const href = 'https://www.cssbuy.com';
    expect(() => extractRawLink(new URL(href))).toThrowError(
      'Error extracting inner link, cssbuy link could not be decrypted: https://www.cssbuy.com/'
    );
  });

  it('should be able to handle encrypted pandabuy links', () => {
    const href =
      'https://www.pandabuy.com/product?url=PJ1ir3z2Oq2sti2Kh9b3mCBmutY4HCY%252BGHy0yjnE8%252B53zKiJxlBvT%252BycaN%252FceMPv8IUsNVxI560P6gwF&utm_source=url&utm_medium=pdb&utm_campaign=normal';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://detail.tmall.com/item.htm?id=637720840003')
    );
  });

  test('should work for all agents and marketplaces', () => {
    const testId = '6481396504';
    marketplaces.forEach((marketplace) => {
      agents.forEach((agent) => {
        const marketplaceLink = generateMarketplaceLink(marketplace, testId);
        const agentLink = generateAgentLink(agent, marketplaceLink);
        if (marketplace === 'tmall') {
          // Sometimes, tmall can't be reversed and it's a taobao link.
          expect([
            marketplaceLink.href,
            generateMarketplaceLink('taobao', testId).href,
          ]).toContain(extractRawLink(agentLink).href);
        } else {
          expect(extractRawLink(agentLink).href).toBe(marketplaceLink.href);
        }
      });
    });
  });
});
