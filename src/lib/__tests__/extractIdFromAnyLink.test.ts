import { agents, marketplaces } from '../../models';
import { extractIdFromAnyLink } from '../extractIdFromAnyLink';
import { generateAgentLink } from '../generateAgentLink';
import { generateMarketplaceLink } from '../generateRawLink';

describe('extractId', () => {
  test('should extract the correct ID for Weidian link', () => {
    const href = 'https://weidian.com/item.html?itemID=3053526244';
    const id = extractIdFromAnyLink(href, 'weidian');
    expect(id).toBe('3053526244');
  });

  test('should extract the correct ID for regular Taobao link', () => {
    const href = 'https://item.taobao.com/item.html?id=674029285425';
    const id = extractIdFromAnyLink(href, 'taobao');
    expect(id).toBe('674029285425');
  });

  test('should extract the correct ID for Taobao link with world subdomain', () => {
    const href = 'https://world.taobao.com/item/674029285425.htm';
    const id = extractIdFromAnyLink(href, 'taobao');
    expect(id).toBe('674029285425');
  });

  test('should extract the correct ID for 1688 link', () => {
    const href = 'https://detail.1688.com/offer/610494659403.html';
    const id = extractIdFromAnyLink(href, '1688');
    expect(id).toBe('610494659403');
  });

  test('should extract the correct ID for Tmall link', () => {
    const href = 'https://detail.tmall.com/item_o.htm?id=674029285425';
    const id = extractIdFromAnyLink(href, 'tmall');
    expect(id).toBe('674029285425');
  });

  test('should throw Error for unknown marketplace', () => {
    const href = 'https://example.com/Jest';
    expect(() => extractIdFromAnyLink(href)).toThrowError(
      'Marketplace could not be detected, link cannot be converted to raw: https://example.com/Jest'
    );
  });

  test('should successfully detect the marketplace and extract the ID', () => {
    const href = 'https://item.taobao.com/item.html?id=987654321';
    const id = extractIdFromAnyLink(href);
    expect(id).toBe('987654321');
  });

  test('agent link inputs should also work', () => {
    const href =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D674029285425&partnercode=6t86Xk';
    const id = extractIdFromAnyLink(href, 'taobao');
    expect(id).toBe('674029285425');
  });

  test('should work with double encoded agent links', () => {
    const href =
      'https://www.sugargoo.com/#/home/productDetail?productLink=https%253A%252F%252Fweidian.com%252Fitem.html%253FitemID%253D5418645467%2526spider_token%253D4572';
    const id = extractIdFromAnyLink(href, 'weidian');
    expect(id).toBe('5418645467');
  });

  test('should work for all agents and marketplaces', () => {
    const testId = '6481396504';
    marketplaces.forEach((marketplace) => {
      agents.forEach((agent) => {
        const marketplaceLink = generateMarketplaceLink(marketplace, testId);
        expect(extractIdFromAnyLink(marketplaceLink)).toBe(testId);
        const rawLink = generateAgentLink(agent, marketplaceLink);
        expect(extractIdFromAnyLink(rawLink)).toBe(testId);
      });
    });
  });
});
