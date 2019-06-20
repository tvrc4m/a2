<template>
     <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <breadcrumb :paths="breadcrumbs" :actions="actions"></breadcrumb>
                <p class="text-muted page-title-alt"></p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card-box">
                    <div class="table-responsive">
                        <table class="table m-0 table-striped table-bordered dataTable no-footer">
                            <thead>
                                <tr>
                                    <th v-for="(header,index) in headers" :key="index">{{header.label}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(doctor,index) in data" :key="index">
                                    <td>{{doctor.id}}</td>
                                    <td>{{doctor.name}}</td>
                                    <td>{{doctor.tel}}</td>
                                    <td>{{doctor.office_id}}</td>
                                    <td></td>
                                    <td>{{doctor.remark}}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-xs waves-effect waves-light m-r-10" @click="editDoctor(doctor)">编辑</button>
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-light m-r-10" @click="doDel(doctor)">删除</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table-loading v-if="loading"></table-loading>
                    </div>
                    <pagination :total="total" :size="params.limit" :page="params.page" @change="changePage"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import breadcrumb from '@/components/breadcrumb/index'
    import iswitch from '@/components/switch/index'
    import tableLoading from '@/components/loading/table'
    import loading_mixin from '@/mixins/loading'
    import page_mixin from '@/mixins/page'
    import { getCompany } from '@/api/company'
    import { getDoctors,delDoctor } from '@/api/service/doctor'
    export default {
        name:"ServiceTijianDoctor",
        components:{
            breadcrumb,
            iswitch,
            tableLoading
        },
        mixins:[page_mixin,loading_mixin],
        data(){
            return {
                headers:[
                    {
                        label:"ID",
                        name:"id",
                    },
                    {
                        label:"姓名",
                        name:"name",
                    },
                    {
                        label:"联系电话",
                        name:"tel",
                    },
                    {
                        label:"所属科室",
                        name:"office_id",
                    },
                    {
                        label:"预约时间",
                        name:"time",
                    },
                    {
                        label:"备注",
                        name:"remark",
                    },
                    {
                        label:"操作",
                        name:"opt",
                    }
                ],
                data:[],
                company_id:null,
                breadcrumbs:[
                    
                ],
                total:0,
                service:{
                    alias:"jiating",
                    name:"家庭医生"
                }
            }
        },
        computed:{
            actions(){
                return [
                    {
                        name:"新增",
                        icon:"fa-plus",
                        route:{
                            name:'jiating_doctor_add',
                            params:{cid:this.company_id, alias:this.service.alias}
                        }
                    }
                ]
            }
        },
        methods:{
            editDoctor(doctor){
                this.$router.push({name:"jiating_doctor_edit",params:{id:doctor.id,cid:this.company_id,alias:this.service.alis}})
            },
            doDel(doctor){
                this.$confirm('是否确认删除?').then(()=>{
                    delDoctor(doctor.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=doctor.id)
                    })
                })
            },
            changePage(page){
                this.params.page=page
                getDoctors(this.company_id).then(data=>{
                    this.loading=false
                    this.data=data.data
                    this.total=data.total
                    console.log(data)
                })
            }
        },
        mounted(){
            this.company_id = this.$route.params.cid
            this.changePage(1)
            getCompany(this.company_id).then(data=>{
                this.company=data
                this.breadcrumbs.push({
                    name: this.company.name,
                    route:{name:"company"}
                })
                this.breadcrumbs.push({
                    name: this.service.name,
                })
                this.breadcrumbs.push({
                    name: "家庭医生管理",
                })
            })
        }
    }
</script>