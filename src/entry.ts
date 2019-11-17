import { DURATION_100_YEARS } from './consts';

interface Rcrd<T> {
  v: T;
  e: number;
}

type CB<T> = (target: Entry<T>) => any;

class Entry<T = string> {
  public static parse<T>(s: string): Entry<T> {
    const parsed = JSON.parse(s) as Rcrd<T>;
    return new Entry<T>(parsed.v, parsed.e, null);
  }

  constructor(
    private v: T = null,
    private e: number = Date.now() + DURATION_100_YEARS,
    private onChanged: CB<T> = null,
  ) {}

  public get value(): T {
    return this.v;
  }

  public set value(newValue: T) {
    this.v = newValue;
    if (this.onChanged) {
      this.onChanged(this);
    }
  }

  public get expiration(): number {
    return this.e;
  }

  public set expiration(exp: number) {
    this.e = exp;
    if (this.onChanged) {
      this.onChanged(this);
    }
  }

  public setCallback(cb: CB<T>) {
    this.onChanged = cb;
  }

  public toString(): string {
    const record: Rcrd<T> = {
      e: this.e,
      v: this.v,
    };

    return JSON.stringify(record);
  }
}

export default Entry;
