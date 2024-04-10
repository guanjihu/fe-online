<script setup lang="ts">
import { ref, reactive, onMounted,defineEmits} from "vue";
import orgApi from "../../../api/org";

const emit = defineEmits<{
  (e: "updateData",id:Number,name:string): void;
}>();

const active = ref(-1);
const state = reactive({
	user: [],
});

onMounted(() => {
	getData();
});

//获取部门数据（模拟数据，暂时不用axios）
const getData = () => {
	orgApi.query("3").then((data: any) => {
		console.log(data, "data");
		state.user = data;
		//默认展示第一个部门数据
		handleOrg(0,state.user[0].name);
	});
};
const handleOrg = (id: number,name:string) => {
	active.value = id;
	//简单粗暴，暂时通过父组件来传递事件，后面可以用pina,mitt(事件总线来处理)
	emit('updateData',id,name)
};
</script>
<template>
	<div class="left-tree">
		<div class="top-box">
			<span>部门</span>
			<span>+</span>
		</div>
		<!-- 看接口不是tree结构，暂时不做递归组件，实现多级暂时展示,当然也可以用ui库实现-->
		<ul>
			<li :class="{ 'item-active': active === index }" v-for="(item, index) in state.user" :key="index" @click="handleOrg(index,item.name)"><span class='icon-box'>+</span>{{ item.name }}</li>
		</ul>
	</div>
</template>
<!-- 暂时写css,不用less,scss -->
<style scoped>
.left-tree {
	width: 300px;
	border-right: 1px solid #ccc;
}
.top-box {
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
	border-bottom: 1px solid #ccc;
}
.top-box > span:nth-child(2) {
	color: #ccc;
	font-size: 18px;
}
.left-tree > ul > li {
	height: 40px;
	padding: 0 14px;
	line-height: 40px;
	border-bottom: 1px solid #ccc;
	overflow: hidden;
}
.left-tree > ul > li.item-active {
	color: dodgerblue;
	background: rgba(30, 144, 255, 0.2);
}
.left-tree > ul > li:hover {
	color: dodgerblue;
	background: rgba(30, 144, 255, 0.2);
}
.icon-box{
	padding:0 8px;
}
</style>
