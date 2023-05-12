import type { Marketplace } from '../models';
import { getDomainFromHostname } from './getDomainFromHostname';

export function detectMarketplace(href: string | URL): Marketplace | undefined {
  const hostname = href instanceof URL ? href.hostname : new URL(href).hostname;

  const domain = getDomainFromHostname(hostname);

  if (domain === 'weidian.com') {
    return 'weidian';
  }
  if (domain === 'taobao.com') {
    return 'taobao';
  }
  if (domain === '1688.com') {
    return '1688';
  }
  if (domain === 'tmall.com') {
    return 'tmall';
  }

  return undefined;
}
