(function (window) {
	'use strict';

	/*
		需求：todomvc 任务管理工具
			* 渲染任务列表
			* 输入任务回车添加任务
			* 点击复选框可以完成任务
			* 点击全选：全部勾选，完成任务
			* 删除任务
			* 双击编辑任务
			* 光标自动聚焦到表单
			* 数据永久保存
			* 路由设置：哈希改变，改变数据  window.onhashchage
			* 清除全部已完成任务
			* 统计未完成的条数
	*/

	/*
		taskList: [
				{
					con: '今天完成作业后吃水煮鱼',
					completed: false
				}, {
					con: '今晚完成购物车效果再打两把游戏',
					completed: true
				}, {
					con: '今晚睡觉记得敷面膜',
					completed: false
				}
			]
	*/

	let key = 'todomvcData';

	let todoStorage = {
		//取数据
		getData() {
			let list = localStorage.getItem(key);//字符串
			return JSON.parse(list) || [];
		},
		setData(data) {//存数据
			localStorage.setItem(key, JSON.stringify(data));
		}
	}


	let vm = new Vue({
		el: '#app',
		data: {//准备假数据渲染到页面 [{},{},{}]
			taskList: todoStorage.getData(),
			msg: '',
			editmsg: '',
			currentItem: null,
			status: ''//存储路由状态
		},
		watch: {
			taskList: {
				deep: true,//对taskList进行深度监听
				handler(newval) {
					// console.log('变了');
					todoStorage.setData(newval);
				}
			}
			// taskList(newval) {
			// 	console.log('变了');
			// }
		},
		methods: {
			addItem() {
				//添加任务
				if (this.msg) {
					//内容不为空，就可以插入到数组里面
					let obj = {
						con: this.msg,
						completed: false
					}
					this.taskList.push(obj);
				}

			},
			removeItem(index) {
				//删除任务
				// console.log(index);
				this.taskList.splice(index, 1);
			},
			clearAll() {
				//删除已完成任务
				this.taskList = this.taskList.filter(item => !item.completed);
			},
			editItem(index) {
				//双击的时候，让编辑表单出现
				// console.log(index);
				this.currentItem = index;
				// this.$refs.editBtn.();
				// console.log(this.$refs.editBtn.value);
				// console.log(this.currentItem);
			},
			changeItem(index) {
				//双击编辑表单，失去焦点或回车的时候，保存内容
				console.log(index);
				this.currentItem = null;
				if (!this.taskList[index].con) {
					//空数据,就删除
					this.taskList.splice(index, 1);
				}
			}
		},
		computed: {
			checkall: {
				get() {
					//点击下方，反控制全选
					return this.taskList.every(item => item.completed);
				},
				set(val) {
					// console.log(val);
					//点击全选，下面的复选框就全部勾选，反正就全不选
					this.taskList.forEach(item => {
						item.completed = val;
					});
				}
			},
			filterItem() {
				//根据哈希值改变数据
				switch (this.status) {
					case 'all'://返回全部
						return this.taskList;
						break;
					case 'active'://返回未完成
						return this.taskList.filter(item => !item.completed);
						break;
					default:
						return this.taskList.filter(item => item.completed);
						break;
				}
			},
			activeCount() {
				//统计条数
				return this.taskList.filter(item => !item.completed).length;
			}
		},
		directives: {
			'focus': {
				inserted(el) {
					el.focus();//底层的方法，没有兼容问题
				}
			},
			'focus2': {
				update(el) {
					el.focus();//底层的方法，没有兼容问题
				}
			}
		}
	});

	// vm.status = 666;
	//判断哈希值的变化来更换页面数据
	window.onhashchange = function () {
		let hash = location.hash.slice(2);
		// console.log(hash);
		vm.status = hash;
	}

	window.onhashchange();

})(window);
