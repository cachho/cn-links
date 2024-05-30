import { generateRawLink as generateRawItemLink } from '../item/generateRawLink';
import type {
  AgentWithRaw,
  Id,
  Marketplace,
  Referral,
  SafeInstantiateResult,
} from '../models';
import type { CnLinkSerialInput, ICnLink, Type } from '../models/CnLink';
import { generateRawLink as generateRawStoreLink } from '../store/generateRawLink';
import type { Base } from './Base';
import { CnItemLink } from './CnItemLink';
import { CnStoreLink } from './CnStoreLink';

/**
 * An ambigous link object. Can be converted on the fly to a raw link or any agent URL object using the `as` method.
 * If you have a marketplace and id already, you can use the library's `generateRawLink` function with these parameters as an input.
 */
export class CnLink implements ICnLink {
  marketplace: Marketplace;

  id: Id;

  referrals: Referral;

  type: Type;

  instance: CnStoreLink | CnItemLink;

  /**
   * Construct object from link.
   * @param {URL | string} href - Link to generate the object from. Can be a raw link or an agent link.
   * @param {Referral} [referrals] - Object to use referral links from. Referrals can still be entered when using the `as` method. Optional.
   */
  constructor(href: URL | string, referrals: Referral = {}) {
    try {
      this.instance = new CnItemLink(href, referrals);
      this.type = 'item';
    } catch {
      this.instance = new CnStoreLink(href, referrals);
      this.type = 'store';
    }
    this.marketplace = this.instance.marketplace;
    this.id = this.instance.id;
    this.referrals = this.instance.referrals;
  }

  /**
   * Convert to a URL object of any target type.
   * @param {AgentWithRaw} target - Agent name to convert to, or `raw` to get a sanitized link for the orginal marketplace
   * @param {string} referral - Referral code to use in this URL. If undefined, it will try to get the referral from the `referrals` attribute.
   * @param {string} [ra] - Set tracking parameters in the URL for internal tracking.
   * @returns {AgentURL} - URL object that contains the target link. You can get the full link string with the `.href` attribute.
   */
  as(target: AgentWithRaw, referral?: string, ra?: string) {
    return this.instance.as(target, referral, ra);
  }

  /**
   * Serialize CnLink object
   * @returns serialized CnLink object
   */
  serialize(): ReturnType<typeof Base.prototype.serialize> {
    return {
      marketplace: this.marketplace,
      id: this.id,
      type: this.type,
    };
  }

  /**
   * Create CnLinks instance from serial
   * @param marketplace
   * @param id
   * @returns new CnLinks instance
   */
  static deserialize({ marketplace, id, type }: CnLinkSerialInput) {
    if (type === 'store') {
      return new CnLink(generateRawStoreLink(marketplace, id));
    }
    return new CnLink(generateRawItemLink(marketplace, id));
  }

  /**
   * Method to safely instantiate CnLink object without throwing an error. Inspired by `zod.safeParse`
   * @param {URL | string} href - Link to generate the object from. Can be a raw link or an agent link.
   * @param {Referral} [referrals] - Object to use referral links from. Referrals can still be entered when using the `as` method. Optional.
   * @returns {SafeInstantiateResult} - Object that contains the result of the instantiation. If successful, it will contain the CnLink object. If failed, it will contain the error message.
   * @example
   * const response = CnLink.safeInstantiate(link);
   * if (response.success) {
   *  doSomething(response.data.as(agent));
   * } else {
   *  console.error(response.error);
   * }
   */
  static safeInstantiate(
    href: URL | string,
    referrals: Referral = {}
  ): SafeInstantiateResult<CnLink> {
    try {
      const c = new CnLink(href, referrals);
      return { success: true, data: c } as SafeInstantiateResult<CnLink>;
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : '',
      } as SafeInstantiateResult<CnLink>;
    }
  }
}
