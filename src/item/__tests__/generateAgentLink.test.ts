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
      `https://cnfans.com/product?id=7262488758&platform=WEIDIAN&ref=0`
    );

    const result = generateAgentLink(agent, 'weidian', '7262488758', '0');

    expect(result.href).toEqual(expected.href);
  });

  test('generates mulebuy link correctly', () => {
    const agent = 'mulebuy';
    const expected = new URL(
      `https://mulebuy.com/product?id=${id}&platform=${marketplace.toUpperCase()}&ref=${referral}`
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

  it('should generate oopbuy links', () => {
    const agent = 'oopbuy';
    const expected = new URL(
      `https://www.oopbuy.com/product/weidian/7231813762?inviteCode=${referral}`
    );

    const result = generateAgentLink(agent, 'weidian', '7231813762', referral);
    expect(result.href).toEqual(expected.href);
  });

  it('should generate lovegobuy links correctly', () => {
    const agent = 'lovegobuy';
    const expected = new URL(
      `https://www.lovegobuy.com/product?id=${id}&shop_type=${marketplace}&invite_code=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result.href).toEqual(expected.href);
  });

  it('should generate lovegobuy tmall links as taobao links', () => {
    const agent = 'lovegobuy';
    const expected = new URL(
      `https://www.lovegobuy.com/product?id=${id}&shop_type=taobao&invite_code=${referral}`
    );

    const result = generateAgentLink(agent, 'tmall', id, referral);

    expect(result.href).toEqual(expected.href);
  });

  it('should generate blikbuy links correctly', () => {
    const agent = 'blikbuy';
    const expected = new URL(
      `https://www.blikbuy.com/?go=item&url=${encodeURIComponent(
        innerLink
      )}&icode=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result.href).toEqual(expected.href);
  });

  it('should generate ponybuy links correctly', () => {
    const agent = 'ponybuy';
    const expected = new URL(
      `https://www.ponybuy.com/en-gb/goods?tracking=${referral}&product_id=${id}&platform=${marketplace}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result.href).toEqual(expected.href);
  });

  it('should generate panglobalbuy links correctly', () => {
    const agent = 'panglobalbuy';
    const expected = new URL(
      `https://panglobalbuy.com/#/details?type=3&offerId=${id}&share_id=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result.href).toEqual(expected.href);
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

  it('should generate a correct sifubuy link', () => {
    const agent = 'sifubuy';
    const expected = new URL(
      `https://www.sifubuy.com/detail?invite_code=${referral}&id=${id}&type=4`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result.href).toEqual(expected.href);
  });

  it('should generate a correct loongbuy link', () => {
    const agent = 'loongbuy';
    const expected = new URL(
      'https://www.loongbuy.com/product-details?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D675330231412'
    );

    const result = generateAgentLink(agent, 'taobao', '675330231412');

    expect(result.href).toEqual(expected.href);
  });

  it('should correctly generate a lovegobuy 1688 link', () => {
    const agent = 'lovegobuy';
    const expected = new URL(
      `https://www.lovegobuy.com/product?id=${id}&shop_type=ali_1688&invite_code=${referral}`
    );

    const result = generateAgentLink(agent, '1688', id, referral);

    expect(result.href).toEqual(expected.href);
  });

  it('should generate itaobuy links correctly', () => {
    const agent = 'itaobuy';
    // https://www.itaobuy.com/product-detail?url=https://detail.tmall.com/item.htm?id=675330231401&inviteCode=UN8A4YUS
    const expected = new URL(
      `https://www.itaobuy.com/product-detail?url=${encodeURIComponent(
        innerLink
      )}&inviteCode=${referral}`
    );
    const result = generateAgentLink(agent, marketplace, id, referral);
    expect(result.href).toEqual(expected.href);
  });

  it('should generate the new joyagoo format', () => {
    const agent = 'joyagoo';
    const expected = new URL(
      `https://joyagoo.com/product?id=916300281215&platform=TAOBAO`
    );
    const result = generateAgentLink(agent, 'taobao', '916300281215');
    expect(result.href).toEqual(expected.href);
  });

  it('should generate usfans links correctly', () => {
    // https://www.usfans.com/product/3/676700562213?ref=AFF
    const agent = 'usfans';
    const expected = new URL(
      `https://www.usfans.com/product/3/${id}?ref=${referral}`
    );
    const result = generateAgentLink(agent, marketplace, id, referral);
    expect(result.href).toEqual(expected.href);
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
