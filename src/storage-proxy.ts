import { DURATION_100_YEARS } from './consts';
import Entry from './entry';
import Storage from './storage';

type ProxiedObject<T, K extends keyof T & string> = {
  [k in K]: Entry<T[k]>;
};

function makeProxy<T, K extends keyof T & string>(inner: Storage<T, K>) {
  const handler = {
    get(obj: {}, prop: K): Entry<T[K]> {
      const entry = inner.getEntry(prop);
      if (entry !== null) {
        entry.setCallback((e) => {
          inner.putEntry(prop, e);
        });
      }
      return entry;
    },
    set(obj: {}, prop: K, entry: Entry<T[typeof prop]>, receiver: any): boolean {
      inner.putEntry(prop, entry);
      return true;
    },
  };

  return new Proxy({}, handler) as ProxiedObject<T, K>;
}

export default makeProxy;
