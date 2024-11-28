import { agents, marketplaces } from '../../models';
import { extractRawLink } from '../extractRawLink';
import { generateAgentLink } from '../generateAgentLink';
import { generateRawLink } from '../generateRawLink';

describe('extractRawLink', () => {
  it('should extract the inner URL from pandabuy store link', () => {
    const href =
      'https://www.pandabuy.com/shopdetail?ra=21&t=wd&id=1625671124&o=weidian.com';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(new URL('https://weidian.com/?userid=1625671124'));
  });

  it('should extract the inner URL from pandabuy store link for 1688', () => {
    const href =
      'https://www.pandabuy.com/shopdetail?ra=560&t=alibaba&id=b2b-22108725372987d9fa&o=m.1688.com';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://m.1688.com/winport/b2b-22108725372987d9fa.html')
    );
  });

  it('should work for a pandabuy link', () => {
    const href =
      'https://www.pandabuy.com/shopdetail?ra=21&t=wd&id=1625671124&o=weidian.com';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(new URL('https://weidian.com/?userid=1625671124'));
  });

  it('should extract the inner URL from cnfans store link', () => {
    const href =
      'https://cnfans.com/shops/?shop_type=taobao&num=1&sort=default&shop_id=277184856';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(new URL('https://shop277184856.taobao.com'));
  });

  it('should extract the inner URL from cssbuy taobao store link', () => {
    const href =
      'https://cssbuy.com/productlist?t=taobao&shop=106592833&shop1=676198570';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(new URL('https://shop106592833.taobao.com/'));
  });

  it('should extract the inner URL from cssbuy weidian store link', () => {
    const href =
      'https://cssbuy.com/productlist?t=taobao&shop=106592833&shop1=676198570';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(new URL('https://shop106592833.taobao.com/'));
  });

  it('should extract the raw link from a cssbuy 1688 store link', () => {
    const href =
      'https://www.cssbuy.com/productlist?t=1688&shop=BBBhWYrn9o5vKbSMmUj1wJqSg';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://m.1688.com/winport/b2b-BBBhWYrn9o5vKbSMmUj1wJqSg.html')
    );
  });

  it('should extract the raw link from a hagobuy taobao store', () => {
    const href =
      'https://www.hagobuy.com/item/store?url=https%3A%2F%2Fshop106592833.taobao.com';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(new URL('https://shop106592833.taobao.com'));
  });

  it('should work for hoobuy links', () => {
    const href = 'https://hoobuy.com/shop/1/676198570';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(new URL('https://shop676198570.taobao.com'));
  });

  it('should return undefined for a link without the inner URL parameter', () => {
    const href = 'https://www.example.com/';
    const rawLink = new URL(href);
    expect(() => extractRawLink(rawLink)).toThrowError(
      'Raw links can only be extracted from Agent links'
    );
  });

  it('should accept a URL object as input', () => {
    const href =
      'https://cnfans.com/shops/?shop_type=taobao&num=1&sort=default&shop_id=277184856';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(new URL('https://shop277184856.taobao.com'));
  });

  // it('should be able to handle encrypted taobao pandabuy links', () => {
  //   const href =
  //     'https://www.pandabuy.com/product?url=PJ9emDFVd3v76X25eDSVqIb3mLH4Md7zsyLlOTWmhLylMKdL6gbFKJ94ysL%2FSI3tYF1YOL6lhXMdRWOn3qm5FSOGuAaHx4uHPsYpA1hNETE3aRnXLdfh3RnL5vyVxk2ezXnQ8DWAgYzbSSdI&utm_source=url&utm_medium=pdb&utm_campaign=normal';
  //   const rawLink = extractRawLink(new URL(href));
  //   expect(rawLink).toEqual(
  //     new URL(
  //       'https://www.taobao.com/list/item/674680652328.htm?spm=a21wu.10013406.taglist-content.10.1d9865ebWR4RYC'
  //     )
  //   );
  // });

  it('should work for a 1688 desktop links', () => {
    const href =
      'https://www.pandabuy.com/shopdetail?ra=282&t=alibaba&id=-1&o=shop1434560114962.1688.com';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink.href).toEqual('https://shop1434560114962.1688.com/');
  });

  it('should work for superbuy', () => {
    const href =
      'https://www.superbuy.com/en/page/rebates/shop/?shopid=106592833&platform=TB';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink.href).toEqual('https://shop106592833.taobao.com/');
  });

  it('should work for kameymall', () => {
    const href = 'https://www.kameymall.com/store/123456_7';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink.href).toEqual('https://weidian.com/?userid=123456');
  });

  it('should work for shortened allchinabuy domain', () => {
    const href =
      'https://www.acbuy.com/en/page/shop/shop/?shopid=1866344120&platform=WD';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink.href).toEqual('https://weidian.com/?userid=1866344120');
  });

  it('should work for other languages of cnfans', () => {
    const href =
      'https://cnfans.com/de/shops/?shop_type=taobao&num=1&sort=default&shop_id=277184856';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink.href).toEqual('https://shop277184856.taobao.com/');
  });

  it('should work for other languages of mulebuy (for the day when it comes)', () => {
    const href =
      'https://mulebuy.com/zh/shops/?shop_type=taobao&num=1&sort=default&shop_id=192365862';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink.href).toEqual('https://shop192365862.taobao.com/');
  });

  it('should work for lovegobuy', () => {
    const href =
      'https://www.lovegobuy.com/store/list?shopType=taobao&shopId=512766491&sellerId=3046765323&store_name=in[3046765321]&logo_url=';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink.href).toEqual('https://shop512766491.taobao.com/');
  });

  it('should work for kakobuy', () => {
    const href =
      'https://www.kakobuy.com/item/store?url=https%3A%2F%2Fshop512766498.taobao.com%2F';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink.href).toEqual('https://shop512766498.taobao.com/');
  });

  it('should work both ways, if a link can be generated for an agent, it should also be able to decode it', () => {
    const agentsThatSupportGeneration = agents.filter((agent) => {
      try {
        generateAgentLink(agent, 'taobao', '123456');
        return true;
      } catch {
        return false;
      }
    });
    agentsThatSupportGeneration.forEach((agent) => {
      const link = generateAgentLink(agent, 'taobao', '123456');
      const rawLink = extractRawLink(link);
      expect(rawLink).toBeDefined();
    });
  });

  test('should work for all agents and marketplaces', () => {
    const testId = '6481396504';
    marketplaces.forEach((marketplace) => {
      agents.forEach((agent) => {
        const marketplaceLink = generateRawLink(marketplace, testId);

        // errors in generateAgentLink should be handled in the functions own tests
        try {
          generateAgentLink(agent, marketplace, testId);
        } catch {
          return;
        }

        const agentLink = generateAgentLink(agent, marketplace, testId);
        const rawLink = extractRawLink(agentLink);
        // Note this test is expected to fail for 1688 with cssbuy, because generating a cssbuy 1688 link loses info on whether it's a mobile link or not.
        if (marketplace === '1688' && agent === 'cssbuy') {
          expect(rawLink.href).not.toBe(marketplaceLink.href);
          return;
        }
        expect(rawLink.href).toBe(marketplaceLink.href);
      });
    });
  });
});
