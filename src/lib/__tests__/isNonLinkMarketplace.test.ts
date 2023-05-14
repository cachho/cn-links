import { isNonLinkMarketplace } from '../isNonLinkMarketplace';

describe('isMarketplace', () => {
  it('should return true for a valid non link marketplace', () => {
    const href = 'https://account.x.yupoo.com';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(true);
  });

  it('should also be true for subpaths ', () => {
    const href = 'https://account.x.yupoo.com/albums';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(true);
  });

  it('should return true regardless of subdomain ', () => {
    const href = 'https://not-a-valid-subdomain.yupoo.com';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(true);
  });

  it('should return false for an invalid link', () => {
    const href = 'https://example.com';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(false);
  });

  it('should accept a URL object as input', () => {
    const href = 'https://account.x.yupoo.com';
    const url = new URL(href);
    const result = isNonLinkMarketplace(url);
    expect(result).toBe(true);
  });

  it('should return false for a non-URL input', () => {
    const href = 'not-a-url';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(false);
  });

  it('should return false for a valid Weidian link', () => {
    const href = 'https://weidian.com/item.html?itemId=3053526244';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(false);
  });

  it('should return false for a valid Taobao link', () => {
    const href = 'https://item.taobao.com/item.htm?id=674029285425';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(false);
  });

  it('should return false for a valid 1688 link', () => {
    const href = 'https://detail.1688.com/offer/610494659403.html';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(false);
  });

  it('should return false for a valid Tmall link', () => {
    const href = 'https://detail.tmall.com/item_o.htm?id=674029285425';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(false);
  });

  it('should return false for an agent link', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D674029285425';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(false);
  });

  it('should return false for an agent link with a supported marketplace URL', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemId%3D3053526244';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(false);
  });

  it('should return false for an agent link with an unsupported marketplace URL', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fexample.com%2Fitem.html%3Fid%3D12345';
    const result = isNonLinkMarketplace(href);
    expect(result).toBe(false);
  });
});
