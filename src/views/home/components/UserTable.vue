
<script setup lang="ts">
import {  reactive, defineEmits,defineExpose} from "vue";
import userApi from "../../../api/user";
const emit= defineEmits();
//暂时用any,实际开发需要定义具体类型
const state:any = reactive({
	search: {
		name:"",
	},
	tableData:[],
	tableAll:[],
	name:''
});


//获取表格数据（模拟数据，暂时不用axios）
const getData = (id:number) => {
	userApi.query({}).then((data: any) => {
		state.tableData= data;
		state.tableAll= data;
	});
};

const updateData=(id:number,name:string)=>{
	getData(id)
	state.name=name
}
//防抖
 const debounce=(func:Function, delay:any)=>{
  let timeoutId:any
  
  return function(...args:any) {
    const context= this
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
const handleChange=debounce(()=>{
	console.log(1111)
	getSearchData()
},300)

//搜索方式
const getSearchData=()=>{
	let name=state.search.name

	state.tableData=state.tableAll.filter((item:any)=>{
		return item.name.includes(name)
	}) 
}
defineExpose({
	updateData
});
</script>
<template>
	<div class="right-table">
		<div class="tag-box">
			<span>#</span>
			<span>厦门旅游</span>
			<span class="cur-active">/{{state.name}}</span>
		</div>
		<section class="sarch-box">
			<input type="text" v-model="state.search.name" @input="handleChange" placeholder="根据姓名搜索">
		
		</section>
		<table>
			<th></th>
			<th>姓名</th>
			<th>用户名</th>
		<tbody>
			<tr v-for="(item,index) in state.tableData" :key="index">
				<td width="50px">
					<input type="checkbox">
				</td>
				<td>{{item.name}}</td>
				<td>{{item.id}}</td>
			</tr>
		</tbody>

		</table>

	</div>
</template>

<!-- 暂时写css,不用less,scss -->
<style scoped>
.right-table {
	flex: 1;
	padding:0 30px 30px 30px;
}
.tag-box{
	height: 46px;
	line-height: 46px;
	color: #999;
	border-bottom: 1px solid #ccc;
	margin-bottom: 10px;
}
.cur-active{
	color: #000;
	margin-left: 6px;
}
.sarch-box{
	margin-bottom: 20px;
}
.sarch-box>input{
	width: 200px;
	height: px;
	line-height: 26px;
}
.sarch-box>select{
	width: 150px;
	height: 30px;
	line-height: 30px;
	margin-left: 16px;
}
  table {
    border-collapse: collapse; 
    width: 100%;

  }
  th, td {
    padding: 8px; 
    text-align: left;
    border: none; 
		border: 1px solid #ccc;
  }
</style>