import { detectAgent } from '../lib/detectAgent';
import { extractRawLink } from './extractRawLink';
import { isRawLink } from './isRawLink';

/**
 * Checks if the provided URL or hostname corresponds to an agent link.
 * It's important that it is an item link, agent links to other pages on their website return false,
 * for this scenario you should just use the hostname, but you can also set simpleDomainCheck to true.
 *
 * @param {string | URL} href - The URL or hostname to check.
 * @returns {boolean} True if the link corresponds to an agent, false otherwise.
 */
export function isAgentLink(href: string | URL): boolean {
  let link: URL;
  try {
    link = new URL(href);
  } catch {
    return false;
  }

  // Check if the URL protocol is valid
  if (!['http:', 'https:'].includes(link.protocol)) {
    return false;
  }

  const agent = detectAgent(link);

  if (!agent) return false;

  // Return false for unsupported agent links
  if (agent === 'wegobuy') return false;
  if (agent === 'ezbuycn') return false;
  if (agent === 'basetao') return false;
  if (agent === 'sugargoo') return false;
  if (agent === 'eastmallbuy') return false;
  if (agent === 'hubbuycn') return false;
  if (agent === 'oopbuy') return false;
  if (agent === 'lovegobuy') return false;
  if (agent === 'blikbuy') return false;
  if (agent === 'ponybuy') return false;
  if (agent === 'panglobalbuy') return false;

  if (agent === 'pandabuy') {
    if (!link.pathname.startsWith('/shopdetail')) {
      return false;
    }
  } else if (agent === 'allchinabuy') {
    if (!link.pathname.includes('/shop/shop')) {
      return false;
    }
  } else if (agent === 'hoobuy') {
    if (!link.pathname.includes('/shop/')) {
      return false;
    }
  } else if (agent === 'superbuy') {
    if (!link.pathname.includes('/shop')) {
      return false;
    }
  } else if (agent === 'kameymall') {
    if (!link.pathname.startsWith('/store')) {
      return false;
    }
  } else if (agent === 'cnfans') {
    if (
      !link.pathname.startsWith('/shops') &&
      !link.pathname.slice(3).startsWith('/shops')
    ) {
      return false;
    }
  } else if (agent === 'mulebuy') {
    if (
      !link.pathname.startsWith('/shops') &&
      !link.pathname.slice(3).startsWith('/shops')
    ) {
      return false;
    }
  } else if (agent === 'hagobuy') {
    if (!link.pathname.startsWith('/item/store')) {
      return false;
    }
  } else if (agent === 'hegobuy') {
    if (!link.pathname.startsWith('/item/store')) {
      return false;
    }
  } else if (agent === 'cssbuy') {
    if (link.pathname.startsWith('/item')) {
      return false;
    }
  } else if (agent === 'joyabuy') {
    if (
      !link.pathname.startsWith('/shops') &&
      !link.pathname.slice(3).startsWith('/shops')
    ) {
      return false;
    }
  } else if (agent === 'orientdig') {
    if (
      !link.pathname.startsWith('/shops') &&
      !link.pathname.slice(3).startsWith('/shops')
    ) {
      return false;
    }
  } else if (agent === 'sifubuy') {
    if (!link.pathname.startsWith('/store')) {
      return false;
    }
  }

  try {
    const rawLink = extractRawLink(link);
    return isRawLink(rawLink);
  } catch (error) {
    console.error('Error extracting raw link:', error);
    return false;
  }
}
