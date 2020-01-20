<template>
<div>
  <!-- 标签都是小写的。nav-header+Tab -->
  <!-- 标签的方式用nav-header组件 -->
  <nav-header></nav-header>
  <!-- 购物车商品内容 -->
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">首页</a>
        <span>购物车</span>
      </nav>
    </div>
  </div>
  <!-- 定义购物车页面图标 -->
  <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <symbol id="icon-ok" viewBox="0 0 32 32">
        <title>ok</title>
        <path class="path1"
          d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z">
        </path>
      </symbol>
      <symbol id="icon-del" viewBox="0 0 32 32">
        <title>delete</title>
        <path class="path1"
          d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z">
        </path>
        <path class="path2"
          d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z">
        </path>
        <path class="path3"
          d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z">
        </path>
        <path class="path4"
          d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z">
        </path>
      </symbol>
    </defs>
  </svg>
  <div class="container">
    <div class="cart">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>我的购物车</span></h2>
      </div>
      <div class="item-list-wrap">
        <div class="cart-item">
          <div class="cart-item-head">
            <ul>
              <li>商品信息</li>
              <li>商品金额</li>
              <li>商品数量</li>
              <li>总金额</li>
              <li>编辑</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="item in cartList" v-bind:key="item.productId">
              <div class="cart-tab-1">
                <div class="cart-item-check">
                  <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'checked':item.checked}" @click="editCart('checked',item)">
                    <svg class="icon icon-ok">
                      <use xlink:href="#icon-ok"></use>
                    </svg>
                  </a>
                </div>
                <div class="cart-item-pic">
                  <img v-bind:src="'/imgs/'+item.productImage">
                </div>
                <div class="cart-item-title">
                  <div class="item-name">{{item.productName}}</div>
                </div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price">{{item.productPrice}}</div>
              </div>
              <div class="cart-tab-3">
                <div class="item-quantity">
                  <div class="select-self select-self-open">
                    <div class="select-self-area">
                      <a class="input-sub" v-on:click="editCart('minus',item)">-</a><!-- 监听事件="事件名称(获取加/减,对谁进行加减?item.productNum。所以传item)" -->
                      <span class="select-ipt">{{item.productNum}}</span>
                      <a class="input-add" v-on:click="editCart('add',item)">+</a><!-- 很明显下面要定义这么一个方法 -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total">{{item.productPrice*item.productNum | currency}}</div>
              </div>
              <div class="cart-tab-5">
                <div class="cart-item-opration">
									<!-- 插槽11.删除图标打开弹框，删除图标点击后删除,根据id删掉，所以要传参，把item对象传过来
															所以要在底下定义一个delCartConfirm方法-->
                  <a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item)">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-foot-wrap">
        <div class="cart-foot-inner">
          <div class="cart-foot-l">
            <div class="item-all-check">
							<!-- 全选反选1.绑定事件toggleCheckAll，a标签是全选 -->
              <a href="javascipt:;" @click="toggleCheckAll">
								<!-- 全选反选7.根据计算属性动态绑定属性class的check为true或false。-->
                <span class="checkbox-btn item-check-btn" v-bind:class="{'check':checkAllFlag}">
                  <svg class="icon icon-ok">
                    <use xlink:href="#icon-ok" /></svg>
                </span>
                <span>全选</span>
              </a>
            </div>
          </div>
          <div class="cart-foot-r">
            <div class="item-total">
							<!-- 动态金额2.这里不要写方法，是计算属性，通过方法来计算，还是个属性。
														加个过滤器filter currency。
							-->
              总价: <span class="total-price">{{totalPrice | currency}}</span>
            </div>
            <div class="btn-wrap">
							<!-- 结算按钮2.btn--dis是变灰。一些被选中返回true，都不选返回false。一些被选中结算按钮变红，所以是!checkedCount
														点击事件，跳到地址选配页面。
							-->
              <a class="btn btn--red" v-bind:class="{'btn--dis':!checkedCount}" @click="checkOut">结算</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 标签的方式用nav-footer组件 -->
  <nav-footer></nav-footer>
	<!-- 标签的方式用modal组件 -->
	<!-- 插槽8.绑定事件显示弹框，一般用v-bind绑定事件，v-bind:任何属性可绑（src）
						【v-bind:属性】 可以简写成冒号属性即 【:属性】
						【v-on可简写@】 如【v-on:click => @click】 -->
	<!-- 插槽9.属性里一定有监听对象，所以modal一定要定义好，在下面data(){}里。 -->
	<!-- 插槽21.父组件怎么接收？在cart.vue里，父组件添加自定义事件@close="closeModal"。
							这个close是this.$emit('close'); -->
	<modal :mdShow="modalConfirm" @close="closeModal">
		<!-- 插槽28-1.新语法用template模板(官方)：<template v-slot:message></template>不能用v-slot="message"
								所有插槽都用template模板包一层。
		-->
		<template v-slot:message>
			<p>你确认要删除此条数据吗?</p>
		</template>
		<!-- 插槽4.使用插槽message：
							<p slot="message">你确认要删除此条数据吗?</p> -->

		<!-- 插槽28-2.新语法用template模板包一层，也没有div了 -->
		<template v-slot:btnGroup>
		<!-- 插槽7.使用按钮组插槽，一般用div框起来，给div一个插槽，a标签里slot属性就去掉了 -->
		<!-- <div slot="btnGroup"> -->
			<!-- 插槽29.delCart：彻底的删掉数据。 -->
			<a class="btn btn--m" href="javascript:;" @click="delCart">确认</a>
			<!-- 插槽27.这里是@click，不是自定义事件（自定义事件是因为从Modal.vue关联到@close，不然难道触发所有@click吗，显然不可能）了，可以触发modalConfirm
									@click有两种写法：一种是调用方法closeModal，一种是表达式modalConfirm=false。
									vue的事件里不仅可以写方法，也可以写逻辑表达式。
			-->
			<a class="btn btn--m btn--red" href="javascript:;" @click="modalConfirm=false">关闭</a>
		<!-- </div> -->
		</template>
	</modal>
