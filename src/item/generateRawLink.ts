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
    urlParams.set('itemID', id);
    return new URL(`https://weidian.com/item.html?${urlParams.toString()}`);
  }
  if (marketplace === 'taobao') {
    const urlParams = new URLSearchParams();
    urlParams.set('id', id);
    return new URL(`https://item.taobao.com/item.htm?${urlParams.toString()}`);
  }
  if (marketplace === '1688') {
    return new URL(`https://detail.1688.com/offer/${id}.html`);
  }
  if (marketplace === 'tmall') {
    const urlParams = new URLSearchParams();
    urlParams.set('id', id);
    return new URL(
      `https://detail.tmall.com/item_o.htm?${urlParams.toString()}`
    );
  }
  if (marketplace === 'xianyu') {
    const urlParams = new URLSearchParams();
    urlParams.set('id', id);
    return new URL(`https://www.goofish.com/item?${urlParams.toString()}`);
  }

  throw new Error(`Unsupported marketplace: ${marketplace}`);
}

// ALIAS
export { generateRawLink as generateProperLink };
export { generateRawLink as generateMarketplaceLink };
