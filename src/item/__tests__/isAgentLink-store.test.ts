import { agents } from '../../models';
import { generateAgentLink as generateAgentStoreLink } from '../../store/generateAgentLink';
import { generateAgentLink } from '../generateAgentLink';
import { isAgentLink } from '../isAgentLink';

jest.mock('../isRawLink', () => ({
  isRawLink: jest.fn().mockReturnValue(true),
}));

jest.mock('../extractRawLink', () => ({
  extractRawLink: jest.fn().mockReturnValue(new URL('https://example.com')),
}));

describe('Test store links', () => {
  it('should return false early for all item links', () => {
    agents.forEach((agent) => {
      let agentLink: URL | null = null;
      try {
        agentLink = generateAgentStoreLink(agent, 'taobao', '123456');
      } catch {
        /* empty */
      }
      if (!agentLink) return;
      const result = isAgentLink(agentLink.href);
      // We mock it so that it returns true if it isn't early set to false
      if (result) {
        const itemAgentLink = generateAgentLink(agent, 'taobao', '123456');
        throw new Error(
          `Failed for agent ${agent} with link: ${agentLink.href}, it should only work for ${itemAgentLink}`
        );
      }
    });
  });
});
