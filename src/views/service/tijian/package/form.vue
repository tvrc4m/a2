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
                <iform type="text" label="套餐名称" placeholder="请输入套餐名称" :value.sync="pack.name" required></iform>
                <iform type="textarea" label="内容" placeholder="请输入内容" :value.sync="pack.content" required></iform>
                <iform type="confirm" @submit="updatePackage"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { getPackage,addPackage,editPackage } from '@/api/service/package'
    import { getOffices } from '@/api/company/office'
    import { getCompany } from '@/api/company'
    import { assertEmpty,assertNumber,assertLength,assertEmail,assertPhone } from '@/utils/validate'
    export default {
        name:"AdminUserForm",
        components:{
            iform,
            breadcrumb
        },
        data(){
            return {
                pack:{},
                company:{},
                options:[],
                add:true,
                service:{
                    alias:"tijian"
                },
                breadcrumbs:[],
            }
        },
        methods:{
            updatePackage(){
                if(!assertEmpty(this.pack.name)){
                    this.$message.error("请输入套餐名称")
                    return false
                }
                
                if(!assertEmpty(this.pack.content)){
                    this.$message.error("请输入套餐内容")
                    return false
                }
                this.pack.company_id=this.company_id
                if(this.add){
                    addPackage(this.pack).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"service_setting",params:{cid:this.company_id,alias:this.service.alias}})
                    })
                }else{
                    editPackage(this.pack.id,this.pack).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"service_setting",params:{cid:this.company_id,alias:this.service.alias}})
                    })
                }
                console.log(this.pack)
            }
        },
        mounted(){
            this.company_id=this.$route.params.cid
            if(this.$route.params.id){
                this.add=false
                getPackage(this.$route.params.id).then(data=>{
                    this.pack=data
                })
            }
            getCompany(this.company_id).then(data=>{
                this.company=data
                this.breadcrumbs.push({
                    name: this.company.name,
                    route:{name:"company"}
                })
                this.breadcrumbs.push({
                    name: "体检套餐管理",
                    route:{name:"service_setting",params:{cid:this.company_id,alias:this.service.alias}}
                })
                this.breadcrumbs.push({
                    name: this.add?"新增":"编辑"
                })
            })
        }
    }
</script>