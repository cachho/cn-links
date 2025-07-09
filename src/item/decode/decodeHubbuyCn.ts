import { hubbuycnStringsMarketplaces } from '../../data/hubbuycn';
import type { RawURL } from '../../models';
import { generateRawLink } from '../generateRawLink';

/**
 * @internal
 * Decrypts the HubbuyCn link and returns the corresponding proper link.
 * This is an exception, as it does not infer strong input typing.
 *
 * @param {AgentLink |  string | URL} href - The HubbuyCn link to decrypt. Not necessarily strongly typed.
 * @returns {RawURL} The decrypted proper link as a URL object, or undefined if decryption failed.
 */
export function decodeHubbuyCn(url: URL): RawURL {
  if (url.searchParams.has('tp') && url.searchParams.has('tid')) {
    const id = url.searchParams.get('tid');
    if (id === null) {
      throw new Error('No id provided in HubbuyCn link.');
    }
    const marketplace = hubbuycnStringsMarketplaces.get(
      url.searchParams.get('tp')?.toLowerCase() || ''
    );
    if (!marketplace) {
      throw new Error(`No marketplace provided in HubbuyCn link: ${url.href}`);
    }
    return generateRawLink(marketplace, id);
  }
  if (url.searchParams.has('url')) {
    const innerUrl = url.searchParams.get('url');
    if (!innerUrl) {
      throw new Error('No url provided in HubbuyCn link.');
    }
    return new URL(innerUrl);
  }
  if (url.pathname.toLowerCase().includes('taobaoid')) {
    // https://www.hubbuycn.com/taobaoID=726526607194&inviter=johnerik123
    const taobaoId = url.pathname.split('taobaoID=')[1].split('&')[0];
    return new URL(generateRawLink('taobao', taobaoId));
  }
  throw new Error(
    `Error extracting inner link, hubbuycn link could not be decrypted: ${url.href}`
  );
}
