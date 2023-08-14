import { CnLink } from '../../objects';

describe('CnLink', () => {
  test('should be able to return a raw link from a raw link', () => {
    const href = 'https://weidian.com/item.html?itemID=3053526244';
    const link = new CnLink(href);
    expect(link.as('raw')).toStrictEqual(
      new URL('https://weidian.com/item.html?itemID=3053526244')
    );
  });

  test('should return an agent link from a raw link', () => {
    const href = 'https://weidian.com/item.html?itemID=3053526244';
    const link = new CnLink(href);
    expect(link.as('superbuy')).toStrictEqual(
      new URL(
        'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244'
      )
    );
  });

  test('should return an raw link from an agent link', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href);
    expect(link.as('raw')).toStrictEqual(
      new URL('https://weidian.com/item.html?itemID=3053526244')
    );
  });

  test('should return an agent link from an agent link', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href);
    expect(link.as('wegobuy')).toStrictEqual(
      new URL(
        'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244'
      )
    );
  });

  test('should be able to add affiliate link object', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href, { wegobuy: 'my-affiliate' });
    expect(link.as('wegobuy')).toStrictEqual(
      new URL(
        'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244&partnercode=my-affiliate'
      )
    );
  });

  test('should be able to add affiliate link with the as method', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href);
    expect(link.as('wegobuy', 'my-affiliate')).toStrictEqual(
      new URL(
        'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244&partnercode=my-affiliate'
      )
    );
  });

  test('should be able to add affiliate link with an ra tracker', () => {
    const href =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    const link = new CnLink(href);
    expect(link.as('pandabuy', 'my-affiliate', '999')).toStrictEqual(
      new URL(
        'https://www.pandabuy.com/product?ra=999&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244&inviteCode=my-affiliate'
      )
    );
  });
});
