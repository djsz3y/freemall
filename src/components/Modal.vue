<template>
  <div><!-- 插槽16-1.style="display: none;"去掉默认打开。 -->
		<!-- 插槽24.怎么用呢？md-show这个class了绑定class。【v-bind:class="{'md-show':mdShow}"】
								然后就可以控制遮罩了。-->
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}"><!-- 插槽16-2.把class里md-show去掉，关掉框 -->
      <div class="md-modal-inner">
        <div class="md-top">
					<!-- 插槽19-3.点击关闭按钮要绑定方法为closeModal的点击事件 -->
          <button class="md-close" @click="closeModal">关闭</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
						<!-- 插槽1.动态添加一个弹框，动态传递数据。 -->
            <!-- 插槽2.<p slot="message">你确认要删除此条数据吗?</p> -->
						<!-- 插槽3.定义一个插槽，起个带名字的插槽 -->
						<slot name="message"></slot>
          </div>
          <div class="btn-wrap">
						<!-- 插槽5.定义一个按钮组插槽 -->
						<slot name="btnGroup"></slot>
<!--            插槽6.<a slot="btnGroup" class="btn btn--m" href="javascript:;">确认</a>
            <a slot="btnGroup" class="btn btn--m btn--red" href="javascript:;">关闭</a> -->
          </div>
        </div>
      </div>
    </div>
		<!-- 插槽17.这是一个遮罩框。关掉弹框还有遮罩框md-overlay，所以这个也要一起控制。 -->
    <!-- 插槽25-1.弹框已经生效了。默认mdShow是false -->
		<!-- 插槽25-2.遮罩层的控制v-if="mdShow"
								mdShow是true显示遮罩，是false不显示遮罩 -->
								<!-- v-if v-show区别：没有DOM节点，有DOM节点，都控制元素渲染。
										v-if判断是否加载，需要时加载，有更高的切换开销，减轻服务器压力。运行时条件很少改变，用v-if。
										v-show调整css display属性，客户端操作更流畅，有更高的初始渲染开销。非常频繁的切换，用v-show。
										不显示在视图上的话，这里用v-if渲染时不会渲染（无DOM节点），用v-show就是设置display为none（有DOM节点）。
								-->
		<div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
		<!-- 插槽26-1.怎么设置一般点叉关闭，点遮罩层关闭？
								在遮罩层的这个div里也定义一个事件@click="closeModal"。
		-->
  </div>
</template>

<script>
export default {
  name: 'modal',
	// 插槽18-1.怎样让组件和cart.vue的属性相结合？那就是mdShow这个属性那props:['mdShow']里就要用
	// 插槽18-2.（props: ['mdShow'],）是一种简写。当然也可以用Object方式：
				// props: {
				// 	'mdShow':Boolean
				// }
	props: ['mdShow'],
	// 插槽19-1.很明显要调用方法。任意一个组件都是有methods的。
	// 插槽19-2.编写方法closeModal，上面绑定点击事件了。
	// 插槽19-3.点击关闭按钮要绑定方法为closeModal的点击事件
							// <button class="md-close" @click="closeModal">关闭</button>
	methods:{
		closeModal(){
			// 插槽20-1.不在里面直接关掉,传递父组件来关闭。调用父组件。
			// 插槽20-2.<modal :mdShow="modalConfirm">是子组件触发父组件的一个事件modalConfirm
			// 插槽20-3.怎么通过子组件触发父组件的一个事件？记住父子组件之间传递是通过this.$emit()触发这个事件。
			this.$emit('close');//即触发父组件的close事件的方法。
			/**插槽26-2.
			 * 重要！！！
			 * 不能写这个this.mdShow = false;这样会只能点击一次删除图标的弹框然后点叉号关闭后再也点不了。
			 * 不管开,还是关【this.$emit('close');】,一定通过父组件控制的
			 */
			
		}
	}
}
</script>