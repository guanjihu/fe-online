<script setup lang="ts">
import { ref, } from "vue";
import OrgTree from "./components/OrgTree.vue";
import UserTable from "./components/UserTable.vue";

const tableId=ref()

  // 监听来自兄弟组件的消息
	const handleUpdated = (id:number,name:string) => {
		console.log(id,'监听来自兄弟组件的消息')
		tableId.value.updateData(id,name)
    };

</script>

<template>
	<div class="wrapper">
		<!-- 头部区域 -->
		<header class="head-area">
			<ul>
				<li class="item-active">成员管理</li>
				<li>团队管理</li>
				<li>职位维护</li>
			</ul>
		</header>
		<!-- 内容区域 -->
		<section class="centent-area">
			<org-tree @updateData="handleUpdated"></org-tree>
			<user-table ref="tableId"></user-table>
		</section>
	</div>
</template>
<!-- 暂时写css,不用less,scss -->
<style scoped>
.wrapper {
	overflow: hidden;
}
.head-area {
	height: 40px;
	line-height: 40px;
}
.head-area > ul {
	list-style: none;
	padding: 0 26px;
	height: 100%;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #ccc;
}
.head-area > ul > li {
	cursor: pointer;
	text-align: center;
	margin: 0 20px;
}
.head-area > ul > li.item-active {
	color: dodgerblue;
	border-bottom: 2px solid dodgerblue;
}

.centent-area {
	display: flex;
	height: calc(100vh - 40px);
}
</style>
