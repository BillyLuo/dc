// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './my-theme/index.less';
import iView from 'iview';
import axios from 'axios';
import particlesJS from "../static/js/particles/js/particles.js";
import nodeForge from 'node-forge';
Vue.use(iView);
Vue.prototype.$ajax = axios;
Vue.prototype.particlesJS = particlesJS;
Vue.prototype.nodeForge = nodeForge;
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach(route => {
    iView.LoadingBar.finish();
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
