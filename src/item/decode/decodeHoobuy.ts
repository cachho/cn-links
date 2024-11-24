import type { AgentLink, RawURL } from '../../models';
import { generateRawLink } from '../generateRawLink';

/**
 * @internal
 * Decrypts the Hoobuy link and returns the corresponding proper link.
 * This is an exception, as it does not infer strong input typing.
 *
 * @param {AgentLink |  string | URL} href - The Hoobuy link to decrypt. Not necessarily strongly typed.
 * @returns {RawURL} The decrypted proper link as a URL object, or undefined if decryption failed.
 */
export function decodeHoobuy(href: AgentLink | string | URL): RawURL {
  const url = typeof href === 'string' ? new URL(href) : href;

  let prefix = '/product/';
  const isMobile = url.pathname.startsWith('/m/product/');
  if (isMobile) {
    prefix = '/m/product/';
  } else if (!url.pathname.startsWith(prefix)) {
    throw new Error(`Hoobuy prefix error.`);
  }

  const slashIndex = isMobile ? 4 : 3;

  if (url.pathname.startsWith(`${prefix}1/`)) {
    const id = url.pathname.split('/')[slashIndex];
    if (id) {
      return generateRawLink('taobao', id);
    }
  }
  if (url.pathname.startsWith(`${prefix}0/`)) {
    const id = url.pathname.split('/')[slashIndex];
    if (id) {
      return generateRawLink('1688', id);
    }
  }
  if (url.pathname.startsWith(`${prefix}2/`)) {
    const id = url.pathname.split('/')[slashIndex];
    if (id) {
      return generateRawLink('weidian', id);
    }
  }
  throw new Error(
    `Error extracting inner link, hoobuy link could not be decrypted: ${url.href}`
  );
}
