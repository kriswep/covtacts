// https://dev.to/voraciousdev/a-practical-guide-to-the-web-cryptography-api-4o8n

const generateIv = () => {
  return window.crypto.getRandomValues(new Uint8Array(12));
};

const generateSalt = () => {
  return window.crypto.getRandomValues(new Uint8Array(16));
};

const getKeyMaterial = async (password: string) => {
  let enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey'],
  );
};

const encode = (data: string) => {
  const encoder = new TextEncoder();

  return encoder.encode(data);
};

const decode = (bytestream: ArrayBuffer) => {
  const decoder = new TextDecoder();

  return decoder.decode(bytestream);
};

const getKey = async (salt: Uint8Array, password: string) => {
  const keyMaterial = await getKeyMaterial(password);
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
};

const pack = (buffer: Uint8Array | ArrayBuffer) => {
  return window.btoa(
    String.fromCharCode.apply(
      null,
      (new Uint8Array(buffer) as unknown) as number[],
    ),
  );
};

const unpack = (packed: string): Uint8Array => {
  const string = window.atob(packed);
  const buffer = new ArrayBuffer(string.length);
  const bufferView = new Uint8Array(buffer);

  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i);
  }

  return bufferView;
};

export const encrypt = async (password: string, data: string) => {
  const encoded = encode(data);
  const iv = generateIv();
  const salt = generateSalt();
  const key = await getKey(salt, password);
  const cipher = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encoded,
  );

  return {
    cipher: pack(cipher),
    iv: pack(iv),
    salt: pack(salt),
  };
};

export const decrypt = async (
  password: string,
  encrypted: {
    iv: string;
    salt: string;
    cipher: string;
  },
) => {
  const unpackedEncrypted = {
    iv: unpack(encrypted.iv),
    salt: unpack(encrypted.salt),
    cipher: unpack(encrypted.cipher),
  };
  const key = await getKey(unpackedEncrypted.salt, password);

  const encoded = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: unpackedEncrypted.iv,
    },
    key,
    unpackedEncrypted.cipher,
  );

  return decode(encoded);
};
