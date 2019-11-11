import { Backend } from './backends';
import { Coding } from './codings';
import Entry from './entry';

class SimpleStorage<T, K extends keyof T & string> {
  constructor(
    private backend: Backend,
    private coding: Coding,
  ) {}

  public putEntry(key: K, entry: Entry<T[K]>): void {
    const encodedKey = this.coding.encode(key);
    const encodedEntry = this.coding.encode(entry.toString());
    this.backend.setItem(encodedKey, encodedEntry);
  }

  public getEntry(key: K): Entry<T[K]> | null {
    this.checkEntry(key);
    const encodedKey = this.coding.encode(key);
    if (this.backend.getItem(encodedKey) === null) {
      return null;
    }
    const stringEntry = this.coding.decode(this.backend.getItem(encodedKey));
    return Entry.parse<T[K]>(stringEntry);
  }

  public removeEntry(key: K): boolean {
    this.checkEntry(key);
    const encodedKey = this.coding.encode(key);
    const hasEntry = !!this.backend.getItem(encodedKey);
    this.backend.removeItem(encodedKey);
    return hasEntry;
  }

  private checkEntry(key: K): void {
    const encodedKey = this.coding.encode(key);
    const stringEntry = this.coding.decode(this.backend.getItem(encodedKey));
    const entry = Entry.parse<T[K]>(stringEntry);
    if (entry.expireAt <= Date.now()) {
      this.backend.removeItem(encodedKey);
    }
  }
}

export default SimpleStorage;
