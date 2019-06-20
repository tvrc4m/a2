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
                <iform type="text" label="企业名称" placeholder="请输入企业名称" :value.sync="company.name" required></iform>
                <iform type="upload" label="上传头像" @change-file="uploadImg" :btnSize="11" :small="true" :url="company.logo"></iform>
                <iform type="text" label="企业地址" placeholder="请输入企业地址" :value.sync="company.address" required></iform>
                <iform type="text" label="联系人" placeholder="请输入联系人" :value.sync="company.contact" required></iform>
                <iform type="text" label="联系人电话" placeholder="请输入联系人电话" required :value.sync="company.tel"></iform>
                <iform type="selectmulti" label="开通服务" placeholder="请选择要开通的企业服务" required :options="services" :value.sync="company.services"></iform>
                <iform type="textarea" label="介绍" placeholder="请输入介绍" required :value.sync="company.content"></iform>
                <iform type="text" label="排序" placeholder="请输入排序值" :value.sync="company.sort"></iform>
                <iform type="confirm" @submit="updateCompany"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { getCompany,addCompany,editCompany,getAllTypes } from '@/api/company'
    import { assertEmpty,assertNumber,assertLength,assertEmail,assertPhone } from '@/utils/validate'
    import { uploadImage,getImageUrl } from '@/api/upload'
    import { getAllServices } from '@/api/service'
    export default {
        name:"AdminUserForm",
        components:{
            iform,
            breadcrumb
        },
        data(){
            return {
                company:{},
                options:[],
                add:true,
                breadcrumbs:[],
                services:[],
            }
        },
        methods:{
            uploadImg(file){
                uploadImage(file, "company").then(data=>{
                    this.$set(this.company, 'logo', data.url)
                })
            },
            updateCompany(){
                if(!assertEmpty(this.company.name)){
                    this.$message.error("请输入企业名称")
                    return false
                }
                
                if(!assertEmpty(this.company.logo)){
                    this.$message.error("请上传企业logo")
                    return false
                }
                if(!assertEmpty(this.company.address)){
                    this.$message.error("请输入企业地址")
                    return false
                }
                if(!assertEmpty(this.company.contact)){
                    this.$message.error("请输入联系人姓名")
                    return false
                }
                if(!assertEmpty(this.company.tel)){
                    this.$message.error("请输入联系人电话")
                    return false
                }
                if(!assertEmpty(this.company.content)){
                    this.$message.error("请输入企业介绍")
                    return false
                }
                if(this.company.services.length==0){
                    this.$message.error("请选择要开通的企业服务")
                    return false
                }
                if(this.add){
                    addCompany(this.company).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"company"})
                    })
                }else{
                    editCompany(this.company.id,this.company).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"company"})
                    })
                }
                console.log(this.company)
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.add=false
                getCompany(this.$route.params.id).then(data=>{
                    this.company=data
                })
            }
            getAllServices().then(data=>{
                this.services=data.map(item=>{
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
                    name:this.add?"新增":"编辑",
                }
            ]
        }
    }
</script>