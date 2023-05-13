import { isAgentLink } from '../isAgentLink';

describe('isAgentLink', () => {
  test('returns true for agent links', () => {
    const agentLinks = [
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk',
      'https://www.pandabuy.com/product?url=https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal',
    ];

    agentLinks.forEach((link) => {
      expect(isAgentLink(link)).toBe(true);
    });
  });

  test('returns false for non-agent links', () => {
    const nonAgentLinks = [
      'https://detail.tmall.com/item_o.htm?id=674029285425&pcdegrade=true&de_count=1',
      'https://item.taobao.com/item.htm?id=674029285425',
      'https://detail.1688.com/offer/610494659403.html',
      'https://weidian.com/item.html?itemID=5789470155',
    ];

    nonAgentLinks.forEach((link) => {
      expect(isAgentLink(link)).toBe(false);
    });
  });
});
