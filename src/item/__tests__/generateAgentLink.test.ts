import { generateAgentLink } from '../generateAgentLink';

describe('generateAgentLink', () => {
  const innerLink = 'https://weidian.com/item.html?itemID=2724693540';
  const marketplace = 'weidian';
  const id = '2724693540';
  const referral = 'myC0d3';

  test('generates pandabuy link correctly', () => {
    const agent = 'pandabuy';
    const expected = new URL(
      `https://www.pandabuy.com/product?ra=1&url=${encodeURIComponent(
        innerLink
      )}&inviteCode=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
  });

  test('pandabuy link works with ra', () => {
    const agent = 'pandabuy';
    const expected = new URL(
      `https://www.pandabuy.com/product?ra=999&url=${encodeURIComponent(
        innerLink
      )}&inviteCode=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral, '999');

    expect(result).toEqual(expected);
  });

  test('generates wegobuy link correctly', () => {
    const agent = 'wegobuy';
    const expected = new URL(
      `https://www.wegobuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(
        innerLink
      )}&partnercode=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
  });

  test('generates superbuy link correctly', () => {
    const agent = 'superbuy';
    const expected = new URL(
      `https://www.superbuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(
        innerLink
      )}&partnercode=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
  });

  test('generates superbuy link without referral correctly', () => {
    const agent = 'superbuy';
    const expected = new URL(
      `https://www.superbuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(
        innerLink
      )}`
    );

    const result = generateAgentLink(agent, marketplace, id);

    expect(result).toEqual(expected);
  });

  test('generates sugargoo link correctly', () => {
    const agent = 'sugargoo';
    // Sugargoo likes double encodings
    const expected = new URL(
      `https://www.sugargoo.com/#/home/productDetail?productLink=${encodeURIComponent(
        encodeURIComponent(innerLink)
      )}&memberId=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
  });

  test('generates cssbuy link correctly', () => {
    const agent = 'cssbuy';
    const expected = new URL(
      `https://www.cssbuy.com/item-micro-${id}.html?promotionCode=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
  });

  test('generates hagobuy link correctly', () => {
    const agent = 'hagobuy';
    const expected = new URL(
      `https://www.hagobuy.com/item/details?url=${encodeURIComponent(
        innerLink
      )}&affcode=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
  });

  test('generates kameymall link correctly', () => {
    const agent = 'kameymall';
    const expected = new URL(
      `https://www.kameymall.com/purchases/search/item?url=${encodeURIComponent(
        innerLink
      )}&code=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
  });

  test('generates cnfans link correctly', () => {
    const agent = 'cnfans';
    const expected = new URL(
      `https://cnfans.com/product/?shop_type=weidian&id=${id}&ref=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
  });

  test('generates mulebuy link correctly', () => {
    const agent = 'mulebuy';
    const expected = new URL(
      `https://mulebuy.com/product/?shop_type=${marketplace}&id=${id}&ref=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result.href).toEqual(expected.href);
  });

  test('generates ezbuycn link correctly', () => {
    const agent = 'ezbuycn';
    const expected = new URL(
      `https://ezbuycn.com/api/chaid.aspx?key=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D${id}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
    expect(result.href).not.toContain(referral); // Affiliate links are not supported
  });

  test('generates basetao tmall link as taobao link', () => {
    const agent = 'basetao';
    const expected = new URL(
      'https://www.basetao.com/best-taobao-agent-service/products/agent/taobao/738528616020.html'
    );

    const result = generateAgentLink(agent, 'tmall', '738528616020', referral);

    expect(result).toEqual(expected);
    expect(result.href).not.toContain(referral); // Affiliate links are not supported
  });

  it('should not include unsanitized parts', () => {
    const agent = 'hagobuy';

    const result = generateAgentLink(agent, marketplace, id, referral);

    const expected = new URL(
      `https://www.hagobuy.com/item/details?url=${encodeURIComponent(
        `${innerLink}&spm=as8df7a87sdf78asdf`
      )}&affcode=${referral}`
    );

    expect(result).not.toEqual(expected);
  });

  test('generates raw link correctly', () => {
    const agent = 'raw';
    const expected = new URL(innerLink);

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
  });
});
