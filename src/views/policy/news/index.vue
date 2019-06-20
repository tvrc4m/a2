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
                        <table class="table table-striped table-bordered dataTable no-footer">
                            <thead>
                                <tr>
                                    <th v-for="(header,index) in headers" :key="index">{{header.label}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(news,index) in data" :key="index">
                                    <td>{{news.id}}</td>
                                    <td></td>
                                    <td>{{news.title}}</td>
                                    <td>{{news.sort}}</td>
                                    <td>
                                        <iswitch :value="news.status" @change="changeStatus(news,$event)"></iswitch>
                                    </td>
                                    <td>{{news.createtime | dateFormat}}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-xs waves-effect waves-light m-r-10" @click="editNews(news)">编辑</button>
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-light m-r-10" @click="doDel(news)">删除</button>
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
    import page_mixin from '@/mixins/page'
    import tableLoading from '@/components/loading/table'
    import loading_mixin from '@/mixins/loading'
    import { listNews,delNews,updateNewsStatus } from '@/api/policy'
    export default {
        name:"NewsList",
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
                        width:"60px",
                        sort:true,
                    },
                    {
                        label:"模块",
                        name:"module_id",
                        filters:[],
                    },
                    {
                        label:"标题",
                        name:"title",
                    },
                    {
                        label:"排序",
                        name:"sort",
                        sort:true,
                    },
                    {
                        label:"状态",
                        name:"status",
                        filters:[{text:"上线中",value:1},{text:"下线中",value:0}],
                    },
                    {
                        label:"创建时间",
                        name:"createtime",
                    },
                    {
                        label:"操作"
                    }
                ],
                data:[],
                breadcrumbs:[
                    {
                        name:"政策速递",
                        route:""
                    },
                    {
                        name:"新闻列表",
                    }
                ],
                actions:[
                    {
                        name:"新增",
                        icon:"fa-plus",
                        route:{
                            name:'policy_news_add'
                        }
                    }
                ],
                showModalDel: false,
                total:0,
            }
        },
        methods:{
            editNews(news){
                this.$router.push({name:"policy_news_edit",params:{id:news.id}})
            },
            doDel(news){
                this.$confirm('是否确认删除?').then(()=>{
                    delNews(news.id).then(()=>{
                        this.data=this.data.filter(item=>item.id!=news.id)
                    })
                })
            },
            changeStatus(news,status){
                if(status==1){
                    updateNewsStatus(news.id, 1)
                }else{
                    updateNewsStatus(news.id, 0)
                }
            },
            changePage(page){
                this.params.page=page
                listNews(this.params).then(data=>{
                    console.log(data)
                    this.loading=false
                    this.data=data.data
                    this.total=data.total
                })
            }
        },
        mounted(){
            this.changePage(1)
        }
    }
</script>