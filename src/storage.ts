import { Backend } from './backends';
import { Coding } from './codings';
import Entry from './entry';

class SimpleStorage<T, K extends keyof T & string> {
  constructor(
    private backend: Backend,
    private coding: Coding,
    private namespace: string,
  ) {}

  public putEntry(key: K, entry: Entry<T[K]>): void {
    const encodedEntry = this.coding.encode(entry.toString());
    this.backend.setItem(this.getRawKeyName(key), encodedEntry);
  }

  public getEntry(key: K): Entry<T[K]> | null {
    this.checkEntry(key);
    const encodedKey = this.getRawKeyName(key);
    if (this.backend.getItem(encodedKey) === null) {
      return null;
    }
    const stringEntry = this.coding.decode(this.backend.getItem(encodedKey));
    return Entry.parse<T[K]>(stringEntry);
  }

  public hasEntry(key: K): boolean {
    return this.getEntry(key) !== null;
  }

  public removeEntry(key: K): boolean {
    this.checkEntry(key);
    const encodedKey = this.getRawKeyName(key);
    const hasEntry = !!this.backend.getItem(encodedKey);
    this.backend.removeItem(encodedKey);
    return hasEntry;
  }

  private checkEntry(key: K): void {
    const encodedKey = this.getRawKeyName(key);
    const stringEntry = this.coding.decode(this.backend.getItem(encodedKey));
    const entry = Entry.parse<T[K]>(stringEntry);
    if (entry.expiration <= Date.now()) {
      this.backend.removeItem(encodedKey);
    }
  }

  private getRawKeyName(key: K): string {
    return this.coding.encode(`${this.namespace}:${key}`);
  }
}

export default SimpleStorage;
