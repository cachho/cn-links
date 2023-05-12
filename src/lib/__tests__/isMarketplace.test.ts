import { isMarketplace } from '../isMarketplace';

describe('isMarketplace', () => {
  it('should return true for a valid Weidian link', () => {
    const href = 'https://weidian.com/item.html?itemId=3053526244';
    const result = isMarketplace(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Taobao link', () => {
    const href = 'https://item.taobao.com/item.htm?id=674029285425';
    const result = isMarketplace(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid 1688 link', () => {
    const href = 'https://detail.1688.com/offer/610494659403.html';
    const result = isMarketplace(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Tmall link', () => {
    const href = 'https://detail.tmall.com/item_o.htm?id=674029285425';
    const result = isMarketplace(href);
    expect(result).toBe(true);
  });

  it('should return false for an invalid link', () => {
    const href = 'https://example.com';
    const result = isMarketplace(href);
    expect(result).toBe(false);
  });

  it('should accept a URL object as input', () => {
    const href = 'https://weidian.com/item.html?itemId=3053526244';
    const url = new URL(href);
    const result = isMarketplace(url);
    expect(result).toBe(true);
  });
});
