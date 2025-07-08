import type { Marketplace, RawURL } from '../../models';
import { marketplaces } from '../../models';
import { generateRawLink } from '../generateRawLink';

export function decodeCnshopper(link: URL): RawURL {
  // https://cnshopper.com/goods/detail?keyword=675330231412&platform=taobao&invite_id=1424233
  const id = link.searchParams.get('keyword');
  if (!id) {
    throw new Error(`Missing ID parameter from link: ${link.href}`);
  }
  const marketplace = link.searchParams.get('platform');
  if (!marketplace) {
    throw new Error('Missing marketplace parameter');
  }
  if (!marketplaces.includes(marketplace as Marketplace)) {
    throw new Error('Unsupported marketplace');
  }
  return generateRawLink(marketplace as Marketplace, id);
}
