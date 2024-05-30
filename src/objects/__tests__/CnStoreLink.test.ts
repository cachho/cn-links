import { generateAgentLink as generateItemAgentLink } from '../../item/generateAgentLink';
import { generateRawLink as generateRawItemLink } from '../../item/generateRawLink';
import { agents, marketplaces } from '../../models';
import { CnStoreLink } from '..';

describe('CnStoreLink', () => {
  it('should be able to return a raw link from an agent link', () => {
    const href =
      'https://www.pandabuy.com/shopdetail?ra=21&t=wd&id=1625671124&o=weidian.com';
    const link = new CnStoreLink(href);
    expect(link.as('raw')).toStrictEqual(
      new URL('https://weidian.com/?userid=1625671124')
    );
  });

  it('should be able to return an agent link from a raw link', () => {
    const href = 'https://weidian.com/?userid=1625671124';
    const link = new CnStoreLink(href);
    expect(link.as('pandabuy')).toStrictEqual(
      new URL('https://www.pandabuy.com/shopdetail?ra=1&t=wd&id=1625671124')
    );
  });

  it('should be able to return a taobao link from a cnfans agent link', () => {
    const href =
      'https://cnfans.com/shops/?shop_type=taobao&num=1&sort=default&shop_id=277184856';
    const link = new CnStoreLink(href);
    expect(link.as('raw')).toStrictEqual(
      new URL('https://shop277184856.taobao.com')
    );
  });

  it('should be able to return a taobao link from a cnfans agent link', () => {
    const href = 'https://shop232138271.v.weidian.com/?userid=232138271';
    const link = new CnStoreLink(href);
    expect(link.as('pandabuy')).toStrictEqual(
      new URL('https://www.pandabuy.com/shopdetail?ra=1&t=wd&id=232138271')
    );
  });

  it('should be able to convert link from one agent to another', () => {
    const href =
      'https://www.pandabuy.com/shopdetail?ra=21&t=wd&id=1625671124&o=weidian.com';
    const link = new CnStoreLink(href);
    expect(link.as('cnfans').href).toStrictEqual(
      new URL('https://cnfans.com/shops/?shop_type=weidian&shop_id=1625671124')
        .href
    );
  });

  it('should not work with raw store links', () => {
    marketplaces.forEach((marketplace) => {
      const rawItemLink = generateRawItemLink(marketplace, '123456');
      const response = CnStoreLink.safeInstantiate(rawItemLink);
      if (response.success) {
        throw new Error(
          `Item Link '${rawItemLink}' should not work as a store link`
        );
      }
      expect(response.success).toBe(false);
    });
  });

  it('should not work with agent store links', () => {
    marketplaces.forEach((marketplace) => {
      agents.forEach((agent) => {
        try {
          const rawItemLink = generateItemAgentLink(
            agent,
            generateRawItemLink(marketplace, '123456')
          );
          const response = CnStoreLink.safeInstantiate(rawItemLink);
          expect(response.success).toBe(false);
        } catch (error) {
          console.log('Error: ', error);
        }
      });
    });
  });
});
