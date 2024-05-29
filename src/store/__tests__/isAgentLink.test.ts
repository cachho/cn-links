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
});
