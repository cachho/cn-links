import { agents, marketplaces } from '../../models';
import { detectAgent } from '../detectAgent'; // adjust the import path to match your project structure
import { generateAgentLink } from '../generateAgentLink';
import { generateMarketplaceLink } from '../generateRawLink';

describe('detectAgent', () => {
  it('detects wegobuy', () => {
    const url =
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107';
    expect(detectAgent(url)).toBe('wegobuy');
  });

  // Add more tests for the other agents
  it('detects pandabuy', () => {
    const url =
      'https://www.pandabuy.com/product?url=https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal';
    expect(detectAgent(url)).toBe('pandabuy');
  });

  it('detects pandabuy from encrypted link', () => {
    const url =
      'https://www.pandabuy.com/product?url=PJ5n5VO1l8LhW0N+0JJ6FnmueQmNAvK0/sCOR+w+P4aGk2+v/a9B540jQePW8hwSjLxRwv+6HT6Ru8pY&utm_source=cart&utm_medium=pdb&utm_campaign=normal';
    expect(detectAgent(url)).toBe('pandabuy');
  });

  it('detects pandabuy from mobikle link', () => {
    const url =
      'https://m.pandabuy.com/product?url=https%3A%2F%2Fdetail.tmall.com%2Fitem.htm%3Fid%3D625144747417&inviteCode=84QGEFBNY';
    expect(detectAgent(url)).toBe('pandabuy');
  });

  it('detects superbuy', () => {
    const url =
      'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244';
    expect(detectAgent(url)).toBe('superbuy');
  });

  it('detects cssbuy', () => {
    const url = 'https://www.cssbuy.com/item-micro-4472563293.html';
    expect(detectAgent(url)).toBe('cssbuy');
  });

  it('detects sugargoo', () => {
    const url =
      'https://sugargoo.com/#/home/productDetail?productLink=https://detail.tmall.com/item.htm?abbucket=6%26id=674029285425%26ns=1%26spm=a230r.1.14.1.371c328a3TkJ9Q';
    expect(detectAgent(url)).toBe('sugargoo');
  });

  it('detects hagobuy', () => {
    const url =
      'https://www.hagobuy.com/item/details?url=https%3A%2F%2Fitem.taobao.com%2Fitem.html%3Fid%3D543109184027';
    expect(detectAgent(url)).toBe('hagobuy');
  });

  it('detects kameymall', () => {
    const url =
      'https://www.kameymall.com/purchases/search/item?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D6481396504';
    expect(detectAgent(url)).toBe('kameymall');
  });

  it('detects cnfans', () => {
    const url = 'https://cnfans.com/product/?shop_type=taobao&id=61677060611';
    expect(detectAgent(url)).toBe('cnfans');
  });

  it('detects ezbuycn', () => {
    const url = 'https://ezbuycn.com/jiexi.aspx?id=3062&ids=6308093508';
    expect(detectAgent(url)).toBe('ezbuycn');
  });

  test('should work for all agents and marketplaces', () => {
    marketplaces.forEach((marketplace) => {
      agents.forEach((agent) => {
        const marketplaceLink = generateMarketplaceLink(marketplace, '0');
        const rawLink = generateAgentLink(agent, marketplaceLink);
        expect(detectAgent(rawLink)).toBe(agent);
      });
    });
  });
});
