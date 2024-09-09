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
});
