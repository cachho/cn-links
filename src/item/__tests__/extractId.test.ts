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

  it('should be able to extract a link from taobao lists', () => {
    const href =
      'https://www.taobao.com/list/item/758067992163.htm?spm=a21wu.10013406-cat.taglist-content.1.56e938a4vsEyTK';
    const id = extractId(href, 'taobao');
    expect(id).toBe('758067992163');
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

  test('should work with weidian store item link', () => {
    const href =
      'https://shop1622368742.v.weidian.com/item.html?itemID=5418645465';
    const id = extractId(href, 'weidian');
    expect(id).toBe('5418645465');
  });

  test('should work with taobao asset links', () => {
    const href =
      'https://assets-tmw.taobao.com/app/tmall-ovs-rax/share_page/home?targetType=ITEM&targetId=689584596676&sign=d3b29289dc15136727f8f9ac70a594ae&site=SG&language=en_US&targetUrl=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fut_sk%3D1.Zupb7jk%2BfvYDAAYpxXO%2BqQ7b_21380790_1728424955112.Copy.1_SG%26id%3D689584596676%26sourceType%3Ditem%26price%3D188%26suid%3DE7471A87-DB9A-4667-AC10-8BB123830235%26un%3D0905237fa8713a7535fb4832ebf8423e%26share_crt_v%3D1%26un_site%3D0%26spm%3Da2159r.13376460.0.0%26tbSocialPopKey%3DshareItem%26sp_tk%3DbTY2TjNrY3Y2UVU%3D';
    const id = extractId(href, 'taobao');
    expect(id).toBe('689584596676');
  });

  it('should work with weidian item.html links', () => {
    const href =
      'https://weidian.com/item.html?itemID=7240382968&sa=D&source=editors&ust=1730201953662241&usg=AOvVaw1SDREQEPD_-pc9VCz57GDg';
    const id = extractId(href, 'weidian');
    expect(id).toBe('7240382968');
  });

  it('should work with taobao list items', () => {
    const href = 'https://www.taobao.com/list/item/693643886079.htm';
    const id = extractId(href, 'taobao');
    expect(id).toBe('693643886079');
  });

  it('should work with broken links', () => {
    const href =
      'https://weidian.com/item.html?itemID%3D7240382968&sa=D&source=editors&ust=1730201953662241&usg=AOvVaw1SDREQEPD_-pc9VCz57GDg';
    const id = extractId(href, 'weidian');
    expect(id).toBe('7240382968');
  });
});
