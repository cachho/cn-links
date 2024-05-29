import { decodePandabuy } from '../decode/decodePandabuy';

describe('Decode Pandabuy', () => {
  it('should be able to decode 1688 links with a o url parameter', () => {
    const url = new URL(
      'https://www.pandabuy.com/shopdetail?ra=282&t=alibaba&id=-1&o=shop1434560114962.1688.com'
    );
    const decoded = decodePandabuy(url);
    expect(decoded.marketplace).toEqual('1688');
    expect(decoded.id).toEqual('1434560114962');
  });

  it('should be able to handle mobile 1688 links', () => {
    const url = new URL(
      'https://www.pandabuy.com/shopdetail?ra=560&t=alibaba&id=b2b-22108725372987d9fa&o=m.1688.com'
    );
    const decoded = decodePandabuy(url);
    expect(decoded.marketplace).toEqual('1688');
    expect(decoded.id).toEqual('b2b-22108725372987d9fa');
  });
});
