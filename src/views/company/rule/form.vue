<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <breadcrumb :paths="breadcrumbs"></breadcrumb>
                <p class="text-muted page-title-alt"></p>
            </div>
        </div>
        <div class="row">
            <form class="form-horizontal" role="form">
                <iform type="text" label="角色名" placeholder="请输入角色名" :value.sync="rule.name" required></iform>
                <iform type="textarea" label="备注说明" placeholder="请输入备注说明" :value.sync="rule.remark"></iform>
                <iform type="confirm" @submit="updateRule"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { getCompany,addCompany,editCompany,getAllTypes } from '@/api/company'
    import { assertEmpty,assertNumber,assertLength,assertEmail,assertPhone } from '@/utils/validate'
    import { getAllServices } from '@/api/service'
    import { addRule,getRule,editRule } from '@/api/company/rule'
    export default {
        name:"AdminUserForm",
        components:{
            iform,
            breadcrumb
        },
        data(){
            return {
                rule:{},
                options:[],
                add:true,
                breadcrumbs:[
                    {
                        name:"后台账户",
                        route:""
                    },
                    {
                        name:"角色管理",
                        route:{name:"rule"}
                    },
                    {
                        name:this.add?"新增":"编辑",
                        route:""
                    },
                ],
                services:[],
            }
        },
        methods:{
            updateRule(){
                if(!assertEmpty(this.rule.name)){
                    this.$message.error("请输入角色名")
                    return false
                }
                if(this.add){
                    addRule(this.rule).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"rule"})
                    })
                }else{
                    editRule(this.rule).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"rule"})
                    })
                }
                console.log(this.rule)
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.add=false
                getRule(this.$route.params.id).then(data=>{
                    this.rule=data
                })
            }
        }
    }
</script>