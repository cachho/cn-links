export function extractRawLink(href: string | URL): URL | undefined {
  const link = href instanceof URL ? href : new URL(href);
  const urlParams = new URLSearchParams(link.search ?? link);
  const innerParam = urlParams.get('url');

  if (!innerParam) {
    return undefined;
  }

  return new URL(innerParam);
}
