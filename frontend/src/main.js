import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from "vue-socket.io";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'https://sj-projekat-api-2021.herokuapp.com/',
  vuex: {
    store,
    actionPrefix: 'socket_'
  }
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

