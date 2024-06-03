import { generateAgentLink as generatetemAgentLink } from '../../item/generateAgentLink';
import { agents } from '../../models';
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
        agentLink = generatetemAgentLink(agent, 'taobao', '123456');
      } catch {
        /* empty */
      }
      if (!agentLink) return;
      const result = isAgentLink(agentLink.href);
      // We mock it so that it returns true if it isn't early set to false
      if (result) {
        throw new Error(
          `Failed for agent ${agent} with link: ${agentLink.href}`
        );
      }
    });
  });
});
