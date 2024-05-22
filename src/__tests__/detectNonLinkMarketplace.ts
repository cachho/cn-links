import { detectNonLinkMarketplace } from '../item/detectNonLinkMarketplace';

describe('detectMarketplace', () => {
  it('detects weidian', () => {
    const url = 'https://account.x.yupoo.com';
    expect(detectNonLinkMarketplace(url)).toBe('yupoo');
  });

  it('returns undefined for unknown platforms', () => {
    const url = 'https://unknown.com/path';
    expect(detectNonLinkMarketplace(url)).toBeUndefined();
  });
});
