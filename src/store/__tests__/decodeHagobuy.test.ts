import { decodeHagobuy } from '../decode/decodeHagobuy';

describe('Decode Hagobuy', () => {
  it('should get the valid id and marketplace', () => {
    const href =
      'https://www.hagobuy.com/item/store?url=https%3A%2F%2Fshop106592833.taobao.com';
    const result = decodeHagobuy(new URL(href));
    expect(result).toEqual({
      id: '106592833',
      marketplace: 'taobao',
    });
  });
});
