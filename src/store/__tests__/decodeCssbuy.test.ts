import { decodeCssbuy } from '../decode/decodeCssbuy';

describe('Decode Cssbuy', () => {
  it('should get the valid id and marketplace', () => {
    const href =
      'https://cssbuy.com/productlist?t=taobao&shop=106592833&shop1=676198570';
    const result = decodeCssbuy(new URL(href));
    expect(result).toEqual({
      id: '106592833',
      marketplace: 'taobao',
    });
  });

  it('should work with 1688 links', () => {
    const href =
      'https://www.cssbuy.com/productlist?t=1688&shop=BBBhWYrn9o5vKbSMmUj1wJqSg';
    const result = decodeCssbuy(new URL(href));
    expect(result).toEqual({
      id: `b2b-BBBhWYrn9o5vKbSMmUj1wJqSg`,
      marketplace: '1688',
    });
  });

  it('should work with xianyu links', () => {
    const href =
      'https://www.cssbuy.com/productlist?t=xianyu&shop=913955170552';
    const result = decodeCssbuy(new URL(href));
    expect(result).toEqual({
      id: '913955170552',
      marketplace: 'xianyu',
    });
  });
});
