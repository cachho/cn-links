export function decodeSugargoo(url: URL) {
  const safeLink = new URL(url.href.replace('/#/', '/'));
  const innerParam = safeLink.searchParams.get('productLink');
  if (innerParam) {
    try {
      return new URL(innerParam);
    } catch {
      return new URL(decodeURIComponent(innerParam));
    }
  }
  throw new Error(`Could not extract inner Sugargoo link from ${url.href}`);
}
