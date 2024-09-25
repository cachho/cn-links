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
export function decodeHubbuyCn(url: URL): RawURL | undefined {
  if (url.searchParams.get('url')) {
    return new URL(url.searchParams.get('url')!);
  }
  if (url.pathname.toLowerCase().includes('taobaoid')) {
    // https://www.hubbuycn.com/taobaoID=726526607194&inviter=johnerik123
    const taobaoId = url.pathname.split('taobaoID=')[1].split('&')[0];
    return new URL(generateRawLink('taobao', taobaoId));
  }
  return undefined;
}
