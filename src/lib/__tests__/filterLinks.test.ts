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
  `;

  test('should filter and return the correct links', () => {
    const result = filterLinks(sampleText, true, true);

    expect(result).toEqual([
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk',
      'https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal',
      'https://www.pandabuy.com/product?url=https://item.taobao.com/item.htm?id=674029285425&utm_source=pop&utm_medium=pdb&utm_campaign=normal',
      'https://detail.1688.com/offer/610494659403.html',
    ]);
  });

  test('should filter and return only agent links', () => {
    const result = filterLinks(sampleText, true, false);

    expect(result).toEqual([
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk',
      'https://www.pandabuy.com/product?url=https://item.taobao.com/item.htm?id=674029285425&utm_source=pop&utm_medium=pdb&utm_campaign=normal',
    ]);
  });

  test('should filter and return only raw links', () => {
    const result = filterLinks(sampleText, false, true);

    expect(result).toEqual([
      'https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal',
      'https://detail.1688.com/offer/610494659403.html',
    ]);
  });

  test('should return an empty array if both agentLinks and rawLinks are false', () => {
    const result = filterLinks(sampleText, false, false);

    expect(result).toEqual([]);
  });

  test('should return an empty array if nothing matched in the string', () => {
    const result = filterLinks('string with no match', false, false);

    expect(result).toEqual([]);
  });

  test('should limit the number of results', () => {
    const result = filterLinks(sampleText, true, true, 2);
    expect(result).toEqual([
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk',
      'https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal',
    ]);
  });
});
