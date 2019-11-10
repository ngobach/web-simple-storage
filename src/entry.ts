interface Rcrd<T> {
  v: T;
  e: number;
}

class Entry<T = string> {
  public static parse<T>(s: string): Entry<T> {
    const parsed = JSON.parse(s) as Rcrd<T>;
    return new Entry<T>(parsed.v, parsed.e);
  }

  public value: T;
  public expireAt: number;
  constructor(value: T, expireAt: number) {
    this.value = value;
    this.expireAt = expireAt;
  }

  public toString(): string {
    const record: Rcrd<T> = {
      e: this.expireAt,
      v: this.value,
    };

    return JSON.stringify(record);
  }
}

export default Entry;
