/**
 * **Link to a shopping agent.** 
 * Background (not in code):
 * Comprised of the agent domain and an inner Marketplace link 
 * with a marketplace domain an id.
 */
export type AgentLink = string;

/**
 * **Link to a marketplace.** 
 */
export type MarketplaceLink = string;

/**
 * **Link to a non-link marketplace.**
 * These marketplaces are part of this library for feature completeness,
 * (mainly the filter).
 * Since these links are composed differently,
 * most transformations are impossible.
 */
export type NonLinkMarketplaceLink = string;
