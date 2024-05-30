import type { Id } from './Id';
import type { Marketplace } from './Marketplace';
import type { Referral } from './Referral';

export interface ICnLinkBase {
  marketplace: Marketplace;
  id: Id;
  referrals: Referral;
}

export type ICnItemLink = ICnLinkBase;

export type ICnStoreLink = ICnLinkBase;

export interface ICnLink extends ICnItemLink {
  instance: ICnItemLink | ICnStoreLink;
}

export type Type = 'item' | 'store';

export interface CnLinkSerial {
  marketplace: Marketplace;
  id: Id;
  type: Type;
}

export interface CnLinkSerialInput {
  marketplace: Marketplace;
  id: Id;
  type?: Type;
}
