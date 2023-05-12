import { detectMarketplace } from '../detectMarketplace';

describe('detectMarketplace', () => {
  it('detects weidian', () => {
    const url =
      'https://weidian.com/item.html?itemId=3053526244&vc_cps_track=1459920903_0_0';
    expect(detectMarketplace(url)).toBe('weidian');
  });

  it('detects tmall', () => {
    const url =
      'https://detail.tmall.com/item_o.htm?id=674029285425&pcdegrade=true&de_count=1';
    expect(detectMarketplace(url)).toBe('tmall');
  });

  it('detects taobao', () => {
    const url = 'https://item.taobao.com/item.htm?id=674029285425';
    expect(detectMarketplace(url)).toBe('taobao');
  });

  it('detects 1688', () => {
    const url = 'https://detail.1688.com/offer/610494659403.html';
    expect(detectMarketplace(url)).toBe('1688');
  });

  it('returns undefined for unknown platforms', () => {
    const url = 'https://unknown.com/path';
    expect(detectMarketplace(url)).toBeUndefined();
  });
});
