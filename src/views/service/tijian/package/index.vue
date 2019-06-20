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
                                <tr v-for="(pack,index) in data" :key="index">
                                    <td>{{pack.id}}</td>
                                    <td>{{pack.name}}</td>
                                    <td>{{pack.content}}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-xs waves-effect waves-light m-r-10" @click="editPackage(pack)">编辑</button>
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-light m-r-10" @click="doDel(pack)">删除</button>
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
    import { getPackages,delPackage } from '@/api/service/package'
    import { getCompany } from '@/api/company'
    export default {
        name:"ServiceTijianPackage",
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
                        label:"套餐",
                        name:"name",
                    },
                    {
                        label:"内容说明",
                        name:"content",
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
                    alias:"tijian",
                    name:"健康体验"
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
                            name:'tijian_package_add',
                            params:{cid:this.company_id, alias:this.service.alias}
                        }
                    }
                ]
            }
        },
        methods:{
            editPackage(pack){
                this.$router.push({name:"tijian_package_edit",params:{id:pack.id,cid:this.company_id,alias:this.service.alis}})
            },
            doDel(pack){
                this.$confirm('是否确认删除?').then(()=>{
                    delPackage(pack.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=pack.id)
                    })
                })
            },
            changePage(page){
                this.params.page=page
                getPackages(this.company_id).then(data=>{
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
                    name: "体检套餐管理",
                })
            })
        }
    }
</script>