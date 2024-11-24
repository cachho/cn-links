export function decodeEzbuyCn(url: URL) {
  const keyParam = url.searchParams.get('key');
  if (keyParam) {
    return new URL(keyParam);
  }
  throw new Error(
    `Error extracting inner link, hubbuycn link could not be decrypted: ${url.href}`
  );
}
