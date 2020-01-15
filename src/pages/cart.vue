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
                  <a href="javascript:;" class="item-edit-btn">
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
              <a href="javascipt:;">
                <span class="checkbox-btn item-check-btn check">
                  <svg class="icon icon-ok">
                    <use xlink:href="#icon-ok" /></svg>
                </span>
                <span>全选</span>
              </a>
            </div>
          </div>
          <div class="cart-foot-r">
            <div class="item-total">
              总价: <span class="total-price">￥89.00元</span>
            </div>
            <div class="btn-wrap">
              <a class="btn btn--red btn--dis">结算</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 标签的方式用modal组件 -->
  <modal></modal>
  <!-- 标签的方式用nav-footer组件 -->
  <nav-footer></nav-footer>
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
			cartList:[]
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
		}
	}
}
</script>