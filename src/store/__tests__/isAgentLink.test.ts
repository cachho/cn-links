import { agents } from '../../models';
import { generateAgentLink } from '../generateAgentLink';
import { isAgentLink } from '../isAgentLink';

describe('isAgentLink', () => {
  it('should return true for pandabuy store link', () => {
    const href =
      'https://www.pandabuy.com/shopdetail?ra=21&t=wd&id=1625671124&o=weidian.com';
    expect(isAgentLink(href)).toBe(true);
  });

  it('should return true for cnfans store link', () => {
    const href =
      'https://cnfans.com/shops/?shop_type=taobao&num=1&sort=default&shop_id=277184856';
    expect(isAgentLink(href)).toBe(true);
  });

  it('should return true for superbuy links', () => {
    const href =
      'https://www.superbuy.com/en/page/rebates/shop/?shopid=123456&platform=WD';
    expect(isAgentLink(href)).toBe(true);
  });

  test('returns false for non-agent links', () => {
    const nonAgentLinks = [
      'https://m.1688.com/winport/b2b-22108725372987d9fa.html',
      'https://shop232138271.v.weidian.com/?userid=232138271',
      'https://weidian.com/?userid=1625671124',
    ];

    nonAgentLinks.forEach((link) => {
      expect(isAgentLink(link)).toBe(false);
    });
  });

  test('should return true for allchinabuy link', () => {
    const href =
      'https://www.allchinabuy.com/en/page/shop/shop/?shopid=1866344120&platform=WD';
    expect(isAgentLink(href)).toBe(true);
  });

  test('returns false for non-valid URL input', () => {
    const invalidLinks = ['invalid-url', 'https://', 'ftp://example.com'];

    invalidLinks.forEach((link) => {
      expect(isAgentLink(link)).toBe(false);
    });
  });

  test('returns false for inputs to domain root without item path', () => {
    const rootLinks = [
      'https://www.wegobuy.com/',
      'https://www.pandabuy.com/',
      'https://detail.tmall.com/',
      'https://item.taobao.com/',
      'https://detail.1688.com/',
      'https://weidian.com/',
    ];

    rootLinks.forEach((link) => {
      expect(isAgentLink(link)).toBe(false);
    });
  });

  it('should return false if the link is not a valid cn-link', () => {
    const href =
      'https://www.pandabuy.com/NOTshopdetail?ra=21&t=wd&id=1625671124&o=weidian.com';
    expect(isAgentLink(href)).toBe(false);
  });

  it('should detect agent link from shortened allchinabuy domain', () => {
    const href =
      'https://www.acbuy.com/en/page/shop/shop/?shopid=1797960313&platform=WD';
    expect(isAgentLink(href)).toBe(true);
  });

  it('should work for other languages of cnfans', () => {
    const href =
      'https://cnfans.com/de/shops/?shop_type=taobao&num=1&sort=default&shop_id=277184856';
    expect(isAgentLink(href)).toBe(true);
  });

  it('should work for other languages of mulebuy', () => {
    const href =
      'https://mulebuy.com/zh/shops/?shop_type=taobao&num=1&sort=default&shop_id=192365862';
    expect(isAgentLink(href)).toBe(true);
  });

  it('should detect true if the agent has a link generator function', () => {
    agents.forEach((agent) => {
      try {
        const storeLink = generateAgentLink(agent, 'weidian', '123456');
        expect(isAgentLink(storeLink)).toBe(true);
      } catch (e) {
        if (
          e instanceof Error &&
          e.message.includes('does not support store pages')
        ) {
          // This is expected, as not all agents support store pages
          return;
        }
        throw new Error(
          `${agent} supports store link generation, but the link is not detected as an agent link. Failed with error: ${e}`
        );
      }
    });
  });
});
