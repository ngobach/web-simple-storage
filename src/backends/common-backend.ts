import Backend from './backend';
import BackendTypes from './backend-types';

/**
 * Abstract class for both Local Storage and Session Storage
 */
class CommonBackend extends Backend {
  private s: Storage;

  constructor(type: BackendTypes) {
    super(type);
    if (type === BackendTypes.LOCAL) {
      this.s = localStorage;
    } else if (type === BackendTypes.SESSION) {
      this.s = sessionStorage;
    } else {
      throw new Error(`Invalid type for CommonStorage: ${BackendTypes[type]}`);
    }
  }

  public getItem(k: string): string {
    return this.s.getItem(k);
  }

  public setItem(k: string, d: string): void {
    this.s.setItem(k, d);
  }

  public listKeys(): string[] {
    const length = this.s.length;
    return Array(length)
      .fill(null)
      .map((_, idx) => this.s.key(idx));
  }

  public removeItem(k: string): void {
    this.s.removeItem(k);
  }
}

export default CommonStorage;
