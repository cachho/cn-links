import { generateAgentLink as generateItemAgentLink } from '../../item/generateAgentLink';
import { type Marketplace, agentsWithRaw, marketplaces } from '../../models';
import { agentSupportsStore } from '../../store/agentSupportsStore';
import { generateAgentLink as generateStoreAgentLink } from '../../store/generateAgentLink';
import { CnItemLink, CnLink, CnStoreLink } from '..';

describe('Test All', () => {
  const id = '123456';

  it('should work for all item links', () => {
    marketplaces.forEach((marketplace) => {
      agentsWithRaw.forEach((agent) => {
        const rawItemLink = generateItemAgentLink(agent, marketplace, id);
        const response = CnLink.safeInstantiate(rawItemLink);
        if (!response.success) {
          throw new Error(response.error);
        }
        expect(response.data).toBeInstanceOf(CnLink);
        // expect(response.data.marketplace).toBe(marketplace);
        expect(response.data.id).toBe(id);
        expect(response.data.type).toBe('item');
        expect(response.data.instance).toBeInstanceOf(CnItemLink);
        agentsWithRaw.forEach((a) => {
          response.data.as(a);
        });
      });
    });
  });

  it('should work for all store links', () => {
    marketplaces.forEach((marketplace) => {
      agentsWithRaw.forEach((agent) => {
        if (agentSupportsStore(agent)) {
          const rawStoreLink = generateStoreAgentLink(agent, marketplace, id);
          const response = CnLink.safeInstantiate(rawStoreLink);
          if (!response.success) {
            throw new Error(response.error);
          }
          expect(response.data).toBeInstanceOf(CnLink);
          if (marketplace === 'tmall') {
            expect(response.data.marketplace).toBe('taobao');
          } else {
            expect(response.data.marketplace).toBe(marketplace);
          }
          if (response.data.id !== id) {
            if (agent === 'cssbuy' && marketplace === '1688') {
              // CSSbuy 1688 links are a one way function, so we assume b2b links
            } else {
              throw new Error(
                `Data: ${JSON.stringify(
                  response.data.serialize()
                )} to be converted to ${agent} produced the wrong id: ${
                  response.data.id
                }`
              );
            }
          }
          expect(response.data.type).toBe('store');
          expect(response.data.instance).toBeInstanceOf(CnStoreLink);
          agentsWithRaw.forEach((a) => {
            if (agentSupportsStore(a)) {
              response.data.as(a);
            }
          });
        }
      });
    });
  });
});

describe('CnLink', () => {
  test('should be able to return a raw link from a raw link', () => {
    const href = 'https://weidian.com/item.html?itemID=3053526244';
    const link = new CnLink(href);
    expect(link.as('raw')).toStrictEqual(
      new URL('https://weidian.com/item.html?itemID=3053526244')
    );
  });

  test('should return an agent link from a raw link', () => {
    const href = 'https://weidian.com/item.html?itemID=3053526244';
    const link = new CnLink(href);
    expect(link.as('superbuy')).toStrictEqual(
      new URL(
        'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244'
      )
    );
  });

  test('should return an raw link from an agent link', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href);
    expect(link.as('raw')).toStrictEqual(
      new URL('https://weidian.com/item.html?itemID=3053526244')
    );
  });

  test('should return an agent link from an agent link', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href);
    expect(link.as('wegobuy')).toStrictEqual(
      new URL(
        'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244'
      )
    );
  });

  test('should be able to add affiliate link object', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href, { wegobuy: 'my-affiliate' });
    expect(link.as('wegobuy')).toStrictEqual(
      new URL(
        'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244&partnercode=my-affiliate'
      )
    );
  });

  test('should be able to add affiliate link with the as method', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href);
    expect(link.as('wegobuy', 'my-affiliate')).toStrictEqual(
      new URL(
        'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244&partnercode=my-affiliate'
      )
    );
  });

  test('should be able to add affiliate link with an ra tracker', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href);
    expect(link.as('pandabuy', 'my-affiliate', '999')).toStrictEqual(
      new URL(
        'https://www.pandabuy.com/product?ra=999&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244&inviteCode=my-affiliate'
      )
    );
  });

  test('should be able to serialize', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href);
    expect(link.serialize()).toEqual({
      marketplace: 'weidian',
      id: '3053526244',
      type: 'item',
    });
  });

  test('should be able to deserialize', () => {
    const serial = {
      marketplace: 'weidian' as Marketplace,
      id: '3053526244',
    };
    const cnlink = CnLink.deserialize(serial);
    expect(cnlink.marketplace).toEqual(serial.marketplace);
    expect(cnlink.id).toEqual(serial.id);
  });

  test('safe method should not throw error', () => {
    const href = 'https://not-a-valid-url.net/';
    const link = CnLink.safeInstantiate(href);
    expect(link.success).toBe(false);
    if (!link.success) {
      expect(link.error).not.toBe('');
    }
  });

  test('safe method should not return error if successful', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = CnLink.safeInstantiate(href);
    expect(link.success).toBe(true);
    if (link.success) {
      expect(link.data).toBeInstanceOf(CnLink);
    }
  });

  it('should throw an error if the link is a valid domain but not a convertable link', () => {
    const href =
      'https://www.kameymall.com/purchases/1730295605736697858/%E3%80%90%E6%9C%80%E9%AB%98%E7%89%88%E6%9C%AC%E3%80%91%E7%99%BE%E6%90%ADchrome-hearts%E5%85%8B%E7%BD%97%E5%BF%83%E9%A1%B9%E9%93%BE-%E5%85%8B%E7%BD%97%E5%BF%83%E5%8F%8C%E5%8D%81%E5%AD%97%E6%9E%B6%E6%83%85%E4%BE%A3%E9%A1%B9%E9%93%BE-%E6%BD%AE%E6%B5%81%E7%94%B7%E5%A3%AB%E5%A5%B3%E5%A3%AB%E5%8D%81%E5%AD%97%E6%9E%B6%E9%A1%B9%E9%93%BE%E5%A5%97%E9%93%BE';
    expect(() => new CnLink(href)).toThrow(
      `CnLink object could not be initialized. Neither agent nor raw link could be detected from: ${href}`
    );
  });

  it('should work with a weird mobile hash link', () => {
    const href =
      'https://m.allchinabuy.com/home/#/goodsDetail?nTag=Home-search&from=search-input&_search=url&url=https://weidian.com/item.html?itemID=7232818673';
    const link = CnLink.safeInstantiate(href);
    if (!link.success) {
      throw new Error(link.error);
    }
    expect(link.success).toBe(true);
    expect(link.data).toBeInstanceOf(CnLink);
  });
});
