import { filterLinks } from '../filterLinks';

describe('filterLinks', () => {
  const sampleText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Here's an agent link: https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk
    And a raw link: https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal
    Another agent link: https://www.pandabuy.com/product?url=https://item.taobao.com/item.htm?id=674029285425&utm_source=pop&utm_medium=pdb&utm_campaign=normal
    Some random text without a link.
    Another raw link: https://detail.1688.com/offer/610494659403.html
    Agent link without http prefix: www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk
    We also have yupoo, right here: account.x.yupoo.com, however that's not a hyperlink, here's the hyperlink: https://account.x.yupoo.com
    `;

  test('should filter and return the correct links (defaults)', () => {
    const result = filterLinks(sampleText, true, true);

    expect(result).toEqual({
      agentUrls: [
        new URL(
          'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk'
        ),
        new URL(
          'https://www.pandabuy.com/product?url=https://item.taobao.com/item.htm?id=674029285425&utm_source=pop&utm_medium=pdb&utm_campaign=normal'
        ),
      ],
      nonLinkMarketplaceUrls: undefined,
      rawUrls: [
        new URL(
          'https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal'
        ),
        new URL('https://detail.1688.com/offer/610494659403.html'),
      ],
    });
  });

  test('should filter and return the correct links (all)', () => {
    const result = filterLinks(sampleText, true, true, true);

    expect(result).toEqual({
      agentUrls: [
        new URL(
          'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk'
        ),
        new URL(
          'https://www.pandabuy.com/product?url=https://item.taobao.com/item.htm?id=674029285425&utm_source=pop&utm_medium=pdb&utm_campaign=normal'
        ),
      ],
      nonLinkMarketplaceUrls: [new URL('https://account.x.yupoo.com/')],
      rawUrls: [
        new URL(
          'https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal'
        ),
        new URL('https://detail.1688.com/offer/610494659403.html'),
      ],
    });
  });

  test('should be able to handle markdown', () => {
    const markdownText =
      '[anchor](https://detail.1688.com/offer/610494659403.html) and [https://detail.1688.com/offer/610494659403.html](https://detail.1688.com/offer/610494659403.html)';
    const result = filterLinks(markdownText, true, true, false);

    expect(result).toEqual({
      agentUrls: [],
      rawUrls: [
        new URL('https://detail.1688.com/offer/610494659403.html'),
        new URL('https://detail.1688.com/offer/610494659403.html'),
        new URL('https://detail.1688.com/offer/610494659403.html'),
      ],
    });
  });

  test('should be able to not handle markdown at will', () => {
    const markdownText =
      '[anchor](https://detail.1688.com/offer/610494659403.html) and [https://detail.1688.com/offer/610494659403.html](https://detail.1688.com/offer/610494659403.html)';
    const result = filterLinks(
      markdownText,
      true,
      true,
      false,
      undefined,
      true
    );

    expect(result).toEqual({
      agentUrls: [],
      nonLinkMarketplaceUrls: undefined,
      rawUrls: [
        new URL('https://detail.1688.com/offer/610494659403.html)'),
        new URL(
          'https://detail.1688.com/offer/610494659403.html](https://detail.1688.com/offer/610494659403.html)'
        ),
      ],
    });
  });

  test('should filter and return only agent links', () => {
    const result = filterLinks(sampleText, true, false);

    expect(result).toEqual({
      agentUrls: [
        new URL(
          'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk'
        ),
        new URL(
          'https://www.pandabuy.com/product?url=https://item.taobao.com/item.htm?id=674029285425&utm_source=pop&utm_medium=pdb&utm_campaign=normal'
        ),
      ],
    });
  });

  test('should filter and return only raw links', () => {
    const result = filterLinks(sampleText, false, true);

    expect(result).toEqual({
      rawUrls: [
        new URL(
          'https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal'
        ),
        new URL('https://detail.1688.com/offer/610494659403.html'),
      ],
    });
  });

  test('should filter and return only non-link marketplace links', () => {
    const result = filterLinks(sampleText, false, false, true);

    expect(result).toEqual({
      agentUrls: undefined,
      nonLinkMarketplaceUrls: [new URL('https://account.x.yupoo.com/')],
      rawUrls: undefined,
    });
  });

  test('should return an empty array if both agentLinks and rawLinks are false', () => {
    const result = filterLinks(sampleText, false, false);

    expect(result).toEqual({});
  });

  test('should return an empty array if nothing matched in the string', () => {
    const result = filterLinks('string with no match', false, false);

    expect(result).toEqual({});
  });

  test('should limit the number of results', () => {
    const result = filterLinks(sampleText, true, true, false, 2);
    expect(result).toEqual({
      agentUrls: [
        new URL(
          'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk'
        ),
      ],
      rawUrls: [
        new URL(
          'https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal'
        ),
      ],
    });
  });
});
