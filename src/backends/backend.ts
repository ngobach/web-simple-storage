
import BackendType from './backend-types';

abstract class Backend {
  public readonly type: BackendType;

  constructor(type: BackendType) {
    this.type = type;
  }

  protected abstract getItem(key: string): string;
  protected abstract removeItem(key: string): void;
  protected abstract setItem(key: string, data: string): void;
  protected abstract listKeys(): string[];

  
}

export default Backend;
