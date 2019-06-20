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
                <iform type="select" label="角色" placeholder="请选择角色" required :options="rules" :value.sync="user.rule_id"></iform>
                <iform type="text" label="昵称" placeholder="请输入昵称" :value.sync="user.nickname" required></iform>
                <iform type="text" label="手机号" placeholder="请输入手机号" required :value.sync="user.phone"></iform>
                <iform type="text" label="密码" placeholder="请输入密码" required :value.sync="user.password"></iform>
                <iform type="confirm" @submit="updateUser"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { assertEmpty,assertNumber,assertLength,assertEmail,assertPhone } from '@/utils/validate'
    import { getCompanyUser,editCompanyUser,addCompanyUser } from '@/api/company/user'
    import { getCompany } from '@/api/company'
    import { getAllRules } from '@/api/company/rule'
    export default {
        name:"AdminUserForm",
        components:{
            iform,
            breadcrumb
        },
        data(){
            return {
                user:{},
                company:{},
                company_id:null,
                add:true,
                breadcrumbs:[],
                rules:[],
            }
        },
        methods:{
            updateUser(){
                console.log(333)
                console.log(this.user)
                if(!assertEmpty(this.user.rule_id)){
                    this.$message.error("请选择角色")
                    return false
                }
                if(!assertEmpty(this.user.nickname)){
                    this.$message.error("请输入昵称")
                    return false
                }
                if(!assertEmpty(this.user.phone)){
                    this.$message.error("请输入手机号")
                    return false
                }
                if(!assertPhone(this.user.phone)){
                    this.$message.error("手机号不正确")
                    return false
                }
                if(this.add){
                    addCompanyUser(this.company_id, this.user).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"company_user"})
                    })
                }else{
                    editCompanyUser(this.company_id, this.user.id, this.user).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"company_user"})
                    })
                }
                console.log(this.user)
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.add=false
                getCompanyUser(this.$route.params.cid,this.$route.params.id).then(data=>{
                    this.user=data
                })
            }
            this.company_id=this.$route.params.cid
            getAllRules(this.$route.params.cid).then(data=>{
                this.rules=data.map(item=>{
                    return {
                        name:item.name,
                        value:item.id,
                    }
                })
            })
            this.breadcrumbs=[
                {
                    name:"医院/政府",
                    route:""
                },
                {
                    name:"医院列表",
                    route:{name:"company"}
                },
                {
                    name:"用户管理",
                    route:{name:"company_user",params:{cid:this.$route.params.cid}}
                },
                {
                    name:this.add?"新增":"编辑",
                }
            ]
        }
    }
</script>