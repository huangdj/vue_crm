import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';

Vue.config.productionTip = false
Vue.prototype.axios = axios;

Vue.use(Toast, {
    type: 'center',
    duration: 2000,
    wordWrap: true,
    width: '200px'
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
