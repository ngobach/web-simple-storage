<template>
  <div>Hello from {{x}}</div>
</template>

<script>
import { backends, codings, Storage, Entry, makeProxy } from '../../dist';

const be = new backends.LocalBackend();
const cd = new codings.AesCoding('Ahihi');
const s = new Storage(be, cd, 'zxc');
const $ = makeProxy(s);
$.zxc = new Entry("world");

export default {
  name: 'App',
  computed: {
    x() {
      return $.zxc.value;
    },
  },
}
</script>

<style>

</style>
