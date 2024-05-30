import { detectMarketplace } from '../lib/detectMarketplace';
import type {
  AgentURL,
  AgentWithRaw,
  Id,
  Marketplace,
  RawURL,
  Referral,
  SafeInstantiateResult,
} from '../models';
import type {
  CnLinkSerial,
  CnLinkSerialInput,
  ICnLinkBase,
  Type,
} from '../models/CnLink';

export class Base implements ICnLinkBase {
  marketplace: Marketplace;

  id: Id;

  referrals: Referral;

  constructor(
    href: URL | string,
    callbacks: {
      isRawLink: (link: URL) => boolean;
      extractRawLink: (link: URL) => URL;
      isAgentLink: (link: URL) => boolean;
      extractId: (href: URL, marketplace?: Marketplace) => string;
    },
    referrals: Referral = {}
  ) {
    const link = href instanceof URL ? href : new URL(href);

    const rawLink = Base.getRawLink(
      {
        isRawLink: callbacks.isRawLink,
        extractRawLink: callbacks.extractRawLink,
        isAgentLink: callbacks.isAgentLink,
      },
      {
        link,
      }
    );
    const marketplace = detectMarketplace(rawLink);

    if (!marketplace) {
      throw new Error(
        `CnLink object could not be initialized. Marketplace could not be detected from inner link: ${rawLink.href}`
      );
    }

    this.marketplace = marketplace;
    this.id = callbacks.extractId(rawLink);
    this.referrals = referrals ?? undefined;
  }

  /**
   * Contains logic to extract raw links from links that are already raw links and agent links
   */
  private static getRawLink(
    callbacks: {
      isRawLink: (link: URL) => boolean;
      extractRawLink: (link: URL) => URL;
      isAgentLink: (link: URL) => boolean;
    },
    args: {
      link: URL;
    }
  ) {
    const { link } = args;
    if (callbacks.isRawLink(link)) {
      return link;
    }
    if (callbacks.isAgentLink(link)) {
      return callbacks.extractRawLink(link);
    }
    throw new Error(
      `CnLink object could not be initialized. Neither agent nor raw link could be detected from: ${link.href}`
    );
  }

  /**
   * Contains logic to get the referral code with the right priority
   */
  private getRefferal(target: AgentWithRaw, referral?: string) {
    if (referral) return referral;
    if (target === 'raw') return undefined;
    return this.referrals[target];
  }

  /**
   * Convert to a URL object of any target type.
   * @param {AgentWithRaw} target - Agent name to convert to, or `raw` to get a sanitized link for the orginal marketplace
   * @param {string} referral - Referral code to use in this URL. If undefined, it will try to get the referral from the `referrals` attribute.
   * @param {string} [ra] - Set tracking parameters in the URL for internal tracking.
   * @returns {AgentURL} - URL object that contains the target link. You can get the full link string with the `.href` attribute.
   */
  baseAs(
    callbacks: {
      generateAgentLink: (
        target: AgentWithRaw,
        marketplace: Marketplace,
        id: Id,
        referral?: string,
        ra?: string
      ) => URL;
    },
    target: AgentWithRaw,
    referral?: string,
    ra?: string
  ): AgentURL {
    return callbacks.generateAgentLink(
      target,
      this.marketplace,
      this.id,
      this.getRefferal(target, referral),
      ra
    );
  }

  /**
   * Serialize CnLink object
   * @returns serialized CnLink object
   */
  serialize(): CnLinkSerial {
    return {
      marketplace: this.marketplace,
      id: this.id,
      type: 'unknown' as Type,
    };
  }

  /**
   * Create CnLinks instance from serial. Only returns the link because it is constructed in the child class
   */
  static baseDeserialize(
    callbacks: {
      generateRawLink: (marketplace: Marketplace, id: string) => RawURL;
    },
    { marketplace, id, type }: CnLinkSerialInput,
    expectedType: Type
  ): RawURL {
    if (type && type !== expectedType) {
      throw new Error(
        `You tried to deserialize a ${type} as a ${expectedType}. Please use the appropriate class for ${expectedType} or the CnItem meta class`
      );
    }
    return callbacks.generateRawLink(marketplace, id);
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
  static baseSafeInstantiate<T>(
    Class: new (href: URL | string, referrals?: Referral) => T,
    href: URL | string,
    referrals: Referral = {}
  ): SafeInstantiateResult<T> {
    try {
      const c = new Class(href, referrals);
      return { success: true, data: c } as SafeInstantiateResult<T>;
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : '',
      } as SafeInstantiateResult<T>;
    }
  }
}
