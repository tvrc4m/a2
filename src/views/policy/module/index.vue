<template>
     <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <breadcrumb :paths="breadcrumbs" :actions="actions"></breadcrumb>
                <p class="text-muted page-title-alt"></p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card-box">
                    <div class="table-responsive">
                        <table class="table m-0 table-striped table-bordered dataTable no-footer">
                            <thead>
                                <tr>
                                    <th v-for="(header,index) in headers" :key="index">{{header.label}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(m,index) in data" :key="index">
                                    <td>{{m.id}}</td>
                                    <td>
                                        <img :src="m.img" style="width: 26px;" alt="">
                                    </td>
                                    <td>{{m.name}}</td>
                                    <td>{{m.sort}}</td>
                                    <td>
                                        <iswitch :value="m.status" @change="changeStatus(m,$event)"></iswitch>
                                    </td>
                                    <td>{{m.createtime | dateFormat}}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-xs waves-effect waves-light m-r-10" @click="editUser(m)">编辑</button>
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-light m-r-10" @click="doDel(m)">删除</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table-loading v-if="loading"></table-loading>
                    </div>
                    <pagination :total="total" :size="params.limit" :page="params.page" @change="changePage"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import breadcrumb from '@/components/breadcrumb/index'
    import iswitch from '@/components/switch/index'
    import tableLoading from '@/components/loading/table'
    import loading_mixin from '@/mixins/loading'
    import page_mixin from '@/mixins/page'
    import { listModule,delModule,updateModuleStatus } from '@/api/policy'
    export default {
        name:"AdminUser",
        components:{
            breadcrumb,
            iswitch,
            tableLoading
        },
        mixins:[page_mixin,loading_mixin],
        data(){
            return {
                headers:[
                    {
                        label:"ID",
                        name:"id",
                        width:"60px",
                        sort:true,
                    },
                    {
                        label:"图片",
                        name:"img",
                    },
                    {
                        label:"模块名",
                        name:"name",
                    },
                    {
                        label:"排序",
                        name:"sort",
                        sort: true,
                    },
                    {
                        label:"状态",
                        name:"status",
                        filters:[{text:"上线中",value:1},{text:"下线中",value:0}],
                    },
                    {
                        label:"创建时间",
                        name:"createtime",
                    },
                    {
                        label:"操作"
                    }
                ],
                data:[],
                breadcrumbs:[
                    {
                        name:"政策速递",
                        route:""
                    },
                    {
                        name:"模块管理",
                    }
                ],
                actions:[
                    {
                        name:"新增",
                        icon:"fa-plus",
                        route:{
                            name:'policy_module_add'
                        }
                    }
                ],
                showModalDel: false,
                total:0,
            }
        },
        methods:{
            editUser(module){
                this.$router.push({name:"policy_module_edit",params:{id:module.id}})
            },
            doDel(module){
                this.$confirm('是否确认删除?').then(()=>{
                    delModule(module.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=module.id)
                    })
                })
            },
            changeStatus(module,status){
                if(status==1){
                    updateModuleStatus(module.id, 1)
                }else{
                    updateModuleStatus(module.id, 0)
                }
            },
            changePage(page){
                this.params.page=page
                listModule(this.params).then(data=>{
                    console.log("data:",data)
                    this.loading=false
                    this.data=data.data
                    this.total=data.total
                    console.log(data)
                })
            }
        },
        mounted(){
            this.params.stype=1
            this.changePage(1)
        }
    }
</script>