</div>
</template>

<script>
import NavHeader from './../components/Header.vue'
import NavFooter from './../components/Footer.vue'
import Modal from './../components/Modal.vue'
// import axios from 'axios'
export default {
	name: 'cart',
	// data不要用全局的data:[],要用局部的data(){}方式。
	// 因为页面的属性是针对cart这个页面去使用的，而不是全局使用的。
	// 如果直接暴露一个object，就变成了一个全局的data变量了。
	data(){
		return{
			modalConfirm:false//插槽10.弹框显示属性。默认false，什么时打开呢，点删除按钮的时候。
			,delItem:''//插槽15-2.准备删除的对象
			//,checkAllFlag:false//全选反选4-2.所以data(){}里要定义变量checkAllFlag:false。
			,cartList:[]

		}
	},
	// 引入组件，里面可以包含n个组件。
	// 导入完了就要用。
	components:{
		NavHeader,
		NavFooter,
		Modal
	},
	mounted:function(){
		this.init();//初始化购物车列表
	},
	// 全选反选5-2.定义计算属性：实时监听某些数据的变化
	computed:{
		checkAllFlag(){
			/**
			 * 这里判断	mock数据是否全部被选中了，有一项没被选中就不能选中全选。
			 * 遍历cartList:this.cartList.every((item)=>{}),所有对象都符合条件就返回true。
			 * cartList里每一项item的checked都是true时，这个cartList就返回true
			 * 这是every的一个作用。
			 */
			// 当数据中所有对象都返回true，整体才会返回true。
			return this.cartList.every((item)=>{
				return item.checked;//有一个是false，整体就是false。
			});
		},
		// 结算按钮1.判断购物车是否有选中的商品
		checkedCount(){
			// 购物车到底有没有选中商品。
			return this.cartList.some((item)=>{
				return item.checked;//某一些满足就返回true
			})
		},
		// 计算总金额
		totalPrice(){
			// 动态金额1.还是要在计算属性里。有一项就会变，要实时计算。
			let money = 0;
			this.cartList.forEach((item)=>{
				// 先判断选没选中,选中以后才能计算金额。
				if(item.checked){
					money += item.productPrice*item.productNum;
				}
			});
			return money;
			//一旦点删除，item对象就发生变化。cartList少了一个子元素，就会重新计算。
			//cartList没有发生变化，是不会进入到方法totalPrice里的。
			//这个方法只会监视cartList的变化，cartList不变，这个方法不会进去。
		}
	},
	filters:{
		// 定义一个币种,货币的格式化
		// currency:function(){}
		// currency:()=>{}箭头函数
		// currency(){}简写
		// currency用来格式化每个item的总金额的。
		// 金额怎么格式化两位，并且拼接一个符号?
		// value.toFixed(2)本身就会四舍五入。
		// 想测试一个方法,直接打开控制台F12Console
		currency(value){
			if(!value)return 0.00;
			return '￥' + value.toFixed(2) + '元';
		}
		// 怎么用过滤器？网上找金额的位置。
	},
	methods:{
		// 初始化购物车列表数据
		init(){
			// axios.get("");
			// 发get请求怎么发呢？http://localhost:8080/mock/cart.json前面的端口就不需要了。
			this.axios.get("/mock/cart.json").then((response)=>{
				// console.log(response);//"no-console":"off", // package.json里给"eslintConfig"的"rules": {},里面加个"no-console":"off"然后重新启动编译。
				//这个data整个axios的一个结构。
				let res = response.data;//"no-unused-vars":0
				// debugger;//调试 "no-debugger":"off",
				this.cartList = res.data;
			})
		},
		/** 
		 * 修改购物车数量 
		 * @date 2020-01-15 
		 * type {Object} str 或者叫flag 要知道改了什么东西。
		 * item {Object} 传过来的对象 
		 * @return {Boolean} 返回值 
		 * @author 田素源 
		 */
		editCart(type,item){
			if(type == 'add'){
				item.productNum++;//vue使用dom操作，setter getter，对象属性变化，触发setter，setter调用视图监听器，同时渲染视图。
			}else if(type == 'minus'){
				item.productNum--;//vue3.0使用代理
			}else{
				// 第62行：<a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'checked':item.checked}" @click="editCart('checked',item)">
				item.checked = !item.checked;
				//清除一下缓存
			}
		},
		// 插槽12.删除数据,确认弹框
		delCartConfirm(item){
			// 插槽14.删除真的要删,所以要先把这个删除的对象保存下来
			// 插槽15-1.delItem是个变量,所有的变量都要定义,所以在上面data(){}里定义一下。
			this.delItem = item;
			// 插槽13.点击时确认是否删除,所以先把对象放开。
			this.modalConfirm = true;//点击时对象设为true。
			
		},
		// 插槽22.定义关闭弹框的方法。
		closeModal(){
			this.modalConfirm = false;//关闭时通过父组件关掉。
			// 插槽23.总结:关掉的对象会传到<modal :mdShow里,传递的属性叫mdShow,跑到Modal.vue的props:['mdShow']
			// 插槽24.怎么用呢？md-show这个class了绑定class。
		},
		/**
		 * 插槽30.删除购物车数据。
		 * 删除之前购物车的对象已经保存出来了：见插槽14.this.delItem = item;。
		 */
		delCart(){
			// 先获取一下item
			let delItem = this.delItem;
			//渲染是用v-for循环cartList渲染上去的。把cartList干掉就可以了。
			this.cartList.forEach((item,index)=>{
				if(delItem.productId == item.productId){
					// splice 2-5 9:47
					this.cartList.splice(index,1);
					this.modalConfirm = false;
				}
			})
			// 好用神奇数组方法
		},
		/**
		 * 全选反选2.全选和反选
		 * 弄个方法toggleCheckAll
		 */
		toggleCheckAll(){
			/**
			 * 全选反选3.总金额要计算属性,所以要控制上面让每一个对象都选中或者都不选中,
			 * 首先要知道当前点的全选是选中还是没选中,
			 * 所以要定义个变量,立一个flag
			 */ 
			//全选反选4-1.所以data(){}里要定义变量checkAllFlag。
			//默认false，再选是true，默认false怎么来，动态计算，一开始不知道当前选中、没选中。
			//怎么知道选中的是全选、非全选？取决于mock数据全部选中了，即全选，一条没选中，就不能全选
			// 所以全选反选4-2的data(){checkAllFlag:false}不能这样定义，要用到计算属性，因为这些数据都用到了mock接口的json。
			let flag = !this.checkAllFlag;
			// 全选反选5-1.怎么定义计算属性？computed:{},
			
			// 全选反选6.flag是当每一项都被选，this.checkAllFlag应该全选即true，因为此方法是切换的，所以应该反选，这个flag就是false。
			this.cartList.forEach((item)=>{
				item.checked = flag;//应该反选，所以把flag给了当前cartList的每一项item。
			})
		},
		// 结算按钮3.按钮灰色还是可以点的。所以要
		checkOut(){
			// 一些被选中的话
			if(this.checkedCount){
				// 页面跳转JS API方式路由------这里很重要80%不知道。
				this.$router.push({
					path:'/address'
				})
				//页面是单页面，很自然的就跳转过来了。
				/**
				 * 整个页面是没有变化的，就是把组件给替换掉了。
				 * <Root> <App> <Cart>-》<Root> <App> <Addr>
				 * 这是单页面很友好的体验
				 * 但是不利于su，搜索引擎搜索不到，本来就是一个页面。
				 * 
				 * 本节课：
				 * 金额计算，全选反选
				 * 计算属性computed，every每一个都选中就，some部分选中就
				 * 
				 * 本章：
				 * v-if v-bind v-for循环指令 v-on自定义事件的指令
				 * 过滤器（局部过滤器） 插槽（记得新语法插槽） computed计算属性的语法
				 * 弹框 控制 绑定class 绑定img图片
				 * 
				 * 知识点很多，多看几遍
				 */
			}
		}
	}
	
}
</script>