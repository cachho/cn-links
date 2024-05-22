import { marketplaces } from '../../models';
import { extractId } from '../extractId';
import { generateMarketplaceLink } from '../generateRawLink';

describe('extractId', () => {
  test('should extract the correct ID for Weidian link', () => {
    const href = 'https://weidian.com/item.html?itemID=3053526244';
    const id = extractId(href, 'weidian');
    expect(id).toBe('3053526244');
  });

  test('should extract the correct ID for Weidian link with subdomain', () => {
    const href =
      'https://shop1622368742.v.weidian.com/item.html?itemID=5418645465';
    const id = extractId(href, 'weidian');
    expect(id).toBe('5418645465');
  });

  test('should extract the correct ID for regular Taobao link', () => {
    const href = 'https://item.taobao.com/item.html?id=674029285425';
    const id = extractId(href, 'taobao');
    expect(id).toBe('674029285425');
  });

  test('should extract the correct ID for Taobao link with world subdomain', () => {
    const href = 'https://world.taobao.com/item/674029285425.htm';
    const id = extractId(href, 'taobao');
    expect(id).toBe('674029285425');
  });

  it('should be able to extract the id from a mobile taobao link', () => {
    const href = 'https://m.intl.taobao.com/detail/detail.html?id=763706333392';
    const id = extractId(href, 'taobao');
    expect(id).toBe('763706333392');
  });

  test('should extract the correct ID for 1688 link', () => {
    const href = 'https://detail.1688.com/offer/610494659403.html';
    const id = extractId(href, '1688');
    expect(id).toBe('610494659403');
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

  test('should successfully detect the marketplace and extract the ID', () => {
    const href = 'https://item.taobao.com/item.html?id=987654321';
    const id = extractId(href);
    expect(id).toBe('987654321');
  });

  test('should successfully detect the marketplace and extract the ID when there are params', () => {
    const href =
      'https://item.taobao.com/item.htm?spm=a1z10.3-c.w4002-13979990307.10.46c7707e2PW6oL&id=691541677564';
    const id = extractId(href);
    expect(id).toBe('691541677564');
  });

  test('should work for all marketplaces', () => {
    // Does not cover abstractions of marketplaces, such as world.taobao.com
    const testId = '6481396504';
    marketplaces.forEach((marketplace) => {
      const rawLink = generateMarketplaceLink(marketplace, testId);
      expect(extractId(rawLink)).toBe(testId);
    });
  });
});
