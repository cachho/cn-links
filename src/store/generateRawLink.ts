import type { Id, Marketplace, RawURL } from '../models';

/**
 * Generates the a proper sanitized link (raw link) for the specified marketplace and item ID.
 *
 * @param {Marketplace} marketplace - The marketplace for which to generate the link.
 * @param {Id} id - The item ID.
 * @returns {RawURL} The generated proper link.
 * @throws {Error} If the marketplace is unsupported.
 */
export function generateRawLink(marketplace: Marketplace, id: Id): RawURL {
  if (marketplace === 'weidian') {
    const urlParams = new URLSearchParams();
    urlParams.set('userid', id);
    return new URL(`https://weidian.com/?${urlParams.toString()}`);
  }
  if (marketplace === 'taobao' || marketplace === 'tmall') {
    return new URL(`https://shop${id}.taobao.com/`);
  }
  if (marketplace === '1688') {
    return new URL(`https://m.1688.com/winport/b2b-${id}.html`);
  }

  throw new Error(`Unsupported marketplace: ${marketplace}`);
}
