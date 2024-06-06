import { decodeMulebuy } from '../decode/decodeMulebuy';

describe('Decode Mulebuy', () => {
  it('should get the valid id and marketplace', () => {
    const href =
      'https://mulebuy.com/shops/?shop_type=taobao&shop_id=106592832&num=1&sort=default';
    const result = decodeMulebuy(new URL(href));
    expect(result).toEqual({
      id: '106592832',
      marketplace: 'taobao',
    });
  });
});
