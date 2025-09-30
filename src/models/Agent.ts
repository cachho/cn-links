export const agents = [
  'superbuy',
  'wegobuy',
  'pandabuy',
  'sugargoo',
  'cssbuy',
  'hagobuy',
  'basetao',
  'kameymall',
  'cnfans',
  'ezbuycn',
  'hoobuy',
  'allchinabuy',
  'mulebuy',
  'eastmallbuy',
  'hubbuycn',
  'joyabuy',
  'orientdig',
  'oopbuy',
  'lovegobuy',
  'blikbuy',
  'hegobuy',
  'ponybuy',
  'panglobalbuy',
  'sifubuy',
  'loongbuy',
  'kakobuy',
  'acbuy',
  'joyagoo',
  'itaobuy',
  'usfans',
  'cnshopper',
  'hipobuy',
] as const;

export type Agent = (typeof agents)[number];

export const agentsWithRaw = [...agents, 'raw'] as const;

export type AgentWithRaw = (typeof agentsWithRaw)[number];
