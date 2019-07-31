import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Bootstrap from 'bootstrap-css-only'
import BootstrapVue from 'bootstrap-vue'


Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,	
  render: h => h(App),
}).$mount('#app')
