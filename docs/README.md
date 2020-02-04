Documentation
====

Example
----

```javascript
import { backends, codings, Storage, Entry, makeProxy } from '../../dist';

const be = new backends.LocalBackend();
const cd = new codings.AesCoding('my$ecret');
const s = new Storage(be, cd, 'app');
const $ = makeProxy(s);
$.zxc = new Entry('hello world');
console.log($.zxc.value);
```

API
----

> TODO:
