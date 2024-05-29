import { agents, marketplaces } from '../../models';
import { generateAgentLink } from '../generateAgentLink';
import { generateRawLink } from '../generateRawLink';
import { isRawLink } from '../isRawLink';

describe('isRawLink', () => {
  it('should return true for a valid Weidian link', () => {
    const href = 'https://weidian.com/?userid=1625671124';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Taobao link', () => {
    const href =
      'https://shop249029897.taobao.com/?spm=pc_detail.27183998.shop_block.dshopinfo.7fab7dd6JG7E0d';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid mobile 1688 link', () => {
    const href = 'https://m.1688.com/winport/b2b-22108725372987d9fa.html';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid desktop 1688 link', () => {
    const href =
      'https://shop1434560114962.1688.com/page/index.html?spm=0.0.wp_pc_common_header_companyName_undefined.0';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for a valid Weidian subdomain link', () => {
    const href = 'https://shop232138271.v.weidian.com/?userid=232138271';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should return true for chinese mainland taobao links', () => {
    const href =
      'https://world.taobao.com/dianpu/57303596.htm?spm=a21wu.12321156.shop-area.2.3a5a2581HMQz0Q';
    const result = isRawLink(href);
    expect(result).toBe(true);
  });

  it('should work for all generated agent links', () => {
    agents.forEach((agent) => {
      marketplaces.forEach((marketplace) => {
        try {
          const href = generateAgentLink(agent, marketplace, 'id12345');
          const result = isRawLink(href);
          expect(result).toBe(false);
        } catch (error) {
          if (error instanceof Error) {
            // The agent 'superbuy' does not support store pages
            if (
              !(
                error.message.startsWith('The agent') &&
                error.message.endsWith('does not support store pages')
              )
            ) {
              throw error;
            }
          }
        }
      });
    });
  });

  it('should work for all generated raw links', () => {
    marketplaces.forEach((marketplace) => {
      const href = generateRawLink(marketplace, 'id12345');
      const result = isRawLink(href);
      if (!result) {
        throw new Error(
          `Failed for marketplace: ${marketplace}: ${href} is not a raw link`
        );
      }
      expect(result).toBe(true);
    });
  });
});
