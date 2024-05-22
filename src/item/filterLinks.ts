import type { AgentURL, NonLinkMarketplaceURL, RawURL } from '../models';
import { isAgentLink } from './isAgentLink';
import { isNonLinkMarketplace } from './isNonLinkMarketplace';
import { isRawLink } from './isRawLink';

/**
 * Filters a given string for links and checks them using `isAgentLink`, `isRawLink` and optionally `isNonLinkMarketplace`.
 *
 * @param {string} text - The string to filter for links.
 * @param {boolean} agentLinks - Returns agent links if true. Default true.
 * @param {boolean} rawLinks - Returns raw links if true. Default true.
 * @param {boolean} nonLinkMarketplaceLinks - Returns non-link marketplace links if true. Default false.
 * @param {number} [limit] - The maximum number of results to return.
 * @param {boolean} [linksOnlyTerminatedByWhitespace] - If true, only whitespaces are used to find the end of a link. This can cause problems with markdown.
 * @returns {{agentUrls?: AgentURL[], rawUrls?: RawURL[], nonLinkMarketplaceUrls?: NonLinkMarketplaceURL[]}} - An object with three arrays for each filter option. Typeguarded.
 */
export function filterLinks(
  text: string,
  agentLinks: boolean = true,
  rawLinks: boolean = true,
  nonLinkMarketplaceLinks: boolean = false,
  limit?: number,
  linksOnlyTerminatedByWhitespace?: boolean
): {
  agentUrls?: AgentURL[];
  rawUrls?: RawURL[];
  nonLinkMarketplaceUrls?: NonLinkMarketplaceURL[];
} {
  if (!agentLinks && !rawLinks && !nonLinkMarketplaceLinks) {
    return {};
  }

  const regex = linksOnlyTerminatedByWhitespace
    ? /https?:\/\/\S+/g
    : /https?:\/\/[^'"\][<>,\s)]+(?=\]\(|$|\s|['"<>,)])/g;

  const links = text.match(regex) || [];

  const filteredLinks = links
    .filter(
      (link) =>
        (agentLinks && isAgentLink(link)) ||
        (rawLinks && isRawLink(link)) ||
        (nonLinkMarketplaceLinks && isNonLinkMarketplace(link))
    )
    .slice(0, limit);

  const agentLinkArray = agentLinks
    ? filteredLinks
        .filter((link) => isAgentLink(link))
        .map((link) => new URL(link))
    : undefined;

  const rawLinkArray = rawLinks
    ? filteredLinks
        .filter((link) => isRawLink(link))
        .map((link) => new URL(link))
    : undefined;

  const nonLinkMarketplaceArray = nonLinkMarketplaceLinks
    ? filteredLinks
        .filter((link) => isNonLinkMarketplace(link))
        .map((link) => new URL(link))
    : undefined;

  // Todo: Refactor for better performance is definitely possible.

  return {
    agentUrls: agentLinkArray,
    rawUrls: rawLinkArray,
    nonLinkMarketplaceUrls: nonLinkMarketplaceArray,
  };
}
