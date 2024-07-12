import { isAgentLink } from '../isAgentLink';

describe('isAgentLink', () => {
  test('returns true for agent links', () => {
    const agentLinks = [
      'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D4906851107&partnercode=6t86Xk',
      'https://www.pandabuy.com/product?url=https://item.taobao.com/item.htm?id=673535501707&utm_source=pop&utm_medium=pdb&utm_campaign=normal',
      'https://m.superbuy.com/en/goodsdetail/?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D705339617848',
      'https://www.pandabuy.com/product?url=PJ9wmDFVd3v76X3rgKYsRxKKLjYDS%2BBFVp0GdAKYXCRMkx7gg84zB7SNapNjLwy7N2YcLYSO2fBXzdS67b9HMqOarCMoQC0MUE4E8w%3D%3D',
      'https://eastmallbuy.com/index/item/index.html?searchlang=en&url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D781807828904',
      'https://cnfans.com/fr/product/?shop_type=taobao&id=726145768645',
      'https://mulebuy.com/zh/product/?shop_type=taobao&id=726526607194',
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

  it('should return false if the link is not a valid cn-link', () => {
    const link =
      'https://www.kameymall.com/purchases/1730295605736697858/%E3%80%90%E6%9C%80%E9%AB%98%E7%89%88%E6%9C%AC%E3%80%91%E7%99%BE%E6%90%ADchrome-hearts%E5%85%8B%E7%BD%97%E5%BF%83%E9%A1%B9%E9%93%BE-%E5%85%8B%E7%BD%97%E5%BF%83%E5%8F%8C%E5%8D%81%E5%AD%97%E6%9E%B6%E6%83%85%E4%BE%A3%E9%A1%B9%E9%93%BE-%E6%BD%AE%E6%B5%81%E7%94%B7%E5%A3%AB%E5%A5%B3%E5%A3%AB%E5%8D%81%E5%AD%97%E6%9E%B6%E9%A1%B9%E9%93%BE%E5%A5%97%E9%93%BE';
    expect(isAgentLink(link)).toBe(false);
  });
});
