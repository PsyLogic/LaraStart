
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');



window.Vue = require('vue');
import VueRouter from 'vue-router'
import moment from 'moment'
import VueProgressBar from 'vue-progressbar'

// Sweet Alert
import Swal from 'sweetalert2'
window.swal = Swal
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.toast = toast

Vue.use(VueRouter)

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue')
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue')
);

import { 
    Form,
    HasError,
    AlertError,
    AlertErrors, 
    AlertSuccess
} from 'vform'


window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)

  
const routes = [
    { path: '/dashboard', component: require('./components/dashboard.vue')},
    { path: '/profile', component: require('./components/profile.vue')},
    { path: '/users', component: require('./components/users.vue')},
]

const router = new VueRouter({
    // mode:'history',
    routes // short for `routes: routes`
})


Vue.use(VueProgressBar, {
    color: 'green',
    failedColor: 'red',
    height: '2px'
})


// Global Filter
Vue.filter('capitalize',function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
})

Vue.filter('humainDate',function(date){
    return moment(date).format('YYYY/MM/DD');
})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
