import type { AgentWithRaw } from '../../models';
import { toAgent } from '../toAgent';

describe('toAgent', () => {
  const href = 'https://weidian.com/item.html?itemID=3053526244';

  it('should return the agent link for Weidian', () => {
    const agent: AgentWithRaw = 'superbuy';
    const result = toAgent(href, agent);
    expect(result).toEqual(
      new URL(
        'https://www.superbuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244'
      )
    );
  });

  it('should return the agent link for Wegobuy', () => {
    const agent: AgentWithRaw = 'wegobuy';
    const result = toAgent(href, agent);
    expect(result).toEqual(
      new URL(
        'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244'
      )
    );
  });

  it('should return the agent link for Pandabuy', () => {
    const agent: AgentWithRaw = 'pandabuy';
    const result = toAgent(href, agent);
    expect(result).toEqual(
      new URL(
        'https://www.pandabuy.com/product?ra=1&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244'
      )
    );
  });

  it('should return the agent link for Sugargoo', () => {
    const agent: AgentWithRaw = 'sugargoo';
    const result = toAgent(href, agent);
    expect(result).toEqual(
      new URL(
        'https://www.sugargoo.com/index/item/index.html?productLink=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244'
      )
    );
  });

  it('should return the agent link for Cssbuy (Weidian)', () => {
    const agent: AgentWithRaw = 'cssbuy';
    const result = toAgent(href, agent);
    expect(result).toEqual(
      new URL('https://www.cssbuy.com/item-micro-3053526244')
    );
  });

  it('should return the clean agent link for Cssbuy (Weidian)', () => {
    const agent: AgentWithRaw = 'cssbuy';
    const result = toAgent(`${href}&spm=asudfausdf8asfu`, agent);
    expect(result).toEqual(
      new URL('https://www.cssbuy.com/item-micro-3053526244')
    );
  });

  it('should return the agent link for Hagobuy', () => {
    const agent: AgentWithRaw = 'hagobuy';
    const result = toAgent(href, agent);
    expect(result).toEqual(
      new URL(
        'https://www.hagobuy.com/item/details?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244'
      )
    );
  });

  it('should return the clean agent link for Hagobuy', () => {
    const agent: AgentWithRaw = 'hagobuy';
    const result = toAgent(`${href}&spm=asudfausdf8asfu`, agent);
    expect(result).toEqual(
      new URL(
        'https://www.hagobuy.com/item/details?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244'
      )
    );
  });

  it('should return the raw link', () => {
    const agent: AgentWithRaw = 'raw';
    const result = toAgent(href, agent);
    expect(result).toEqual(
      new URL('https://weidian.com/item.html?itemID=3053526244')
    );
  });

  it('should return a clean raw link', () => {
    const agent: AgentWithRaw = 'raw';
    const result = toAgent(`${href}&spm=asudfausdf8asfu`, agent);
    expect(result).toEqual(
      new URL('https://weidian.com/item.html?itemID=3053526244')
    );
  });

  it('should return undefined if agent link cannot be generated', () => {
    const result = toAgent(href, 'unknown' as AgentWithRaw);
    expect(result).toBeUndefined();
  });

  it('should throw error if marketplace is detected but ID is undefined', () => {
    const agent: AgentWithRaw = 'superbuy';
    expect(() => toAgent('https://taobao.com', agent)).toThrowError(
      'Id could not be extracted from string: https://taobao.com/'
    );
  });

  it('should return undefined if marketplace is detected but agent link is undefined', () => {
    const agent: AgentWithRaw = 'superbuy';
    const result = toAgent('https://not-a-valid-link.com', agent);
    expect(result).toBeUndefined();
  });

  it('should return an affiliate code', () => {
    const agent: AgentWithRaw = 'wegobuy';
    const result = toAgent(href, agent, 'myC0d3');
    expect(result).toEqual(
      new URL(
        'https://www.wegobuy.com/en/page/buy?from=search-input&url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D3053526244&partnercode=myC0d3'
      )
    );
  });
});
