import { AES, enc, PBKDF2, WordArray } from 'crypto-js';
import Coding from './coding';

const godKey = enc.Hex.parse('2136afab11e4138be86328bfff963682');

class AesCoding implements Coding {
  private key: WordArray;
  constructor(key: string) {
    this.key = PBKDF2(key, godKey);
  }

  public encode(s: string): string {
    return AES.encrypt(s, this.key, { iv: godKey }).toString();
  }

  public decode(s: string): string {
    return AES.decrypt(s, this.key, { iv: godKey }).toString(enc.Utf8);
  }
}

export default AesCoding;
