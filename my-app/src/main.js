import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import searchBar from './components/searchBar.vue'

Vue.component('searchBar', searchBar)
Vue.directive('thousand', {
  bind(el, binding) {
      console.log(el)
      console.log(binding)
    }
  }),
Vue.config.productionTip = false
Vue.filter('trim-text', function (value) {
  if (typeof value === 'string') {
    if (value.length > 10) {
      return `${value.slice(0, 10)}...`
    }
    else
      return value
  }
  else return value
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
