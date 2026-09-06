import { cryptoRawKey } from './configs';

export const aesEncryptGCM = async (cryptoText: string): Promise<string> => {
  const rawKey = new TextEncoder().encode(cryptoRawKey);
  const hashBuffer = await crypto.subtle.digest('SHA-256', rawKey);
  const key = await crypto.subtle.importKey('raw', hashBuffer, { name: 'AES-GCM' }, false, [
    'encrypt',
  ]);
  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const encodedText = new TextEncoder().encode(cryptoText);
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: nonce,
    },
    key,
    encodedText,
  );
  const combined = new Uint8Array(nonce.length + encryptedBuffer.byteLength);

  combined.set(nonce, 0);
  combined.set(new Uint8Array(encryptedBuffer), nonce.length);

  return btoa(String.fromCharCode(...combined));
};

export const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const generateCodeChallenge = async codeVerifier => {
  const buffer = new TextEncoder().encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  let codeChallenge = btoa(String.fromCharCode(...hashArray));

  codeChallenge = codeChallenge.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); 

  return codeChallenge;
};

export const getAuth = () => {
  const rand = (seed, m_) => {
    const a = BigInt(20253141037);
    const c = BigInt(10324135202);
    const s = BigInt(seed);
    let m;

    if (m_ != null) {
      m = BigInt(m_);
    } else {
      m = BigInt(1000);
    }

    return Number((a * s + c) % m);
  };
  const now_time = Date.now();
  const now_hour = Math.floor(now_time / 3600000);
  const auth = BigInt(now_time % 1000000000) ^ BigInt(rand(now_hour, 0x7fffffff));

  return Number(auth);
};
