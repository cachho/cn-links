import { decryptCssbuy } from './decryptCssbuy';
import { detectAgent } from './detectAgent';

export function extractRawLink(
  href: string | URL,
  cantBeCssbuy?: boolean
): URL | undefined {
  const link = href instanceof URL ? href : new URL(href);

  if (!cantBeCssbuy && detectAgent(link.href) === 'cssbuy') {
    return decryptCssbuy(link);
  }

  const urlParams = new URLSearchParams(link.search ?? link);
  const innerParam = urlParams.get('url');

  if (!innerParam) {
    return undefined;
  }

  return new URL(innerParam);
}
