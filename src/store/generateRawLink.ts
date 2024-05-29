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
    if (id.startsWith('b2b-')) {
      return new URL(`https://m.1688.com/winport/${id}.html`);
    }
    // NOTE: We'll be using desktop links as the default for now. See readme.
    return new URL(`https://shop${id}.1688.com/`);
  }

  throw new Error(`Unsupported marketplace: ${marketplace}`);
}
