import Vue from 'vue'
import App from './App'

import router from './config/router'
import store from './config/store'
import './config/msgs'
import './config/axios'

import AOS from 'aos'
import BootstrapVue from 'bootstrap-vue'
import SvgTransition from 'vue-svg-transition';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faEdit, 
  faTrashAlt, 
  faDoorOpen, 
  faBookOpen, 
  faSignInAlt, 
  faSpinner, 
  faHeart, 
  faSearch, 
  faMapMarkerAlt,
  faCheck,
  faTimes,
  faHeartBroken
} from '@fortawesome/free-solid-svg-icons'

// importando os icones que serão utilizados no projeto
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(
  faEdit, 
  faTrashAlt,
  faDoorOpen,
  faBookOpen,
  faSignInAlt,
  faSpinner,
  faHeart,
  faSearch,
  faMapMarkerAlt,
  faCheck,
  faTimes,
  faHeartBroken
)

Vue.filter('celular', (valor) => {
  const arr = valor.split('')
  arr.splice(0, 0, '(')
  arr.splice(3, 0, ')')
  arr.splice(4, 0, ' ')
  arr.splice(6, 0, ' ')
  arr.splice(11, 0, '-')

  return arr.join('')
})

Vue.config.productionTip = false

AOS.init();
Vue.use(BootstrapVue)
Vue.use(SvgTransition);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')