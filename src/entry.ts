interface Rcrd<T> {
  v: T;
  e: number;
}

class Entry<T = string> {
  public value: T;
  public expireAt: number;

  constructor(value: T, expireAt: number) {
    this.value = value;
    this.expireAt = expireAt;
  }

  public static parse<T>(s: string): Entry<T> {
    const parsed = JSON.parse(s) as Rcrd<T>;
    return new Entry<T>(parsed.v, parsed.e);
  }

  public toString(): string {
    const record: Rcrd<T> = {
      v: this.value,
      e: this.expireAt,
    };

    return JSON.stringify(record);
  }
}

export default Entry;
