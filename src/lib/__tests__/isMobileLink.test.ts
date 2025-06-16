import { getMobileMarketplace, isMobileLink } from '../isMobileLink';

describe('isMobileLink', () => {
  it('should detect Xianyu mobile links', () => {
    expect(isMobileLink('https://m.tb.cn/h.hZH53PB?tk=SBeXVJMVxap')).toBe(true);
    expect(
      isMobileLink(new URL('https://m.tb.cn/h.hZH53PB?tk=SBeXVJMVxap'))
    ).toBe(true);
  });

  it('should detect Taobao mobile links', () => {
    expect(
      isMobileLink('https://e.tb.cn/h.hZH5WmfaS8hKKDC?tk=H0QDVJMVmMe')
    ).toBe(true);
    expect(
      isMobileLink(new URL('https://e.tb.cn/h.hZH5WmfaS8hKKDC?tk=H0QDVJMVmMe'))
    ).toBe(true);
  });

  it('should detect 1688 mobile links', () => {
    expect(isMobileLink('https://qr.1688.com/s/Oe9AAOMO')).toBe(true);
    expect(isMobileLink(new URL('https://qr.1688.com/s/Oe9AAOMO'))).toBe(true);
  });

  it('should detect Weidian mobile links', () => {
    expect(
      isMobileLink(
        'https://k.youshop10.com/f8DjKGQd?a=b&p=iphone&wfr=BuyercopyURL&share_relation=5c1997b193f3dfa6_1554610308_1'
      )
    ).toBe(true);
    expect(
      isMobileLink(
        new URL(
          'https://k.youshop10.com/f8DjKGQd?a=b&p=iphone&wfr=BuyercopyURL&share_relation=5c1997b193f3dfa6_1554610308_1'
        )
      )
    ).toBe(true);
  });

  it('should return false for regular PC links', () => {
    expect(isMobileLink('https://item.taobao.com/item.htm?id=123456')).toBe(
      false
    );
    expect(isMobileLink('https://www.goofish.com/item?id=931096858778')).toBe(
      false
    );
    expect(
      isMobileLink('https://detail.1688.com/offer/610494659403.html')
    ).toBe(false);
    expect(
      isMobileLink('https://weidian.com/item.html?itemId=3053526244')
    ).toBe(false);
  });

  it('should return false for agent links', () => {
    expect(
      isMobileLink(
        'https://www.pandabuy.com/product?ra=1&url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D123456'
      )
    ).toBe(false);
    expect(isMobileLink('https://www.cssbuy.com/item-123456.html')).toBe(false);
  });

  it('should return false for unknown domains', () => {
    expect(isMobileLink('https://unknown.com/path')).toBe(false);
    expect(isMobileLink('https://example.com/mobile')).toBe(false);
  });
});

describe('getMobileMarketplace', () => {
  it('should return correct marketplace for mobile links', () => {
    expect(
      getMobileMarketplace('https://m.tb.cn/h.hZH53PB?tk=SBeXVJMVxap')
    ).toBe('xianyu');
    expect(
      getMobileMarketplace('https://e.tb.cn/h.hZH5WmfaS8hKKDC?tk=H0QDVJMVmMe')
    ).toBe('taobao');
    expect(getMobileMarketplace('https://qr.1688.com/s/Oe9AAOMO')).toBe('1688');
    expect(
      getMobileMarketplace(
        'https://k.youshop10.com/f8DjKGQd?a=b&p=iphone&wfr=BuyercopyURL&share_relation=5c1997b193f3dfa6_1554610308_1'
      )
    ).toBe('weidian');
  });

  it('should return undefined for non-mobile links', () => {
    expect(
      getMobileMarketplace('https://item.taobao.com/item.htm?id=123456')
    ).toBeUndefined();
    expect(
      getMobileMarketplace('https://www.goofish.com/item?id=931096858778')
    ).toBeUndefined();
    expect(
      getMobileMarketplace('https://detail.1688.com/offer/610494659403.html')
    ).toBeUndefined();
    expect(getMobileMarketplace('https://unknown.com/path')).toBeUndefined();
  });

  it('should work with URL objects', () => {
    expect(
      getMobileMarketplace(new URL('https://m.tb.cn/h.hZH53PB?tk=SBeXVJMVxap'))
    ).toBe('xianyu');
    expect(
      getMobileMarketplace(
        new URL('https://e.tb.cn/h.hZH5WmfaS8hKKDC?tk=H0QDVJMVmMe')
      )
    ).toBe('taobao');
  });
});
