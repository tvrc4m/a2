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
                <iform type="text" label="角色名称" placeholder="请输入角色名称" :value.sync="rule.name" required></iform>
                <iform type="text" label="备注说明" placeholder="请输入备注说明" :value.sync="rule.remark"></iform>
                <iform type="confirm" :confirm="btn" @submit="updateGroup"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { getRule,addRule,editRule } from '@/api/rule'
    import { assertEmpty,assertNumber,assertLength,assertEmail,assertPhone } from '@/utils/validate'
    export default {
        name:"AdminRuleForm",
        components:{
            iform,
            breadcrumb
        },
        data(){
            return {
                rule:{
                    id:null,
                    name:null,
                    remark:null,
                },
                breadcrumbs:[],
                add:true
            }
        },
        computed:{
            btn(){
                if(this.add){
                    return "添加"
                }else{
                    return "编辑"
                }
            }
        },
        methods:{
            updateGroup(){
                if(!assertEmpty(this.rule.name)){
                    this.$message.error('请输入用户组名')
                    return false
                }
                if(this.add){
                    addRule(this.rule).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"admin_rule"})
                    })
                }else{
                    editRule(this.rule.id, this.rule).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"admin_rule"})
                    })
                }
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.add=false
                getRule(this.$route.params.id).then(data=>{
                    this.rule=data
                })
            }
            this.breadcrumbs=[
                {
                    name:"后台账户",
                    route:""
                },
                {
                    name:"角色管理",
                    route:{name:"admin_rule"}
                },
                {
                    name:this.add?"新增":"编辑",
                }
            ]
        }
    }
</script>