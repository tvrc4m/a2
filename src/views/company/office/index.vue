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
                                <tr v-for="(office,index) in data" :key="index">
                                    <td>{{office.id}}</td>
                                    <td>{{office.name}}</td>
                                    <td>{{office.sort}}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-xs waves-effect waves-light m-r-10" @click="editOffice(office)">编辑</button>
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-light m-r-10" @click="doDel(office)">删除</button>
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
    import { getOffices,delOffice } from '@/api/company/office'
    export default {
        name:"CompanyOffice",
        components:{
            breadcrumb,
            iswitch,
            tableLoading
        },
        mixins:[page_mixin,loading_mixin],
        data(){
            return {
                company_id:null,
                company:{},
                headers:[
                    {
                        label:"ID",
                        name:"id",
                        width:"60px",
                        sort:true
                    },
                    {
                        label:"科室",
                        name:"name",
                    },
                    {
                        label:"排序",
                        name:"sort",
                        sort: true
                    },
                    {
                        label:"操作",
                        name:"opt",
                    }
                ],
                data:[],
                breadcrumbs:[
                    {
                        name:"医院/政府",
                        route:""
                    }
                ],
                actions:[
                    {
                        name:"新增",
                        icon:"fa-plus",
                        route:{
                            name:'company_office_add'
                        }
                    }
                ],
                showModalDel: false,
                total:0,
            }
        },
        methods:{
            editOffice(office){
                this.$router.push({name:"company_office_edit",params:{cid:this.company_id,id:office.id}})
            },
            doDel(office){
                this.$confirm('是否确认删除?').then(()=>{
                    delOffice(this.company_id, office.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=office.id)
                    })
                })
            },
            changePage(page){
                getOffices(this.company_id, page).then(data=>{
                    console.log("data:",data)
                    this.loading=false
                    this.data=data.data
                    this.total=data.total
                })
            }
        },
        mounted(){
            this.company_id=this.$route.params.cid
            this.changePage(1)
            getCompany(this.company_id).then(data=>{
                this.company=data
                this.breadcrumbs.push({
                    name: this.company.name,
                    route:{name:"company"}
                })
                this.breadcrumbs.push({
                    name: "科室管理",
                    route:{name:"company_office",params:{cid:this.company_id}}
                })
            })
        }
    }
</script>