import type { Agent } from './Agent';

export type Referral = {
  [agent in Agent]?: string;
};
