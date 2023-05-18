/**
 * **Link to a shopping agent.** 
 * Background (not in code):
 * Comprised of the agent domain and an inner Marketplace link 
 * with a marketplace domain an id.
 */
export type AgentLink = URL;

/**
 * **Link to a marketplace. This could be Taobao, Weidian, 1688 or Tmall.** 
 */
export type MarketplaceLink = URL;

/**
 * **Link to a non-link marketplace.**
 * This could be Yupoo.
 * These marketplaces are part of this library for feature completeness,
 * (mainly the filter).
 * Since these links are composed differently,
 * most transformations are impossible.
 */
export type NonLinkMarketplaceLink = URL;
