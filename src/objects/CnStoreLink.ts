import type {
  AgentURL,
  AgentWithRaw,
  Referral,
  SafeInstantiateResult,
} from '../models';
import type {
  CnLinkSerial,
  CnLinkSerialInput,
  ICnItemLink,
} from '../models/CnLink';
import { extractId } from '../store/extractId';
import { extractRawLink } from '../store/extractRawLink';
import { generateAgentLink } from '../store/generateAgentLink';
import { generateRawLink } from '../store/generateRawLink';
import { isAgentLink } from '../store/isAgentLink';
import { isRawLink } from '../store/isRawLink';
import { Base } from './Base';

/**
 * An ambigous link object. Can be converted on the fly to a raw link or any agent URL object using the `as` method.
 * If you have a marketplace and id already, you can use the library's `generateRawLink` function with these parameters as an input.
 */
export class CnStoreLink extends Base implements ICnItemLink {
  /**
   * Construct object from link.
   * @param {URL | string} href - Link to generate the object from. Can be a raw link or an agent link.
   * @param {Referral} [referrals] - Object to use referral links from. Referrals can still be entered when using the `as` method. Optional.
   */
  constructor(href: URL | string, referrals: Referral = {}) {
    super(
      href,
      {
        isRawLink,
        extractRawLink,
        isAgentLink,
        extractId,
      },
      referrals
    );
  }

  /**
   * Convert to a URL object of any target type.
   * @param {AgentWithRaw} target - Agent name to convert to, or `raw` to get a sanitized link for the orginal marketplace
   * @param {string} referral - Referral code to use in this URL. If undefined, it will try to get the referral from the `referrals` attribute.
   * @param {string} [ra] - Set tracking parameters in the URL for internal tracking.
   * @returns {AgentURL} - URL object that contains the target link. You can get the full link string with the `.href` attribute.
   */
  as(target: AgentWithRaw, referral?: string, ra?: string): AgentURL {
    return this.baseAs({ generateAgentLink }, target, referral, ra);
  }

  /**
   * Serialize CnLink object
   * @returns serialized CnLink object
   */
  serialize(): CnLinkSerial {
    return {
      marketplace: this.marketplace,
      id: this.id,
      type: 'store',
    };
  }

  /**
   * Create CnLinks instance from serial
   * @param marketplace
   * @param id
   * @param type
   * @returns new CnLinks instance
   */
  static deserialize({ marketplace, id, type }: CnLinkSerialInput) {
    const rawUrl = this.baseDeserialize(
      { generateRawLink },
      { marketplace, id, type },
      'store'
    );
    return new CnStoreLink(rawUrl);
  }

  /**
   * Method to safely instantiate CnLink object without throwing an error. Inspired by `zod.safeParse`
   * @param {URL | string} href - Link to generate the object from. Can be a raw link or an agent link.
   * @param {Referral} [referrals] - Object to use referral links from. Referrals can still be entered when using the `as` method. Optional.
   * @returns {SafeInstantiateResult<CnStoreLink>} - Object that contains the result of the instantiation. If successful, it will contain the CnLink object. If failed, it will contain the error message.
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
  ): SafeInstantiateResult<CnStoreLink> {
    return Base.baseSafeInstantiate<CnStoreLink>(CnStoreLink, href, referrals);
  }
}
