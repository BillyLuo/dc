import Vuex from 'vuex';
import state from './state';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
  state
})
export default store;