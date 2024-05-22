import { generateRawLink } from '../item/generateRawLink';
import type { Marketplace } from '../models';

describe('generateProperLink', () => {
  it('should generate a proper Weidian link', () => {
    const link = generateRawLink('weidian', '123456');
    expect(link).toEqual(
      new URL('https://weidian.com/item.html?itemID=123456')
    );
  });

  it('should generate a proper Taobao link', () => {
    const link = generateRawLink('taobao', '789012');
    expect(link).toEqual(new URL('https://item.taobao.com/item.htm?id=789012'));
  });

  it('should generate a proper 1688 link', () => {
    const link = generateRawLink('1688', '345678');
    expect(link).toEqual(new URL('https://detail.1688.com/offer/345678.html'));
  });

  it('should generate a proper Tmall link', () => {
    const link = generateRawLink('tmall', '901234');
    expect(link).toEqual(
      new URL('https://detail.tmall.com/item_o.htm?id=901234')
    );
  });

  it('should throw error for an unknown marketplace', () => {
    expect(() => {
      generateRawLink('unknown' as Marketplace, '567890');
    }).toThrowError('Unsupported marketplace: unknown');
  });
});
