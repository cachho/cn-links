import { isAgentLink } from '../isAgentLink';

describe('isAgentLink', () => {
  test('returns true for agent links', () => {
    const agentLinks = [
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk',
      'https://www.pandabuy.com/product?url=https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal',
      'https://m.superbuy.com/en/goodsdetail/?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D705339617848',
      'https://www.pandabuy.com/product?url=PJ9wmDFVd3v76X3rgKYsRxKKLjYDS%2BBFVp0GdAKYXCRMkx7gg84zB7SNapNjLwy7N2YcLYSO2fBXzdS67b9HMqOarCMoQC0MUE4E8w%3D%3D',
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

  test('returns false for non-valid URL input', () => {
    const invalidLinks = ['invalid-url', 'https://', 'ftp://example.com'];

    invalidLinks.forEach((link) => {
      expect(isAgentLink(link)).toBe(false);
    });
  });

  test('returns false for inputs to domain root without item path', () => {
    const rootLinks = [
      'https://www.wegobuy.com/',
      'https://www.pandabuy.com/',
      'https://detail.tmall.com/',
      'https://item.taobao.com/',
      'https://detail.1688.com/',
      'https://weidian.com/',
    ];

    rootLinks.forEach((link) => {
      expect(isAgentLink(link)).toBe(false);
    });
  });
});
