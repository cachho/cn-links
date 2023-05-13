import { isAgentLink } from './isAgentLink';
import { isRawLink } from './isRawLink';

/**
 * Filters a given string for links and checks them using `isAgentLink` and `isRawLink`.
 *
 * @param {string} text - The string to filter for links.
 * @param {boolean} agentLinks - Returns agent links if true. Default true.
 * @param {boolean} rawLinks - Returns raw links if true. Default true.
 * @param {number} [limit] - The maximum number of results to return.
 * @returns {string[]} An array of links that evaluate to true for either `isAgentLink` or `isRawLink`.
 */
export function filterLinks(
  text: string,
  agentLinks: boolean = true,
  rawLinks: boolean = true,
  limit?: number
): string[] {
  if (!agentLinks && !rawLinks) {
    return [];
  }

  const regex = /https?:\/\/\S+/g;
  const links = text.match(regex) || [];

  const filteredLinks = links
    .filter(
      (link) =>
        (agentLinks && isAgentLink(link)) || (rawLinks && isRawLink(link))
    )
    .slice(0, limit);

  return filteredLinks;
}
