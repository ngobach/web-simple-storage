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

  private checkEntry(key: keyof T): void {
    const encodedKey = this.getRawKeyName(key);
    const stringEntry = this.coding.decode(this.backend.getItem(encodedKey));
    const entry = Entry.parse<T[typeof key]>(stringEntry);
    if (entry.expiration <= Date.now()) {
      this.backend.removeItem(encodedKey);
    }
  }

  private getRawKeyName(key: keyof T): string {
    return this.coding.encode(`${this.namespace}:${key}`);
  }
}

export default SimpleStorage;
