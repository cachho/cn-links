import { isAgentLink } from './isAgentLink';
import { isNonLinkMarketplace } from './isNonLinkMarketplace';
import { isRawLink } from './isRawLink';

/**
 * Filters a given string for links and checks them using `isAgentLink` and `isRawLink`.
 *
 * @param {string} text - The string to filter for links.
 * @param {boolean} agentLinks - Returns agent links if true. Default true.
 * @param {boolean} rawLinks - Returns raw links if true. Default true.
 * @param {boolean} nonMarketplaceLinks - Returns non-link marketplace links if true. Default false.
 * @param {number} [limit] - The maximum number of results to return.
 * @param {boolean} [linksOnlyTerminatedByWhitespace] - If active, only whitespaces are used to find the end of a link. This can cause problems with markdown.
 * @returns {string[]} An array of links that evaluate to true for either `isAgentLink` or `isRawLink`.
 */
export function filterLinks(
  text: string,
  agentLinks: boolean = true,
  rawLinks: boolean = true,
  nonMarketplaceLinks: boolean = false,
  limit?: number,
  linksOnlyTerminatedByWhitespace?: boolean
): string[] {
  if (!agentLinks && !rawLinks && !nonMarketplaceLinks) {
    return [];
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
        (nonMarketplaceLinks && isNonLinkMarketplace(link))
    )
    .slice(0, limit);

  return filteredLinks;
}
