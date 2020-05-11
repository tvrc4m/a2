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
                <iform type="text" label="医生姓名" placeholder="请输入医生姓名" :value.sync="doctor.name" required></iform>
                <iform type="text" label="电话" placeholder="请输入电话" :value.sync="doctor.tel" required></iform>
                <iform type="select" label="科室" placeholder="请选择所属科室" :options="offices" :value.sync="doctor.office_id" required></iform>
                <iform type="confirm" @submit="updateDoctor"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { getDoctor,addDoctor,editDoctor } from '@/api/service/doctor'
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
                doctor:{},
                company:{},
                offices:[],
                add:true,
                service:{
                    alias:"jiating",
                    name:"家庭医生"
                },
                breadcrumbs:[],
            }
        },
        methods:{
            updateDoctor(){
                if(!assertEmpty(this.doctor.name)){
                    this.$message.error("请输入医生姓名")
                    return false
                }
                
                if(!assertEmpty(this.doctor.tel)){
                    this.$message.error("请输入联系电话")
                    return false
                }
                this.doctor.company_id=this.company_id
                if(this.add){
                    addDoctor(this.doctor).then(data=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"service",params:{cid:this.company_id,alias:this.service.alias}})
                    })
                }else{
                    editDoctor(this.doctor.id,this.doctor).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"service",params:{cid:this.company_id,alias:this.service.alias}})
                    })
                }
                console.log(this.doctor)
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.add=false
                getDoctor(this.$route.params.id).then(data=>{
                    this.doctor=data
                })
            }
            getOffices().then(data=>{
                this.offices=data.data.map(item=>{
                    return {
                        name:item.name,
                        value:item.id
                    }
                })
            })
        }
    }
</script>