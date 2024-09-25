import { type Marketplace, marketplaces } from '../../models';
import { generateRawLink } from '../generateRawLink';

const getMarketplace = (segments: string[]): Marketplace | null => {
  return (
    marketplaces.find((marketplace) => segments.includes(marketplace)) ?? null
  );
};

/**
 * @internal
 * Decrypts the Basetao link by extracting the marketplace and id.
 *
 * @param {AgentURL} href - The Basetao link to decode. Not necessarily strongly typed.
 * @returns {RawURL} The decoded proper link as a URL object, or undefined if decryption failed.
 */
export function decodeBasetao(link: URL) {
  const segments = link.pathname.split('/');
  if (!segments.includes('products')) {
    throw new Error(
      `This type of Basetao link is not a compatible product link: ${link.href}`
    );
  }

  const marketplace = getMarketplace(segments);
  if (!marketplace) {
    throw new Error(`No marketplace detected in Basetao link ${link.href}`);
  }

  // Get following segment
  const idSegment = segments[segments.indexOf(marketplace) + 1];
  const id = idSegment.split('.')[0];

  return generateRawLink(marketplace, id);
}
