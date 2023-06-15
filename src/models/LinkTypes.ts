/**
 * **URL object that points to a shopping agent.**
 * The target return type.
 * Can be used for `AgentLink` inputs.
 * Due to the `AgentWithRaw` type, it is possible that the agent link is
 * actually a raw link. This should only be used as a final output,
 * never assume that the agent link is a raw link. (might change in the future).
 * Background (not in code):
 * Comprised of the agent domain and an inner Marketplace link
 * with a marketplace domain an id.
 */
export type AgentURL = URL;

/**
 * **Link to a shopping agent.**
 * The most common input type.
 * Background (not in code):
 * Comprised of the agent domain and an inner Marketplace link
 * with a marketplace domain an id.
 */
export type AgentLink = string | URL | AgentURL;

/**
 * **URL object that points to a marketplace with a raw link**
 * The target return type.
 * This could be Taobao, Weidian, 1688 or Tmall.
 */
export type RawURL = URL;

/**
 * **Raw link to a marketplace.**
 * The most common input type.
 * This could be Taobao, Weidian, 1688 or Tmall.
 */
export type RawLink = string | URL | RawURL;

/**
 * **URL object that points to a non-link marketplace.**
 * A target return type.
 * This could be Yupoo.
 * These marketplaces are part of this library for feature completeness,
 * (mainly the filter).
 * Since these links are composed differently,
 * most transformations are impossible.
 */
export type NonLinkMarketplaceURL = URL;

/**
 * **Link to a non-link marketplace.**
 * This could be Yupoo.
 * These marketplaces are part of this library for feature completeness,
 * (mainly the filter).
 * Since these links are composed differently,
 * most transformations are impossible.
 */
export type NonLinkMarketplaceLink = URL | string | NonLinkMarketplaceURL;
