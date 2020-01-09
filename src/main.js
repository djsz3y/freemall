import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 8.导入定义的路由router.js，导入的是小写的，在实例化Vue时就不用变了。
import router from './router'

// 关联axios和vue
Vue.use(VueAxios,axios);

// 生产提示开关，生产环境下不提示，只有开发环境才提示。
Vue.config.productionTip = false

new Vue({
	// 9.怎么使用这个路由router.js
	// 9.1当对象,key和value一样的时候,可以简写成【router,】
	// 9.2当不一样时，要写成【router,Router import Router from './router'】
	router,
	render: h => h(App),
}).$mount('#app')
