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
                                <tr v-for="(company,index) in data" :key="index">
                                    <td>{{company.id}}</td>
                                    <td>{{company.name}}</td>
                                    <td>
                                        <router-link :to="{name:'service_setting',params:{alias:service.alias,cid:company.id}}" v-for="service in company.services" :key="service.alias">&nbsp;[{{service.name}}]&nbsp;</router-link>
                                    </td>
                                    <td>{{company.contact}}</td>
                                    <td>{{company.address}}</td>
                                    <!-- <td>{{company.sort}}</td> -->
                                    <td>
                                        <button type="button" class="btn btn-white btn-xs waves-effect waves-light m-r-10" @click="$router.push({name:'company_rule',params:{cid:company.id}})">角色列表</button>
                                        <button type="button" class="btn btn-white btn-xs waves-effect waves-light m-r-10" @click="$router.push({name:'company_user',params:{cid:company.id}})">用户列表</button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-xs waves-effect waves-light m-r-10" @click="editUser(company)">编辑</button>
                                        <button type="button" class="btn btn-warning btn-xs waves-effect waves-light m-r-10" @click="$router.push({name:'company_office',params:{cid:company.id}})">科室</button>
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-light m-r-10" @click="doDel(company)">删除</button>
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
    import { getCompanies,delCompany } from '@/api/company'
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
                        label:"企业名",
                        name:"name",
                    },
                    {
                        label:"开通企业服务",
                        name:"services",
                    },
                    {
                        label:"联系人",
                        name:"contact",
                    },
                    {
                        label:"地址",
                        name:"address",
                    },
                    // {
                    //     label:"排序",
                    //     name:"sort",
                    //     sort: true
                    // },
                    {
                        label:"用户/角色",
                        name:"user_rule",
                        sort: true
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
                    },
                    {
                        name:"医院/政府管理",
                    }
                ],
                actions:[
                    {
                        name:"新增",
                        icon:"fa-plus",
                        route:{
                            name:'company_add'
                        }
                    }
                ],
                showModalDel: false,
                total:0,
            }
        },
        methods:{
            editUser(company){
                this.$router.push({name:"company_edit",params:{id:company.id}})
            },
            doDel(company){
                this.$confirm('是否确认删除?').then(()=>{
                    delUser(company.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=company.id)
                    })
                })
            },
            changeStatus(company,status){
                if(status==1){
                    editUserStatus(company.id, 1)
                }else{
                    editUserStatus(company.id, 0)
                }
            },
            changePage(page){
                this.params.page=page
                getCompanies(this.params).then(data=>{
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