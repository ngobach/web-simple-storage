import Backend from './backend';
import BackendTypes from './backend-types';

const PROTECTED_NAMESPACE = 'WSS@';

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
      throw new Error(`Invalid type for CommonBackend: ${BackendTypes[type]}`);
    }
  }

  public getItem(k: string): string {
    return this.s.getItem(`${PROTECTED_NAMESPACE}${k}`);
  }

  public setItem(k: string, d: string): void {
    this.s.setItem(`${PROTECTED_NAMESPACE}${k}`, d);
  }

  public listKeys(): string[] {
    const length = this.s.length;
    return Array(length)
      .fill(null)
      .map((_, idx) => this.s.key(idx))
      .filter((k) => k.startsWith(PROTECTED_NAMESPACE))
      .map((s) => s.substr(PROTECTED_NAMESPACE.length));
  }

  public removeItem(k: string): void {
    this.s.removeItem(`${PROTECTED_NAMESPACE}${k}`);
  }
}

export default CommonBackend;
