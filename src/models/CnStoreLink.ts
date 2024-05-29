import type { Id } from './Id';
import type { Marketplace } from './Marketplace';
import type { Referral } from './Referral';

export interface ICnStoreLink {
  marketplace: Marketplace;
  id: Id;
  referrals: Referral;
}

export type CnStoreLinkSerial = {
  marketplace: Marketplace;
  id: Id;
};
