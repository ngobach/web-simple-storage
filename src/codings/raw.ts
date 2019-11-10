import Coding from './coding';

class RawCoding implements Coding {
  public encode(s: string): string {
    return s;
  }

  public decode(s: string): string {
    return s;
  }
}

export default RawCoding;
