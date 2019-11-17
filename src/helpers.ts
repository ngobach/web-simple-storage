import * as backends from './backends';
import * as codings from './codings';
import { DURATION_100_YEARS } from './consts';
import Entry from './entry';
import Storage from './storage';
import makeProxy from './storage-proxy';

function makeStorage<T>(backend: backends.Backend, coding: codings.Coding, bait?: T): Storage<T, keyof T & string> {
  return new Storage(backend, coding);
}

function makeEntry<T>(value: T, expirition: number = Date.now() + DURATION_100_YEARS) {
  return new Entry(value, expirition);
}

interface MakeBackendFn {
  (type: 'local' | 'session', option: {}): void;
}

export {
  makeStorage,
  makeEntry,
  makeProxy,
};
