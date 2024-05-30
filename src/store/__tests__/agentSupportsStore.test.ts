import type { Agent } from '../../models';
import { agents } from '../../models';
import { agentSupportsStore } from '../agentSupportsStore';
import { extractRawLink } from '../extractRawLink';
import { generateAgentLink } from '../generateAgentLink';

describe('Agent supports store', () => {
  it('should reflect the status of generateAgentLink', () => {
    agents.forEach((agent) => {
      const supportsStore = agentSupportsStore(agent);

      if (supportsStore) {
        expect(() => generateAgentLink(agent, 'taobao', '0')).not.toThrow();
        const agentLink = generateAgentLink(agent, 'taobao', '0');
        expect(() => extractRawLink(agentLink)).not.toThrow();
      } else {
        expect(() => generateAgentLink(agent, 'taobao', '0')).toThrowError();
      }
    });
  });

  it('there should be more supported agents than unsupported agents', () => {
    const supported: Agent[] = [];
    const unsupported: Agent[] = [];
    agents.forEach((agent) => {
      if (agentSupportsStore(agent)) {
        supported.push(agent);
      } else {
        unsupported.push(agent);
      }
    });
    expect(supported.length).toBeGreaterThan(unsupported.length);
  });
});
