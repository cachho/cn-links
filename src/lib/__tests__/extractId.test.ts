import { extractId } from '../extractId';

describe('extractId', () => {
  it('should extract the correct ID for Weidian link', () => {
    const href = 'https://weidian.com/item.html?itemID=3053526244';
    const id = extractId(href, 'weidian');
    expect(id).toBe('3053526244');
  });

  it('should extract the correct ID for regular Taobao link', () => {
    const href = 'https://item.taobao.com/item.html?id=674029285425';
    const id = extractId(href, 'taobao');
    expect(id).toBe('674029285425');
  });

  it('should extract the correct ID for Taobao link with world subdomain', () => {
    const href = 'https://world.taobao.com/item/674029285425.htm';
    const id = extractId(href, 'taobao');
    expect(id).toBe('674029285425');
  });

  it('should extract the correct ID for 1688 link', () => {
    const href = 'https://detail.1688.com/offer/610494659403.html';
    const id = extractId(href, '1688');
    expect(id).toBe('610494659403');
  });

  it('should extract the correct ID for Tmall link', () => {
    const href = 'https://detail.tmall.com/item_o.htm?id=674029285425';
    const id = extractId(href, 'tmall');
    expect(id).toBe('674029285425');
  });

  it('should return null for unknown marketplace', () => {
    const href = 'https://example.com';
    const id = extractId(href);
    expect(id).toBeUndefined();
  });

  it('should successfully detect the marketplace and extract the ID', () => {
    const href = 'https://item.taobao.com/item.html?id=987654321';
    const id = extractId(href);
    expect(id).toBe('987654321');
  });
});
