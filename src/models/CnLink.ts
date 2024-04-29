import type { Id } from './Id';
import type { Marketplace } from './Marketplace';
import type { Referral } from './Referral';

export interface ICnLink {
  marketplace: Marketplace;
  id: Id;
  referrals: Referral;
}

export type CnLinkSerial = {
  marketplace: Marketplace;
  id: Id;
};

type SafeInstatiateSuccess<T> = { success: true; data: T };

type SafeInstatiateFail = { success: false; error: string };

export type SafeInstantiateResult<T> =
  | SafeInstatiateSuccess<T>
  | SafeInstatiateFail;
