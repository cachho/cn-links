import { isRawLink } from '../isRawLink';

describe('isMarketplace', () => {
  it('should return true for a valid Weidian link', () => {
    const href = 'https://weidian.com/item.html?itemId=3053526244';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Taobao link', () => {
    const href = 'https://item.taobao.com/item.htm?id=674029285425';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid 1688 link', () => {
    const href = 'https://detail.1688.com/offer/610494659403.html';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Tmall link', () => {
    const href = 'https://detail.tmall.com/item_o.htm?id=674029285425';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return false for an invalid link', () => {
    const href = 'https://example.com';
    const result = isRawLink(href);
    expect(result).toBe(false);
  });

  it('should accept a URL object as input', () => {
    const href = 'https://weidian.com/item.html?itemId=3053526244';
    const url = new URL(href);
    const result = isRawLink(url);
    expect(result).toBe(true);
  });

  it('should return false for an agent link', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D674029285425';
    const result = isRawLink(href);
    expect(result).toBe(false);
  });

  it('should return false for an agent with a hash link', () => {
    const href =
      'https://www.lovegobuy.com/pc/#/goods/detail?platform=weidian&goodsId=4480454093';
    const result = isRawLink(href);
    expect(result).toBe(false);
  });

  it('should return false for an agent link with a supported marketplace URL', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemId%3D3053526244';
    const result = isRawLink(href);
    expect(result).toBe(false);
  });

  it('should return false for an agent link with an unsupported marketplace URL', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fexample.com%2Fitem.html%3Fid%3D12345';
    const result = isRawLink(href);
    expect(result).toBe(false);
  });

  it('should return false for a non-URL input', () => {
    const href = 'not-a-url';
    const result = isRawLink(href);
    expect(result).toBe(false);
  });

  it('should return false for an item link to the marketplace domain without an ID', () => {
    const href = 'https://weidian.com/item.html';
    const result = isRawLink(href);
    expect(result).toBe(false);
  });

  it('should work for weidian store links', () => {
    const href =
      'https://shop1622368742.v.weidian.com/item.html?itemID=5418645465';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Xianyu link (2.taobao.com)', () => {
    const href = 'https://2.taobao.com/item-detail?itemId=913955170552';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Xianyu link (goofish.com)', () => {
    const href = 'https://www.goofish.com/item?id=931096858778';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return false for mobile short links', () => {
    const mobileLinks = [
      'https://m.tb.cn/h.hZH53PB?tk=SBeXVJMVxap', // Xianyu mobile
      'https://e.tb.cn/h.hZH5WmfaS8hKKDC?tk=H0QDVJMVmMe', // Taobao mobile
      'https://qr.1688.com/s/Oe9AAOMO', // 1688 mobile
      'https://k.youshop10.com/f8DjKGQd?a=b&p=iphone&wfr=BuyercopyURL&share_relation=5c1997b193f3dfa6_1554610308_1', // Weidian mobile
    ];

    mobileLinks.forEach((href) => {
      expect(isRawLink(href)).toBe(false);
    });
  });
});
