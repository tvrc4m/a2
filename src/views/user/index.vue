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
                                <tr v-for="(user,index) in data" :key="index">
                                    <td>{{user.id}}</td>
                                    <td>{{user.phone}}</td>
                                    <td>{{user.realname}}</td>
                                    <td>{{user.sex==1?"男":"女"}}</td>
                                    <td>{{user.company}}</td>
                                    <td>{{user.job}}</td>
                                    <td>
                                        <iswitch :value="user.status" @change="changeStatus(user,$event)"></iswitch>
                                    </td>
                                    <td>{{user.createtime | dateFormat}}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-xs waves-effect waves-light m-r-10" @click="editUser(user)">编辑</button>
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-light m-r-10" @click="doDel(user)">删除</button>
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
    import { getUsers,delUser,editUserStatus } from '@/api/user'
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
                        sort:true
                    },
                    {
                        label:"手机号",
                        name:"phone",
                    },
                    {
                        label:"姓名",
                        name:"realname",
                    },
                    {
                        label:"性别",
                        name:"sex",
                        filters:[{text:"男",value:1},{text:"女",value:2}],
                    },
                    {
                        label:"单位",
                        name:"company",
                    },
                    {
                        label:"职务",
                        name:"job",
                    },
                    {
                        label:"状态",
                        name:"status",
                        filters:[{text:"启用",value:1},{text:"禁用",value:0}],
                    },
                    {
                        label:"创建时间",
                        name:"createtime",
                    },
                    {
                        label:"操作",
                        name:"opt",
                    }
                ],
                data:[],
                breadcrumbs:[
                    {
                        name:"后台账户",
                        route:""
                    },
                    {
                        name:"账户管理",
                    }
                ],
                actions:[
                    {
                        name:"新增",
                        icon:"fa-plus",
                        route:{
                            name:'user_add'
                        }
                    }
                ],
                showModalDel: false,
                total:0,
            }
        },
        methods:{
            editUser(user){
                this.$router.push({name:"user_edit",params:{id:user.id}})
            },
            doDel(user){
                this.$confirm('是否确认删除?').then(()=>{
                    delUser(user.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=user.id)
                    })
                })
            },
            changeStatus(user,status){
                if(status==1){
                    editUserStatus(user.id, 1)
                }else{
                    editUserStatus(user.id, 0)
                }
            },
            changePage(page){
                this.params.page=page
                getUsers(this.params).then(data=>{
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