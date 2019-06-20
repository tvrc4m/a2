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
                <iform type="text" label="姓名" placeholder="请输入姓名" :value.sync="user.realname" required></iform>
                <iform type="text" label="手机号" placeholder="请输入手机号" :value.sync="user.phone" required></iform>
                <iform type="text" label="单位" placeholder="请输入单位" :value.sync="user.company" required></iform>
                <iform type="text" label="职务" placeholder="请输入职务" required :value.sync="user.job"></iform>
                <iform type="upload" label="上传头像" @change-file="uploadImg" :btnSize="11" :small="true" :url="image"></iform>
                <iform type="switch" label="状态" :value.sync="user.status"></iform>
                <iform type="confirm" @submit="updateUser"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { addUser,getUser,editUser } from '@/api/user'
    import { assertEmpty,assertNumber,assertLength,assertEmail,assertPhone } from '@/utils/validate'
    import { uploadImage,getImageUrl } from '@/api/upload'
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
                add:true,
                breadcrumbs:[],
                image:null,
            }
        },
        methods:{
            uploadImg(file){
                uploadImage(file).then(data=>{
                    this.$set(this.user, 'img', data.code)
                })
            },
            updateUser(){
                if(!assertEmpty(this.user.realname)){
                    this.$message.error("请选择姓名")
                    return false
                }
                
                if(!assertEmpty(this.user.job)){
                    this.$message.error("请输入职务")
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
                this.user.stype = 2
                if(this.add){
                    addAdminUser(this.user).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"leader"})
                    })
                }else{
                    updateAdminUser(this.user.id,this.user).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"leader"})
                    })
                }
                console.log(this.user)
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.add=false
                getUser(this.$route.params.id).then(data=>{
                    this.user=data
                })
            }
            this.breadcrumbs=[
                {
                    name:"用户管理",
                    route:""
                },
                {
                    name:"用户管理",
                    route:{name:"user"}
                },
                {
                    name:this.add?"新增":"编辑",
                }
            ]
        }
    }
</script>