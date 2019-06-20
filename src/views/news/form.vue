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
                <iform type="text" label="标题" placeholder="请输入标题" :value.sync="news.title" required></iform>
                <iform type="text" label="来源" placeholder="请输入来源" :value.sync="news.source"></iform>
                <iform type="upload" label="封面图片" @change-file="uploadImg" :btnSize="11" :small="true" required :url="news.thumb"></iform>
                <iform type="text" label="内容" placeholder="请输入内容" :value.sync="news.content" required></iform>
                <iform type="text" label="排序值" placeholder="从大到小排序" :value.sync="news.sort"></iform>
                <iform type="switch" label="状态" :value.sync="news.status"></iform>
                <iform type="confirm" @submit="updateNews"></iform>
            </form>
        </div>
    </div>
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import { addNews,getNews,editNews } from '@/api/news'
    import { uploadImage,getImageUrl } from '@/api/upload'
    import { assertEmpty,assertNumber,assertLength,assertEmail,assertPhone } from '@/utils/validate'
    export default {
        name:"NewsForm",
        components:{
            iform,
            breadcrumb
        },
        data(){
            return {
                news:{},
                breadcrumbs:[],
                add:true
            }
        },
        watch:{
            user(val){
                console.log(val)
            }
        },
        methods:{
            uploadImg(file){
                uploadImage(file).then(data=>{
                    this.$set(this.user, 'img', data.code)
                })
            },
            updateNews(){
                if(!assertEmpty(this.news.title)){
                    this.$message.error('请输入标题')
                    return false
                }
                if(!assertEmpty(this.news.thumb)){
                    this.$message.error('请上传封面图片')
                    return false
                }
                if(!assertEmpty(this.news.content)){
                    this.$message.error('请输入新闻内容')
                    return false
                }
                if(this.add){
                    addNews(this.news).then(()=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"news"})
                    })
                }else{
                    editNews(this.news.id,this.news).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"news"})
                    })
                }
            }
        },
        mounted(){
            if(this.$route.params.id){
                this.add=false
                getNews(this.$route.params.id).then(data=>{
                    this.news=data
                })
            }else{
                
            }
            this.breadcrumbs=[
                {
                    name:"新闻管理",
                    route:""
                },
                {
                    name:"新闻列表",
                    route:{name:"news"}
                },
                {
                    name:this.add?"新增":"编辑",
                }
            ]
        }
    }
</script>