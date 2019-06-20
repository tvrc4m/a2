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
                <iform type="text" label="模块名" placeholder="请输入模块名" :value.sync="module.name" required></iform>
                <iform type="text" label="排序" placeholder="请输入排序" :value.sync="module.sort"></iform>
                <iform type="upload" label="上传头像" @change-file="uploadImg" :btnSize="11" :small="true" :url="module.img"></iform>
                <iform type="switch" label="状态" :value.sync="module.status"></iform>
                <iform type="confirm" @submit="updateUser"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { addModule,getModule,editModule } from '@/api/policy'
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
                module:{},
                options:[],
                add:true,
                breadcrumbs:[],
            }
        },
        methods:{
            uploadImg(file){
                uploadImage(file).then(data=>{
                    this.$set(this.module, 'img', data.code)
                })
            },
            updateUser(){
                if(!assertEmpty(this.module.realname)){
                    this.$message.error("请选择姓名")
                    return false
                }
                
                if(!assertEmpty(this.module.job)){
                    this.$message.error("请输入职务")
                    return false
                }
                if(!assertEmpty(this.module.phone)){
                    this.$message.error("请输入手机号")
                    return false
                }
                if(!assertPhone(this.module.phone)){
                    this.$message.error("手机号不正确")
                    return false
                }
                this.module.stype = 2
                if(this.add){
                    addModule(this.module).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"leader"})
                    })
                }else{
                    editModule(this.module.id,this.module).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"leader"})
                    })
                }
                console.log(this.module)
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.add=false
                getModule(this.$route.params.id).then(data=>{
                    this.module=data
                })
            }
            this.breadcrumbs=[
                {
                    name:"政策速递",
                    route:""
                },
                {
                    name:"模块管理",
                    route:{name:"policy_module"}
                },
                {
                    name:this.add?"新增":"编辑",
                }
            ]
        }
    }
</script>