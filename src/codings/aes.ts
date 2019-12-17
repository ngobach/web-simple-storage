import { AES, lib, enc, PBKDF2, WordArray } from 'crypto-js';
import lzstring from 'lz-string';
import Coding from './coding';

const iv = enc.Hex.parse('101112131415161718191a1b1c1d1e1f');

class AesCoding implements Coding {
  private key: WordArray;
  constructor(key: string) {
    this.key = PBKDF2(key, iv);
  }

  public encode(s: string): string {
    return AES.encrypt(s, this.key, { iv }).toString();
  }

  public decode(s: string): string {
    return AES.decrypt(s, this.key, { iv }).toString(enc.Utf8);
  }
}

export default AesCoding;
