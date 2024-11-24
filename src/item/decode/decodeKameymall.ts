export function decodeKameymall(url: URL): URL {
  if (url.pathname.startsWith('/purchases')) {
    // Check that the second part of the pathname is purely numerical
    const segments = url.pathname.split('/');
    if (segments[2] && /^\d+$/.test(segments[2])) {
      throw new Error(
        'Kameymall link is a purchase history link. This type of link cannot be decoded.'
      );
    }
  }
  // Regular Kameymall links have a `url` search parameter
  throw new Error(
    `Could not extract inner Kameymall link from ${url.href}. This is expected behaviour and should use the fallback.`
  );
}
