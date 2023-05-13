import { toRaw } from '../toRaw';

describe('toRaw', () => {
  test('should generate the proper link from raw links for supported marketplaces (circular)', () => {
    // Supported marketplace: Taobao
    const taobaoLink = 'https://item.taobao.com/item.html?id=67890';
    const resultTaobao = toRaw(taobaoLink);
    expect(resultTaobao).toEqual(new URL(taobaoLink));

    // Supported marketplace: Tmall
    const tmallLink = 'https://detail.tmall.com/item_o.htm?id=12345';
    const resultTmall = toRaw(tmallLink);
    expect(resultTmall).toEqual(new URL(tmallLink));

    // Supported marketplace: Weidian
    const weidianLink = 'https://weidian.com/item.html?itemID=54321';
    const resultWeidian = toRaw(weidianLink);
    expect(resultWeidian).toEqual(new URL(weidianLink));

    // Supported marketplace: 1688
    const marketplaceLink = 'https://detail.1688.com/offer/98765.html';
    const resultMarketplace = toRaw(marketplaceLink);
    expect(resultMarketplace).toEqual(new URL(marketplaceLink));
  });

  test('should return undefined for unsupported marketplaces', () => {
    // Unsupported marketplace
    const unsupportedLink = 'https://example.com';
    const result = toRaw(unsupportedLink);
    expect(result).toBeUndefined();
  });

  test('should return undefined when the marketplace is defined but no id is defined', () => {
    // Raw agent with a detected marketplace but undefined id
    const rawAgentLink = 'https://detail.1688.com/offer/undefined.html';
    const result = toRaw(rawAgentLink);
    expect(result).toBeUndefined();
  });

  test('should generate the proper link with agent input', () => {
    // Wegobuy agent with Taobao link
    const wegobuyTaobaoLink =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D65047472341&partnercode=6t86Xk';
    const rawResultTaobao = 'https://item.taobao.com/item.htm?id=65047472341';
    expect(toRaw(wegobuyTaobaoLink)).toEqual(new URL(rawResultTaobao));

    // Wegobuy agent with Tmall link
    const wegobuyTmallLink =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fdetail.tmall.com%2Fitem.htm%3Fid%3D68545271521';
    const rawResultTmall = 'https://detail.tmall.com/item.htm?id=68545271521';
    expect(toRaw(wegobuyTmallLink)).toEqual(new URL(rawResultTmall));

    // Wegobuy agent with 1688 link
    const wegobuy1688Link =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fdetail.1688.com%2Foffer%2F672137348.html&partnercode=6t86Xk';
    const rawResult1688 = 'https://detail.1688.com/offer/672137348.html';
    expect(toRaw(wegobuy1688Link)).toEqual(new URL(rawResult1688));
  });

  test('should return the a valid raw link from encrypted cssbuy links', () => {
    // Inner link for CSSBUY
    const innerLinkCssbuy = 'https://weidian.com/item.html?itemID=12345';
    const resultCssbuy = toRaw(`https://www.cssbuy.com/item-micro-12345`);
    expect(resultCssbuy).toEqual(new URL(innerLinkCssbuy));

    // Inner link for CSSBUY 1688
    const innerLinkCssbuy1688 = 'https://detail.1688.com/offer/98765.html';
    const resultCssbuy1688 = toRaw(`https://www.cssbuy.com/item-1688-98765`);
    expect(resultCssbuy1688).toEqual(new URL(innerLinkCssbuy1688));

    // Inner link for CSSBUY Taobao
    const innerLinkCssbuyTaobao = 'https://item.taobao.com/item.html?id=67890';
    const resultCssbuyTaobao = toRaw(`https://www.cssbuy.com/item-67890`);
    expect(resultCssbuyTaobao).toEqual(new URL(innerLinkCssbuyTaobao));
  });
});
