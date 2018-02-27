// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './my-theme/index.less';
import {LoadingBar,Input,InputNumber,Button,RadioGroup,Row,Col,Radio,Checkbox,Switch,Select,Option,Slider,Alert,
    Card,Message,Notice,Modal,Progress,Badge,Tag,Tooltip,Poptip, Breadcrumb,Circle,BackTop,Spin,Icon,Table
} from 'iview';
import axios from 'axios';
Vue.component('LoadingBar',LoadingBar);
Vue.component('Input',Input);
Vue.component('InputNumber',InputNumber);
Vue.component('Button',Button);
Vue.component('RadioGroup',RadioGroup);
Vue.component('Row',Row);
Vue.component('Col',Col);
Vue.component('Radio',Radio);
Vue.component('Checkbox',Checkbox);
Vue.component('i-switch',Switch);
Vue.component('Select',Select);
Vue.component('Option',Option);
Vue.component('Slider',Slider);
Vue.component('Card',Card);
Vue.component('Message',Message);
Vue.component('Modal',Modal);
Vue.component('Progress',Progress);
Vue.component('Badge',Badge);
Vue.component('BackTop',BackTop);
Vue.component('Spin',Spin);
Vue.component('Icon',Icon);
Vue.component('Tooltip',Tooltip);
Vue.component('Table',Table);
Vue.prototype.$ajax = axios;
Vue.prototype.$Message = Message;
Vue.prototype.$Spin = Spin;
Vue.prototype.$Notice = Notice;
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);
/*---------基本使用-----------*/
const i18n = new VueI18n({
  locale: 'cn',    // 语言标识
  messages : {
    'cn': require('./lang/cn'),   // 中文语言包
    'en': require('./lang/en')    // 英文语言包
  }
})

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);
router.beforeEach((to, from, next) => {
    LoadingBar.start();
    next();
});

router.afterEach(route => {
    LoadingBar.finish();
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
});
