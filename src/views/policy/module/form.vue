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
                <iform type="upload" label="上传头像" required @change-file="uploadImg" :btnSize="11" :small="true" :url="module.img"></iform>
                <iform type="switch" label="状态" :value.sync="module.status"></iform>
                <iform type="confirm" @submit="updateModule"></iform>
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
        name:"PolicyModuleForm",
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
                uploadImage(file, "module").then(data=>{
                    this.$set(this.module, 'img', data.url)
                })
            },
            updateModule(){
                if(!assertEmpty(this.module.name)){
                    this.$message.error("请输入模块名称")
                    return false
                }
                
                if(!assertEmpty(this.module.img)){
                    this.$message.error("请上传模块图片")
                    return false
                }
                if(this.add){
                    addModule(this.module).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"policy_module"})
                    })
                }else{
                    editModule(this.module.id,this.module).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"policy_module"})
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