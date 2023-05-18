import { detectMarketplace } from "../lib/detectMarketplace";
import { isAgentLink } from "../lib/isAgentLink";
import { extractRawLink } from "../lib/extractRawLink";
import { Agent, AgentWithRaw, Id, Marketplace, Referral, marketplaces } from "../models";
import { extractId } from "../lib/extractId";
import { isRawLink } from "../lib/isRawLink";
import { ICnLink } from "../models/CnLink";
import { toAgent } from "../lib/toAgent";
import { generateAgentLink } from "../lib/generateAgentLink";
import { generateRawLink } from "../lib/generateRawLink";

/**
 * An ambigous link object. Can be converted on the fly to a raw link or any agent with the `as` method.
 * If you have a marketplace and id already, you can use the library's `generateRawLink` function as an input.
 */
export class CnLink implements ICnLink {
  marketplace: Marketplace;
  id: Id;
  referrals: Referral;

  /**
   * Construct object from link.
   * @param {URL | string} href - Link to generate the object from
   * @param {Referral} [referrals] - Object to use referral links from. Referrals can still be entered when using the `as` method. Optional. 
   */
  constructor(href: URL | string, referrals: Referral) {
    const link = href instanceof URL ? href : new URL(href);

    const getInnerLink = () => {
      if (isRawLink(link)) {
        return link;
      }
      if (isAgentLink(link)) {
        return extractRawLink(link, false);
      }
      throw new Error(`CnLink object could not be initialized. Neither agent nor raw link could be detected from: ${link.href}`);
    }

    const innerLink = getInnerLink();
    const marketplace = detectMarketplace(innerLink);
    
    if (!marketplace) {
      throw new Error(`CnLink object could not be initialized. Marketplace could not be detected from inner link: ${innerLink.href}`);
    }

    this.marketplace = marketplace;
    this.id = extractId(innerLink);
    this.referrals = referrals ?? undefined;
  }


  /**
   * Convert to a URL object of any target type.
   * @param {AgentWithRaw} target - Agent name to convert to, or `raw` to get a sanitized link for the orginal marketplace
   * @param {string} referral - Referral code to use in this URL. If undefined, it will try to get the referral from the `referrals` attribute.
   * @returns {AgentURL} - URL object that contains the target link. You can get the full link string with the `.href` attribute. 
   */
  as(target: AgentWithRaw, referral?: string) {
    const getRefferal = () => {
      if (referral) return referral;
      if (target === 'raw') return undefined;
      this.referrals[target]
    }

    const innerLink = generateRawLink(this.marketplace, this.id);
    return generateAgentLink(target, innerLink, this.marketplace, this.id, getRefferal());
  }
}
