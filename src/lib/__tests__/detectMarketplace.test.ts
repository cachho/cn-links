import { generateMarketplaceLink } from '../../item/generateRawLink';
import { marketplaces } from '../../models';
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

  it('should detect taobao from a mobile link', () => {
    const url = 'https://m.intl.taobao.com/detail/detail.html?id=763706333392';
    expect(detectMarketplace(url)).toBe('taobao');
  });

  it('should detect taobao from a list link', () => {
    const url =
      'https://www.taobao.com/list/item/758067992163.htm?spm=a21wu.10013406-cat.taglist-content.1.56e938a4vsEyTK';
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

  it('detects agents when url search params are present', () => {
    const url =
      'https://item.taobao.com/item.htm?spm=a1z10.3-c.w4002-13979990307.10.46c7707e2PW6oL&id=691541677564';
    expect(detectMarketplace(url)).toBe('taobao');
  });

  it('should detect weidian from a store link', () => {
    const url = 'https://weidian.com/?userid=1625671124';
    expect(detectMarketplace(url)).toBe('weidian');
  });

  it('should detect taobao from a store link', () => {
    const url =
      'https://shop249029897.taobao.com/?spm=pc_detail.27183998.shop_block.dshopinfo.7fab7dd6JG7E0d';
    expect(detectMarketplace(url)).toBe('taobao');
  });

  it('should detect 1688 from a store link', () => {
    const url = 'https://m.1688.com/winport/b2b-22108725372987d9fa.html';
    expect(detectMarketplace(url)).toBe('1688');
  });

  test('should work for all marketplaces', () => {
    marketplaces.forEach((marketplace) => {
      const marketplaceLink = generateMarketplaceLink(marketplace, '0');
      expect(detectMarketplace(marketplaceLink)).toBe(marketplace);
    });
  });
});
