import { decryptCssbuy } from './decryptCssbuy';
import { detectAgent } from './detectAgent';

/**
 * Extracts the raw link from the provided URL.
 *
 * @param {string | URL} href - The URL from which to extract the raw link.
 * @param {boolean} [cantBeCssbuy] - Indicates whether the raw link cannot be from the 'cssbuy' agent. If this is true the call to detectAgent is skipped. Default is false.
 * @returns {URL | undefined} The extracted raw link as a URL object, or undefined if no raw link is found.
 */
export function extractRawLink(
  href: string | URL,
  cantBeCssbuy?: boolean
): URL | undefined {
  const link = href instanceof URL ? href : new URL(href);

  if (!cantBeCssbuy && detectAgent(link.href) === 'cssbuy') {
    return decryptCssbuy(link);
  }

  const urlParams = new URLSearchParams(link.search ?? link);
  const innerParam = urlParams.get('url');

  if (!innerParam) {
    return undefined;
  }

  return new URL(innerParam);
}
