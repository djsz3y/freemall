import Vue from 'vue'
import Router from 'vue-router'
import Cart from './pages/cart.vue'
import Address from './pages/address.vue'
// 5.【生效路由】这就是vue安装一个插件,使用一个插件的方式.
// 6.总结:一共两个页面,涉及两个路由.
Vue.use(Router);
// 1.【定义路由】输出页面路由,这是router的语法，不知道去看vue-router的简单配置。因为要做路由跳转a-》b
export default new Router({
	routes:[
		{
			path:'/',
			name:'cart',
			// 7.meta是源数据,帮助我们存储一些东西的。
			// 自定义数据。
			// 在路由里可以通过cater路由取到这个路由的一个对象，一个属性auth，通常我们是不需要的。
			meta:{
				auth:true
			},
			// 2.Cart【->cart.vue】相当于一个页面，需要导入组件Cart（页面cart.vue）
			component:Cart
		}, 
		{
			path:'/address',
			name:'cart',
			// 3.广义上叫页面，真实上叫组件，习惯上还是要给组件大写。
			// 需要导入组件Address（页面address.vue）
			component:Address
		}
	]
	
})
// 4.这样路由就定义好了,还需要生效,通过Vue.use()方式