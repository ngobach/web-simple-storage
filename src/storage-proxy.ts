import { DURATION_100_YEARS } from './consts';
import Entry from './entry';
import Storage from './storage';

type ProxiedObject<T> = {
  [k in keyof T]?: Entry<T[k]>;
};

function makeProxy<T>(inner: Storage<T>) {
  const handler = {
    get(obj: {}, prop: keyof T): Entry<T[typeof prop]> {
      const entry = inner.getEntry(prop);
      if (entry !== null) {
        entry.setCallback((e) => {
          inner.putEntry(prop, e);
        });
      }
      return entry;
    },
    set(obj: {}, prop: keyof T, entry: Entry<T[typeof prop]>, receiver: any): boolean {
      inner.putEntry(prop, entry);
      return true;
    },
  };

  return new Proxy({}, handler) as ProxiedObject<T>;
}

export default makeProxy;
