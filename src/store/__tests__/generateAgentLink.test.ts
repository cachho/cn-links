import { agents, marketplaces } from '../../models';
import { generateAgentLink } from '../generateAgentLink';

describe('generateAgentLink', () => {
  const marketplace = 'weidian';
  const id = '1625671124';
  const referral = 'myC0d3';

  test('generates pandabuy link correctly', () => {
    const agent = 'pandabuy';
    const expected = new URL(
      `https://www.pandabuy.com/shopdetail?ra=1&t=wd&id=${id}&inviteCode=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result).toEqual(expected);
  });

  test('generates pandabuy link correctly with ra', () => {
    const agent = 'pandabuy';
    const expected = new URL(
      `https://www.pandabuy.com/shopdetail?ra=3&t=wd&id=${id}&inviteCode=${referral}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral, '3');

    expect(result).toEqual(expected);
  });

  test('generates cssbuy link correctly', () => {
    const agent = 'cssbuy';
    const expected = new URL(
      `https://cssbuy.com/productlist?t=micro&shop=${id}&shop1=676198570`
    );

    const result = generateAgentLink(
      agent,
      marketplace,
      id,
      referral,
      undefined
    );

    expect(result.href).toEqual(expected.href);
  });

  it('generates cnfans link correctly', () => {
    const agent = 'cnfans';
    const expected = new URL(
      `https://cnfans.com/shops/?shop_type=${marketplace}&shop_id=${id}`
    );

    const result = generateAgentLink(agent, marketplace, id, referral);

    expect(result.href).toEqual(expected.href);
  });

  it('should be able to generate a link for all agents', () => {
    agents.forEach((agent) => {
      marketplaces.forEach((mp) => {
        try {
          generateAgentLink(agent, mp, '1234567');
        } catch (error) {
          // Ignore errors for unsupported agents
          if (error instanceof Error) {
            if (
              !error.message.startsWith('The agent') ||
              !error.message.endsWith('does not support store pages')
            ) {
              throw new Error(error.message);
            }
          } else {
            throw new Error('Unknown error');
          }
        }
      });
    });
  });
});
