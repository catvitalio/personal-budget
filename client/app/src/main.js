import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'
import '@/assets/scss/base.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.component('dateselect', DatePick)

var filter = function(text, length, clamp) {
  clamp = clamp || '...'
  var node = document.createElement('div')
  node.innerHTML = text
  var content = node.textContent
  return content.length > length ? content.slice(0, length) + clamp : content
}

Vue.filter('truncate', filter)
