<template>
  <div>Hello from Vue</div>
</template>

<script>
import { backends, codings, Storage, Entry, makeProxy } from '../../dist';

const be = new backends.LocalBackend();
const cd = new codings.RawCoding();
const s = new Storage(be, cd);
const $ = makeProxy(s);

$.a = new Entry("ahihi");
console.log($.a.value);
console.log($.a.expiration);
$.a.value = "dongok";
console.log($.a.value);
console.log($.a.expiration);
// $.a.expiration = 0;
// console.log($.a);

export default {
  name: 'App',
  computed: {
    storage() {
      return s;
    },
  },
}
</script>

<style>

</style>
