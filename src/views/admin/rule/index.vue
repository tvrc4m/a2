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
                <div class="card-box table-responsive">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered dataTable no-footer">
                            <thead>
                                <tr>
                                    <th :class="{sorting:header.sort}" v-for="(header,index) in headers" :key="index">{{header.label}}</th>
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import breadcrumb from '@/components/breadcrumb/index'
    import { getRules,delRule } from '@/api/rule'
    import tableLoading from '@/components/loading/table'
    import loading_mixin from '@/mixins/loading'
    export default {
        name:"AdminRule",
        components:{
            breadcrumb,
            tableLoading
        },
        mixins:[loading_mixin],
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
                        label:"操作"
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
                    }
                ],
                actions:[
                    {
                        name:"新增",
                        icon:"fa-plus",
                        route:{
                            name:'admin_rule_add'
                        }
                    }
                ],
                showModalDel: false,
            }
        },
        methods:{
            editRule(rule){
                this.$router.push({name:"admin_rule_edit",params:{id:rule.id}})
            },
            doDel(rule){
                this.$confirm('是否确认删除?').then(()=>{
                    delRule(rule.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=rule.id)
                    })
                })
            },
            setRule(rule){
                this.$router.push({name:"admin_rule_permission",params:{id:rule.id}})
            },
            changePage(){

            }
        },
        mounted(){
            getRules(1).then(data=>{
                this.loading=false
                this.data=data.data
            })
        }
    }
</script>