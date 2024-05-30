import { marketplaces } from '../../models';
import { extractId } from '../extractId';
import { generateRawLink } from '../generateRawLink';

describe('extractId', () => {
  test('should extract the correct ID for Weidian link', () => {
    const href = 'https://weidian.com/?userid=1625671124';
    const id = extractId(href, 'weidian');
    expect(id).toBe('1625671124');
  });

  test('should be able to extract an ID from a weidian item store link', () => {
    const href =
      'https://shop1866344120.v.weidian.com/item.html?itemID=4161541590&spider_token=82d0';
    const id = extractId(href, 'weidian');
    expect(id).toBe('shop1866344120');
  });

  test('should extract the correct ID for regular Taobao link', () => {
    const href = 'https://shop106592833.taobao.com/';
    const id = extractId(href, 'taobao');
    expect(id).toBe('106592833');
  });

  it('should be able to extract an id from vanity taobao links', () => {
    const href =
      'https://lyb2528.taobao.com/index.htm?spm=a1z10.1-c-s.w5002-17123004230.2.39b27e1bkofvpK';
    const id = extractId(href, 'taobao');
    expect(id).toBe('lyb2528');
  });

  it('should be able to extract an id from taobao world links', () => {
    const href = 'https://shop57074988.world.taobao.com/';
    const id = extractId(href, 'taobao');
    expect(id).toBe('57074988');
  });

  test('should extract the correct ID for 1688 link', () => {
    const href =
      'https://shop1434560114962.1688.com/page/index.html?spm=0.0.wp_pc_common_header_companyName_undefined.0';
    const id = extractId(href, '1688');
    expect(id).toBe('1434560114962');
  });

  test('should extract the correct ID for 1688 mobile link', () => {
    const href = 'https://m.1688.com/winport/b2b-22108725372987d9fa.html';
    const id = extractId(href, '1688');
    expect(id).toBe('b2b-22108725372987d9fa');
  });

  test('should extract the correct ID for Tmall link', () => {
    const href = 'https://detail.tmall.com/item_o.htm?id=674029285425';
    const id = extractId(href, 'tmall');
    expect(id).toBe('674029285425');
  });

  test('should throw Error for unknown marketplace', () => {
    const href = 'https://example.com/Jest';
    expect(() => extractId(href)).toThrowError(
      'Tried to extract id, but could not determine marketplace from string: https://example.com/Jest'
    );
  });

  test('should work for all marketplaces', () => {
    // This function only has to work with previously sanitized raw links
    const testId = '6481396504';
    marketplaces.forEach((marketplace) => {
      const rawLink = generateRawLink(marketplace, testId);
      expect(extractId(rawLink)).toBe(testId);
    });
  });
});
