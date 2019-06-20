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
                <iform type="select" label="角色" placeholder="请选择角色" :options="options" required :value.sync="user.rule_id"></iform>
                <iform type="text" label="用户名" placeholder="请输入用户名" :value.sync="user.username" required></iform>
                <iform type="text" label="昵称" placeholder="请输入昵称" :value.sync="user.nickname" required></iform>
                <iform type="text" label="密码" placeholder="请输入密码" :value.sync="user.password" :required="this.add?true:false"></iform>
                <iform type="confirm" @submit="updateUser"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { addAdminUser,updateAdminUser,getAdminUserInfo } from '@/api/admin'
    import { getAllRules } from '@/api/rule'
    import { assertEmpty,assertNumber,assertLength,assertEmail,assertPhone } from '@/utils/validate'
    export default {
        name:"AdminUserForm",
        components:{
            iform,
            breadcrumb
        },
        data(){
            return {
                user:{},
                options:[],
                breadcrumbs:[],
                add:true,
                image:null
            }
        },
        methods:{
            updateUser(){
                if(!assertEmpty(this.user.rule_id)){
                    this.$message.error('请选择所属角色')
                    return false
                }
                if(!assertEmpty(this.user.username)){
                    this.$message.error("请输入用户名")
                    return false
                }
                if(!assertEmpty(this.user.nickname)){
                    this.$message.error("请输入昵称")
                    return false
                }
                console.log(assertEmpty(this.user.password));
                if(this.add){
                    if(!assertEmpty(this.user.password)){
                        this.$message.error("请输入登录密码")
                        return false
                    }
                    if(!assertLength(this.user.password, 6, 15)){
                        this.$message.error("密码长度为6-15位")
                        return false
                    }
                }else if(!assertEmpty(this.user.password)){
                    if(!assertLength(this.user.password, 6, 15)){
                        this.$message.error("密码长度为6-15位")
                        return false
                    }
                }
                if(this.add){
                    this.user.stype=1
                    addAdminUser(this.user).then(data=>{
                        console.log("addAdminUser",data)
                        this.$message.success("添加成功")
                        this.$router.push({name:"admin_user"})
                    })
                }else{
                    updateAdminUser(this.user.id, this.user).then(data=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"admin_user"})
                    })
                }
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.add=false
                getAdminUserInfo(this.$route.params.id).then(data=>{
                    this.user=data
                    // this.$set(this.user, "password", null)
                    console.log("getAdminUserInfo",data)
                })
            }
            getAllRules().then(data=>{
                this.options=data.map(item=>{
                    return {
                        name:item.name,
                        value:item.id
                    }
                })
                console.log(this.options)
            })

            this.breadcrumbs=[
                {
                    name:"后台账户",
                    route:""
                },
                {
                    name:"用户管理",
                    route:{name:"admin_user"}
                },
                {
                    name:this.add?"新增":"编辑",
                }
            ]
        }
    }
</script>