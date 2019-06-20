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
                company:{},
                rule:{},
                options:[],
                add:true,
                breadcrumbs:[
                    {
                        name:"医院/政府",
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
                    addRule(this.company_id, this.rule).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"company_rule",params:{cid:this.company_id}})
                    })
                }else{
                    editRule(this.company_id, this.rule).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"company_rule",params:{cid:this.company_id}})
                    })
                }
                console.log(this.rule)
            }
        },
        mounted(){
            this.company_id = this.$route.params.cid
            if(this.$route.params.id){
                this.add=false
                getRule(this.company_id,this.$route.params.id).then(data=>{
                    this.rule=data
                })
            }
            getCompany(this.company_id).then(data=>{
                this.company=data
                this.breadcrumbs.push({
                    name: this.company.name,
                    route:{name:"company"}
                })
                this.breadcrumbs.push({
                    name: "权限管理",
                    route:{name:"company_rule",params:{id:this.company_id}}
                })
                this.breadcrumbs.push({
                    name: this.add?"新增":"编辑",
                })
            })
        }
    }
</script>