import { isRawLink } from '../isRawLink';

describe('isRawLink', () => {
  it('should return true for a valid Weidian link', () => {
    const href = 'https://weidian.com/?userid=1625671124';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Taobao link', () => {
    const href =
      'https://shop249029897.taobao.com/?spm=pc_detail.27183998.shop_block.dshopinfo.7fab7dd6JG7E0d';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid 1688 link', () => {
    const href = 'https://m.1688.com/winport/b2b-22108725372987d9fa.html';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Weidian subdomain link', () => {
    const href = 'https://shop232138271.v.weidian.com/?userid=232138271';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });
});
