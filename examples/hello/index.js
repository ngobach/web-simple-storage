import { backends, codings, Storage, Entry } from '../../dist';

const be = new backends.LocalBackend();
const cd = new codings.RawCoding();
const s = new Storage(be, cd);
s.putEntry('ahihi', new Entry('do ngoc', Date.now() + 100000));
alert(s.getEntry('ahihi').value);