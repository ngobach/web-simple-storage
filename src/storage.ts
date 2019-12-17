import { Backend } from './backends';
import { Coding } from './codings';
import Entry from './entry';
class SimpleStorage<T> {
  constructor(
    private backend: Backend,
    private coding: Coding,
    private namespace: string,
  ) {}

  public putEntry(key: keyof T, entry: Entry<T[typeof key]>): void {
    const encodedEntry = this.coding.encode(entry.toString());
    this.backend.setItem(this.getRawKeyName(key), encodedEntry);
  }

  public getEntry(key: keyof T): Entry<T[typeof key]> | null {
    this.checkEntry(key);
    const encodedKey = this.getRawKeyName(key);
    if (this.backend.getItem(encodedKey) === null) {
      return null;
    }
    const stringEntry = this.coding.decode(this.backend.getItem(encodedKey));
    return Entry.parse<T[typeof key]>(stringEntry);
  }

  public hasEntry(key: keyof T): boolean {
    return this.getEntry(key) !== null;
  }

  public removeEntry(key: keyof T): boolean {
    this.checkEntry(key);
    const encodedKey = this.getRawKeyName(key);
    const hasEntry = !!this.backend.getItem(encodedKey);
    this.backend.removeItem(encodedKey);
    return hasEntry;
  }

  public listKeys(): string[] {
    const keyPrefix = `${this.namespace}:`;
    return this.backend.listKeys()
      .map((k) => this.coding.decode(k))
      .filter((k) => k.startsWith(keyPrefix))
      .map((k) => k.substr(keyPrefix.length))
      .filter((k) => this.checkEntry(k as keyof T));
  }

  private checkEntry(key: keyof T): typeof key | null {
    const encodedKey = this.getRawKeyName(key);
    const encodedValue = this.backend.getItem(encodedKey);
    if (!encodedValue) {
      return null;
    }
    const stringEntry = this.coding.decode(encodedValue);
    const entry = Entry.parse<T[typeof key]>(stringEntry);
    if (entry === null) {
      return null;
    }
    if (entry.expiration <= Date.now()) {
      this.backend.removeItem(encodedKey);
      return null;
    }
    return key;
  }

  private getRawKeyName(key: keyof T): string {
    return this.coding.encode(`${this.namespace}:${key}`);
  }
}

export default SimpleStorage;
