import BackendType from './backend-types';

abstract class Backend {
  public readonly type: BackendType;

  constructor(type: BackendType) {
    this.type = type;
  }

  public abstract getItem(key: string): string | null;
  public abstract removeItem(key: string): void;
  public abstract setItem(key: string, data: string): void;
  public abstract listKeys(): string[];
}

export default Backend;
