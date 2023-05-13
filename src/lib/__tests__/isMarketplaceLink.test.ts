import { isMarketplaceLink } from '../isMarketplaceLink';

describe('isMarketplace', () => {
  it('should return true for a valid Weidian link', () => {
    const href = 'https://weidian.com/item.html?itemId=3053526244';
    const result = isMarketplaceLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Taobao link', () => {
    const href = 'https://item.taobao.com/item.htm?id=674029285425';
    const result = isMarketplaceLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid 1688 link', () => {
    const href = 'https://detail.1688.com/offer/610494659403.html';
    const result = isMarketplaceLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Tmall link', () => {
    const href = 'https://detail.tmall.com/item_o.htm?id=674029285425';
    const result = isMarketplaceLink(href);
    expect(result).toBe(true);
  });

  it('should return false for an invalid link', () => {
    const href = 'https://example.com';
    const result = isMarketplaceLink(href);
    expect(result).toBe(false);
  });

  it('should accept a URL object as input', () => {
    const href = 'https://weidian.com/item.html?itemId=3053526244';
    const url = new URL(href);
    const result = isMarketplaceLink(url);
    expect(result).toBe(true);
  });

  it('should return false for an agent link', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D674029285425';
    const result = isMarketplaceLink(href);
    expect(result).toBe(false);
  });

  it('should return false for an agent link with a supported marketplace URL', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemId%3D3053526244';
    const result = isMarketplaceLink(href);
    expect(result).toBe(false);
  });

  it('should return false for an agent link with an unsupported marketplace URL', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fexample.com%2Fitem.html%3Fid%3D12345';
    const result = isMarketplaceLink(href);
    expect(result).toBe(false);
  });
});
