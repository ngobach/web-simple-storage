import Vue from 'vue';
import App from './app.vue';

const root = document.getElementById('app');

new Vue({
  el: root,
  render(ce) {
    return ce(App);
  },
})
