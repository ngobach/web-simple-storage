<template>
  <div>Hello from Vue</div>
</template>

<script>
import { backends, codings, Storage, Entry, makeProxy } from '../../dist';

const be = new backends.LocalBackend();
const cd = new codings.RawCoding();
const s = new Storage(be, cd);
const $ = makeProxy(s);

$.a = 42;
console.log($.a.value);

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
