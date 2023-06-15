import type { Id } from './Id';
import type { Marketplace } from './Marketplace';
import type { Referral } from './Referral';

export interface ICnLink {
  marketplace: Marketplace;
  id: Id;
  referrals: Referral;
}
