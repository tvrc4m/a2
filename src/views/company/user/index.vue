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
                                    <td>{{user.nickname}}</td>
                                    <td>{{user.rule}}</td>
                                    <td>{{user.createtime}}</td>
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
    import { getCompanyUsers,delCompanyUser } from '@/api/company/user'
    import { getCompany } from '@/api/company'
    export default {
        name:"CompanyUser",
        components:{
            breadcrumb,
            iswitch,
            tableLoading
        },
        mixins:[page_mixin,loading_mixin],
        data(){
            return {
                company_id:null,
                company:{},
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
                        label:"昵称",
                        name:"nickname",
                    },
                    {
                        label:"角色",
                        name:"rule",
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
                        name:"医院/政府",
                        route:""
                    }
                ],
                actions:[
                    {
                        name:"新增",
                        icon:"fa-plus",
                        route:{
                            name:'company_user_add'
                        }
                    }
                ],
                showModalDel: false,
                total:0,
            }
        },
        methods:{
            editUser(user){
                this.$router.push({name:"company_user_edit",params:{id:user.id}})
            },
            doDel(user){
                this.$confirm('是否确认删除?').then(()=>{
                    delCompanyUser(this.company_id, user.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=user.id)
                    })
                })
            },
            changePage(page){
                getCompanyUsers(this.company_id, page).then(data=>{
                    this.loading=false
                    this.data=data.data
                    this.total=data.total
                })
            }
        },
        mounted(){
            this.company_id=this.$route.params.cid
            this.changePage(1)
            getCompany(this.company_id).then(data=>{
                this.company=data
                this.breadcrumbs.push({
                    name: this.company.name,
                    route:{name:"company"}
                })
                this.breadcrumbs.push({
                    name: "账户管理",
                    route:{name:"company_user",params:{id:this.company_id}}
                })
            })
        }
    }
</script>