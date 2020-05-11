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
                <iform type="text" label="科室名称" placeholder="请选择科室名称" required :value.sync="office.name"></iform>
                <iform type="text" label="排序" placeholder="请输入排序值" :value.sync="office.sort"></iform>
                <iform type="confirm" @submit="updateOffice"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { assertEmpty,assertNumber,assertLength,assertEmail,assertPhone } from '@/utils/validate'
    import { getCompany } from '@/api/company'
    import { getOffice,addOffice,editOffice } from '@/api/company/office'
    export default {
        name:"CompanyOfficeForm",
        components:{
            iform,
            breadcrumb
        },
        data(){
            return {
                office:{},
                add:true,
                breadcrumbs:[
                    {
                        name:"科室管理",
                        route:""
                    },
                    {
                        name:this.add?"新增":"编辑",
                    }
                ],
                rules:[],
            }
        },
        methods:{
            updateOffice(){
                if(!assertEmpty(this.office.name)){
                    this.$message.error("请输入科室名称")
                    return false
                }
                this.office.company_id = this.company_id
                if(this.add){
                    addOffice(this.office).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"office"})
                    })
                }else{
                    editOffice(this.office.id, this.office).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"office"})
                    })
                }
                console.log(this.office)
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.add=false
                getOffice(this.$route.params.id).then(data=>{
                    this.office=data
                })
            }
        }
    }
</script>