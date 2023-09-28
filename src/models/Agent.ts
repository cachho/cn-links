export const agents = [
  'superbuy',
  'wegobuy',
  'pandabuy',
  'sugargoo',
  'cssbuy',
  'hagobuy',
  'kameymall',
  'cnfans',
] as const;

export type Agent = (typeof agents)[number];

export type AgentWithRaw = Agent | 'raw';

export const agentsWithRaw: Readonly<AgentWithRaw[]> = [...agents, 'raw'];
