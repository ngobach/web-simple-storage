import Entry from './entry';
import Storage from './storage';

type ProxiedObject<T, K extends keyof T & string> = {
  [k in K]: Entry<T[k]>;
};

function makeProxy<T, K extends keyof T & string>(inner: Storage<T, K>) {
  const handler = {
    get(obj: {}, prop: K) {
      return inner.getEntry(prop);
    },
    set(obj: {}, prop: K, v: T[typeof prop], receiver: any): boolean {
      inner.putEntry(prop, new Entry<T[K]>(v, 1e15));
      return true;
    },
  };

  return new Proxy({}, handler) as ProxiedObject<T, K>;
}

export default makeProxy;
