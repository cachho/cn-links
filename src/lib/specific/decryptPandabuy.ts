import CryptoJS from 'crypto-js';

export function decryptPandabuy(encodedString: string): string {
  const d = 'PJ';
  const match = new RegExp(`^${d}(\\d)([a-zA-Z])(.*)`).exec(encodedString);
  if (!match) {
    throw new Error('String format is incorrect');
  }

  const id = parseInt(match[1], 10);
  const encodedUrl = match[3];
  const decodedUrl = decodeURIComponent(encodedUrl);
  const decodedBase64 = CryptoJS.enc.Base64.parse(decodedUrl);

  // Convert words array to a byte array
  const byteArray = CryptoJS.lib.WordArray.create(
    decodedBase64.words,
    decodedBase64.sigBytes
  );
  const byteArr = byteArray.toString(CryptoJS.enc.Latin1);

  // Remove the byte at the specified index
  const modifiedByteArr = byteArr.substring(0, id) + byteArr.substring(id + 1);

  // Convert back to WordArray
  const modifiedWordArray = CryptoJS.enc.Latin1.parse(modifiedByteArr);

  const keyIvPairs = [
    { id: '0', iv: 'a12sdcft', key: 'kj098765' },
    { id: '1', iv: 'mbio986h', key: 'plk;9uhj' },
    { id: '2', iv: '09ydnlp;', key: '.1asxz4t' },
    { id: '3', iv: '0om,.;0s', key: '1qasdr56' },
    { id: '4', iv: '1dafmdl0', key: '1wdfgu8i' },
    { id: '5', iv: '90oikjhg', key: '12zxcvbn' },
    { id: '6', iv: 'lkjuy678', key: '1jnbop9g' },
    { id: '7', iv: '1whsnxk9', key: '378ujhgr' },
    { id: '8', iv: '1was;09n', key: 'chguikl0' },
    { id: '9', iv: '12sdfghy', key: '09jnbgft' },
  ];
  const keyIv = keyIvPairs.find((pair) => pair.id === id.toString());
  if (!keyIv) {
    throw new Error('Invalid ID for key/IV pair');
  }

  const key = CryptoJS.enc.Utf8.parse(keyIv.key);
  const iv = CryptoJS.enc.Utf8.parse(keyIv.iv);

  const decryptedData = CryptoJS.DES.decrypt(
    CryptoJS.lib.CipherParams.create({
      ciphertext: modifiedWordArray,
      key,
      iv,
    }),
    key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decryptedData.toString(CryptoJS.enc.Utf8);
}
