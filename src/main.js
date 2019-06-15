import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,Toast,Search,Radio,Field} from 'mint-ui'

Vue.component(Field.name, Field);
Vue.component(Radio.name, Radio);
import VueScroller from "./components/VueScroller"
require("es6-promise").polyfill();
//require('./assets/js/vconsole');
Vue.use(VueScroller);
Vue.component(Button.name,Button);
Vue.component(Search.name, Search);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
