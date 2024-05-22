import { generateRawLink } from '../generateRawLink';

describe('generateRawLink', () => {
  it('should be able to generate a taobao link', () => {
    const link = generateRawLink('taobao', '314120750');
    expect(link).toEqual(new URL('https://shop314120750.taobao.com/'));
  });

  it('should be able to generate a weidian link', () => {
    const link = generateRawLink('weidian', '16256711243');
    expect(link).toEqual(new URL('https://weidian.com/?userid=16256711243'));
  });

  it('should be able to generate a 1688 link', () => {
    const link = generateRawLink('1688', '22108725372987d9fa');
    expect(link).toEqual(
      new URL('https://m.1688.com/winport/b2b-22108725372987d9fa.html')
    );
  });

  it('should handle tmall as taobao', () => {
    const link = generateRawLink('tmall', '314120750');
    expect(link).toEqual(new URL('https://shop314120750.taobao.com/'));
  });
});
