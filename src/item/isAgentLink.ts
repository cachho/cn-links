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

  if (agent === 'superbuy' && link.pathname.includes('/shop')) {
    return false;
  }
  if (agent === 'pandabuy' && link.pathname.startsWith('/shopdetail')) {
    return false;
  }
  if (agent === 'cssbuy' && !link.pathname.startsWith('/item')) {
    return false;
  }
  if (agent === 'hagobuy' && link.pathname.startsWith('/item/store')) {
    return false;
  }
  if (agent === 'kameymall' && !link.pathname.includes('/item')) {
    return false;
  }
  if (
    agent === 'cnfans' &&
    !link.pathname.startsWith('/product') &&
    !link.pathname.slice(3).startsWith('/product')
  ) {
    return false;
  }
  if (agent === 'hoobuy' && !link.pathname.includes('/product')) {
    return false;
  }
  if (agent === 'allchinabuy' && link.pathname.includes('/shop')) {
    return false;
  }
  // if (agent === 'wegobuy' && link.pathname.includes('/shop')) {
  //   return false;
  // }
  // if (agent === 'ezbuycn' && link.pathname.includes('/shop')) {
  //   return false;
  // }
  if (agent === 'sugargoo' && !link.href.includes('/productDetail')) {
    return false;
  }
  if (agent === 'basetao' && !link.pathname.includes('/products')) {
    return false;
  }
  if (
    agent === 'mulebuy' &&
    !link.pathname.startsWith('/product') &&
    !link.pathname.slice(3).startsWith('/product')
  ) {
    return false;
  }
  if (
    agent === 'joyabuy' &&
    !link.pathname.includes('/product') &&
    !link.pathname.slice(3).startsWith('/product')
  ) {
    return false;
  }
  if (
    agent === 'orientdig' &&
    !link.pathname.includes('/product') &&
    !link.pathname.slice(3).startsWith('/product')
  ) {
    return false;
  }
  if (
    agent === 'lovegobuy' &&
    (!link.hash ||
      !link.hash.includes('/goods') ||
      !link.hash.includes('/detail'))
  ) {
    return false;
  }

  try {
    const rawLink = extractRawLink(link);
    return isRawLink(rawLink);
  } catch {
    return false;
  }
}
