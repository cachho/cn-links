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

    const result = generateAgentLink(
      agent,
      innerLink,
      id,
      marketplace,
      referral
    );

    expect(result).toEqual(expected);
  });

  test('generates wegobuy link correctly', () => {
    const agent = 'wegobuy';
    const expected = new URL(
      `https://www.wegobuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(
        innerLink
      )}&partnercode=${referral}`
    );

    const result = generateAgentLink(
      agent,
      innerLink,
      id,
      marketplace,
      referral
    );

    expect(result).toEqual(expected);
  });

  test('generates superbuy link correctly', () => {
    const agent = 'superbuy';
    const expected = new URL(
      `https://www.superbuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(
        innerLink
      )}&partnercode=${referral}`
    );

    const result = generateAgentLink(
      agent,
      innerLink,
      id,
      marketplace,
      referral
    );

    expect(result).toEqual(expected);
  });

  test('generates sugargoo link correctly', () => {
    const agent = 'sugargoo';
    const expected = new URL(
      `https://www.sugargoo.com/index/item/index.html?productLink=${encodeURIComponent(
        innerLink
      )}&memberId=${referral}`
    );

    const result = generateAgentLink(
      agent,
      innerLink,
      id,
      marketplace,
      referral
    );

    expect(result).toEqual(expected);
  });

  test('generates cssbuy link correctly', () => {
    const agent = 'cssbuy';
    const expected = new URL(
      `https://www.cssbuy.com/item-micro-${id}?promotionCode=${referral}`
    );

    const result = generateAgentLink(
      agent,
      innerLink,
      id,
      marketplace,
      referral
    );

    expect(result).toEqual(expected);
  });

  test('generates hagobuy link correctly', () => {
    const agent = 'hagobuy';
    const expected = new URL(
      `https://www.hagobuy.com/item/details?url=${encodeURIComponent(
        innerLink
      )}&affcode=${referral}`
    );

    const result = generateAgentLink(
      agent,
      innerLink,
      id,
      marketplace,
      referral
    );

    expect(result).toEqual(expected);
  });

  test('link is not cleaned (not equal is used on purpose)', () => {
    const agent = 'hagobuy';
    const expected = new URL(
      `https://www.hagobuy.com/item/details?url=${encodeURIComponent(
        innerLink
      )}&affcode=${referral}`
    );

    const result = generateAgentLink(
      agent,
      `${innerLink}&spm=as8df7a87sdf78asdf`,
      id,
      marketplace,
      referral
    );

    expect(result).not.toEqual(expected);
  });

  test('generates raw link correctly', () => {
    const agent = 'raw';
    const expected = new URL(innerLink);

    const result = generateAgentLink(
      agent,
      innerLink,
      id,
      marketplace,
      referral
    );

    expect(result).toEqual(expected);
  });
});
