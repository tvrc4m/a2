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
                            <tbody v-if="data.length">
                                <tr v-for="(user,index) in data" :key="index">
                                    <td>{{user.id}}</td>
                                    <td>{{user.phone}}</td>
                                    <td>{{user.realname}}</td>
                                    <td>{{user.sex==1?"男":"女"}}</td>
                                    <td>{{user.company}}</td>
                                    <td>{{user.job}}</td>
                                    <td>
                                        <iswitch :value="user.status" @change="changeStatus(user,$event)"></iswitch>
                                    </td>
                                    <td>{{user.createtime | dateFormat}}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-xs waves-effect waves-light m-r-10" @click="editUser(user)">编辑</button>
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-light m-r-10" @click="doDel(user)">删除</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-else-if="!loading">
                                <tr>
                                    <td colspan="10" style="text-align: center;">没有数据</td>
                                </tr>
                            </tfoot>
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
    import { getOrders,delOrder } from '@/api/service/order'
    import { getServiceDetail } from '@/api/service'
    import { getAllCompanies } from '@/api/company'
    export default {
        name:"ServiceOrderList",
        components:{
            breadcrumb,
            iswitch,
            tableLoading
        },
        mixins:[page_mixin,loading_mixin],
        data(){
            return {
                data:[],
                service:{
                    alias:null,
                    name:null,
                    id:0
                },
                companies:[],
                breadcrumbs:[],
                actions:[],
                showModalDel: false,
                total:0,
            }
        },
        computed:{
            headers(){
                switch(this.service.alias){
                    case 'tijian':return [
                        {
                            label:"ID",
                            name:"id",
                            width:"60px",
                            sort:true
                        },
                        {
                            label:"预约用户",
                            name:"user_name",
                        },
                        {
                            label:"预约医院",
                            name:"company_id",
                        },
                        {
                            label:"预约套餐",
                            name:"package_name",
                        },
                        {
                            label:"预约时间",
                            name:"book_time",
                        },
                        {
                            label:"预约确认时间",
                            name:"confirm_time",
                        },
                        {
                            label:"状态",
                            name:"status",
                            filters:[{text:"预约中",value:1},{text:"预约成功",value:2},{text:"取消预约",value:3}],
                        }
                    ];
                    case 'jiating':return [
                        {
                            label:"ID",
                            name:"id",
                            width:"60px",
                            sort:true
                        },
                        {
                            label:"预约用户",
                            name:"user_name",
                        },
                        {
                            label:"预约医院",
                            name:"company_id",
                        },
                        {
                            label:"患者病状",
                            name:"remark",
                            tooltip:true
                        },
                        {
                            label:"服务地址",
                            name:"address",
                        },

                        {
                            label:"预约时间",
                            name:"book_time",
                        },
                        {
                            label:"确认时间",
                            name:"confirm_time",
                        },
                        {
                            label:"状态",
                            name:"status",
                            filters:[{text:"预约中",value:1},{text:"预约成功",value:2},{text:"取消预约",value:3}],
                        }
                    ];
                    case 'menzhen':return [
                        {
                            label:"ID",
                            name:"id",
                            width:"60px",
                            sort:true
                        },
                        {
                            label:"预约用户",
                            name:"user_name",
                        },
                        {
                            label:"预约医院",
                            name:"company_id",
                        },
                        {
                            label:"科室",
                            name:"office_name",
                        },
                        {
                            label:"患者病状",
                            name:"remark",
                            tooltip:true
                        },
                        {
                            label:"预约时间",
                            name:"book_time",
                        },
                        {
                            label:"确认时间",
                            name:"confirm_time",
                        },
                        {
                            label:"状态",
                            name:"status",
                            filters:[{text:"预约中",value:1},{text:"预约成功",value:2},{text:"取消预约",value:3}],
                        }
                    ];
                    case 'liliao':return [
                        {
                            label:"ID",
                            name:"id",
                            width:"60px",
                            sort:true
                        },
                        {
                            label:"预约用户",
                            name:"user_name",
                        },
                        {
                            label:"预约医院",
                            name:"company_id",
                        },
                        {
                            label:"科室",
                            name:"office_name",
                        },
                        {
                            label:"患者病状",
                            name:"remark",
                            tooltip:true
                        },
                        {
                            label:"预约时间",
                            name:"book_time",
                        },
                        {
                            label:"确认时间",
                            name:"confirm_time",
                        },
                        {
                            label:"状态",
                            name:"status",
                            filters:[{text:"预约中",value:1},{text:"预约成功",value:2},{text:"取消预约",value:3}],
                        }
                    ];
                    case 'zhuyuan':return [
                        {
                            label:"ID",
                            name:"id",
                            width:"60px",
                            sort:true
                        },
                        {
                            label:"预约用户",
                            name:"user_name",
                        },
                        {
                            label:"预约医院",
                            name:"company_id",
                        },
                        {
                            label:"患者病状",
                            name:"remark",
                            tooltip:true
                        },
                        {
                            label:"预约时间",
                            name:"book_time",
                        },
                        {
                            label:"确认时间",
                            name:"confirm_time",
                        },
                        {
                            label:"状态",
                            name:"status",
                            filters:[{text:"预约中",value:1},{text:"预约成功",value:2},{text:"取消预约",value:3}],
                        }
                    ];
                    default: return []
                }
            }
        },
        watch:{
            $route(route){
                if(route.name=="order"){
                    this.service.alias=route.params.name
                    this.loading=true
                    this.changePage(1)
                    this.getService()
                }
            }
        },
        methods:{
            editUser(user){
                this.$router.push({name:"user_edit",params:{id:user.id}})
            },
            doDel(user){
                this.$confirm('是否确认删除?').then(()=>{
                    delOrder(user.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=user.id)
                    })
                })
            },
            changePage(page){
                this.params.page=page
                getOrders(this.service.alias).then(data=>{
                    this.loading=false
                    this.data=data.data
                    this.total=data.total
                    console.log(data)
                })
            },
            getService(){
                getServiceDetail(this.service.alias).then(data=>{
                    console.log(data.service)
                    this.service.name = data.service.name
                    this.service.id = data.service.id
                    this.breadcrumbs=[
                        {
                            name:"订单管理",
                            route:""
                        },
                        {
                            name: this.service.name,
                            route:""
                        }
                    ]
                })
            }
        },
        mounted(){
            this.params.stype=1
            if(this.$route.params.name){
                this.service.alias=this.$route.params.name
            }else{
                this.$message.error("该服务不存在")
                this.$router.back();
            }
            this.changePage(1)
            getAllCompanies().then(data=>{
                this.companies=data.data
            })
            this.getService()
        }
    }
</script>