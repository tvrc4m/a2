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
                                <tr v-for="(rule,index) in data" :key="index">
                                    <td>{{rule.id}}</td>
                                    <td>{{rule.name}}</td>
                                    <td>{{rule.remark}}</td>
                                    <td>{{rule.createtime | dateFormat}}</td>
                                    <td>
                                        <button type="button" class="btn btn-white btn-xs waves-effect waves-light m-r-10" @click="setRule(rule)">配置规则</button>
                                        <button type="button" class="btn btn-primary btn-xs waves-effect waves-light m-r-10" @click="editRule(rule)">编辑</button>
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-light m-r-10" @click="doDel(rule)">删除</button>
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
    import { getRules,delRule } from '@/api/company/rule'
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
                rule:{},
                headers:[
                    {
                        label:"ID",
                        name:"id",
                        width:"60px",
                        sort:true
                    },
                    {
                        label:"角色名",
                        name:"name",
                    },
                    {
                        label:"备注",
                        name:"remark",
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
                        name:"角色管理",
                        route:{name:"rule"}
                    }
                ],
                actions:[
                    {
                        name:"新增",
                        icon:"fa-plus",
                        route:{
                            name:'rule_add'
                        }
                    }
                ],
                total:0,
            }
        },
        methods:{
            editRule(rule){
                this.$router.push({name:"rule_edit",params:{id:rule.id}})
            },
            doDel(rule){
                this.$confirm('是否确认删除?').then(()=>{
                    delRule(rule.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=rule.id)
                    })
                })
            },
            setRule(rule){
                this.$router.push({name:"rule_permission",params:{id:rule.id}})
            },
            changePage(page){
                this.params.page=page
                getRules().then(data=>{
                    this.loading=false
                    this.data=data.data
                    this.total=data.total
                })
            }
        },
        mounted(){
            this.changePage(1)
        }
    }
</script>