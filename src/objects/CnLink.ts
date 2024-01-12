import { detectMarketplace } from '../lib/detectMarketplace';
import { extractId } from '../lib/extractId';
import { extractRawLink } from '../lib/extractRawLink';
import { generateAgentLink } from '../lib/generateAgentLink';
import { generateRawLink } from '../lib/generateRawLink';
import { isAgentLink } from '../lib/isAgentLink';
import { isRawLink } from '../lib/isRawLink';
import type { AgentWithRaw, Id, Marketplace, Referral } from '../models';
import type { ICnLink } from '../models/CnLink';

/**
 * An ambigous link object. Can be converted on the fly to a raw link or any agent URL object using the `as` method.
 * If you have a marketplace and id already, you can use the library's `generateRawLink` function with these parameters as an input.
 */
export class CnLink implements ICnLink {
  marketplace: Marketplace;

  id: Id;

  referrals: Referral;

  /**
   * Construct object from link.
   * @param {URL | string} href - Link to generate the object from. Can be a raw link or an agent link.
   * @param {Referral} [referrals] - Object to use referral links from. Referrals can still be entered when using the `as` method. Optional.
   */
  constructor(href: URL | string, referrals: Referral = {}) {
    const link = href instanceof URL ? href : new URL(href);

    const getInnerLink = () => {
      if (isRawLink(link)) {
        return link;
      }
      if (isAgentLink(link)) {
        return extractRawLink(link, false);
      }
      throw new Error(
        `CnLink object could not be initialized. Neither agent nor raw link could be detected from: ${link.href}`
      );
    };

    const innerLink = getInnerLink();
    const marketplace = detectMarketplace(innerLink);

    if (!marketplace) {
      throw new Error(
        `CnLink object could not be initialized. Marketplace could not be detected from inner link: ${innerLink.href}`
      );
    }

    this.marketplace = marketplace;
    this.id = extractId(innerLink);
    this.referrals = referrals ?? undefined;
  }

  /**
   * Convert to a URL object of any target type.
   * @param {AgentWithRaw} target - Agent name to convert to, or `raw` to get a sanitized link for the orginal marketplace
   * @param {string} referral - Referral code to use in this URL. If undefined, it will try to get the referral from the `referrals` attribute.
   * @param {string} [ra] - Set tracking parameters in the URL for internal tracking.
   * @returns {AgentURL} - URL object that contains the target link. You can get the full link string with the `.href` attribute.
   */
  as(target: AgentWithRaw, referral?: string, ra?: string) {
    const getRefferal = () => {
      if (referral) return referral;
      if (target === 'raw') return undefined;
      return this.referrals[target];
    };

    const innerLink = generateRawLink(this.marketplace, this.id);
    return generateAgentLink(
      target,
      innerLink,
      this.marketplace,
      this.id,
      getRefferal(),
      ra
    );
  }

  /**
   * Serialize CnLink object
   * @returns serialized CnLink object
   */
  serialize(): { marketplace: Marketplace; id: string } {
    return {
      marketplace: this.marketplace,
      id: this.id,
    };
  }

  /**
   * Create CnLinks instance from serial
   * @param marketplace
   * @param id
   * @returns new CnLinks instance
   */
  static deserialize({
    marketplace,
    id,
  }: {
    marketplace: Marketplace;
    id: string;
  }) {
    const rawUrl = generateRawLink(marketplace, id);
    return new CnLink(rawUrl);
  }
}
