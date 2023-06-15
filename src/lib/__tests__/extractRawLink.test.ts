import { extractRawLink } from '../extractRawLink';

describe('extractRawLink', () => {
  it('should extract the inner URL for a valid raw link', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.html%3Fid%3D675330231400&partnercode=6t86Xk';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://item.taobao.com/item.html?id=675330231400')
    );
  });

  it('should return undefined for a link without the inner URL parameter', () => {
    const href = 'https://www.example.com/';
    const rawLink = new URL(href);
    expect(() => extractRawLink(rawLink)).toThrowError(
      "Error extracting inner link, 'url' query param not found: https://www.example.com/"
    );
  });

  it('should accept a URL object as input', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.html%3Fid%3D675330231400&partnercode=6t86Xk';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://item.taobao.com/item.html?id=675330231400')
    );
  });

  it('should extract the inner URL for a valid cssbuy raw link with parameters', () => {
    const href =
      'https://www.cssbuy.com/item-675330231400?promotionCode=Y2h3ZWJkZXZlbG9wbWVudA';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://item.taobao.com/item.html?id=675330231400')
    );
  });

  it('should extract the inner URL for a valid cssbuy raw link', () => {
    const href = 'https://www.cssbuy.com/item-675330231400';
    const rawLink = extractRawLink(new URL(href));
    expect(rawLink).toEqual(
      new URL('https://item.taobao.com/item.html?id=675330231400')
    );
  });

  it('should return undefined for an invalid cssbuy raw link', () => {
    const href = 'https://www.cssbuy.com';
    expect(() => extractRawLink(new URL(href))).toThrowError(
      'Error extracting inner link, cssbuy link could not be decrypted: https://www.cssbuy.com/'
    );
  });
});
