export const agents = [
  'superbuy',
  'wegobuy',
  'pandabuy',
  'sugargoo',
  'cssbuy',
  'hagobuy',
  'kameymall',
  'cnfans',
  'ezbuycn',
  'hoobuy',
] as const;

export type Agent = (typeof agents)[number];

export const agentsWithRaw = [...agents, 'raw'] as const;

export type AgentWithRaw = (typeof agentsWithRaw)[number];
