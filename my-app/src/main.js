import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import searchBar from './components/searchBar.vue'

Vue.component('searchBar', searchBar)
Vue.directive('thousand', {
  componentUpdated(el, binding,vnode) {
    console.log(binding.value)
    binding.value = binding.value.replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log(binding.value)
   vnode.context.searchInput=binding.value



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
