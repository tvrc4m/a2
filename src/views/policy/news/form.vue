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
                <iform type="select" label="模块" placeholder="请选择模块" :options="modules" required :value.sync="news.module_id"></iform>
                <iform type="text" label="标题" placeholder="请输入标题" :value.sync="news.title" required></iform>
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
    import { addNews,getNews,editNews,listModule } from '@/api/policy'
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
                modules:[],
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
                if(!assertEmpty(this.news.content)){
                    this.$message.error('请输入内容')
                    return false
                }
                if(this.add){
                    addNews(this.news).then(()=>{
                        this.$message.success("添加成功")
                        this.$router.push({name:"policy_news"})
                    })
                }else{
                    editNews(this.news.id,this.news).then(()=>{
                        this.$message.success("编辑成功")
                        this.$router.push({name:"policy_news"})
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
            listModule({limit:100}).then(data=>{
                this.modules=data.data.map(item=>{
                    return {
                        name:item.name,
                        value:item.id
                    }
                })
            })
            this.breadcrumbs=[
                {
                    name:"政策速递",
                    route:""
                },
                {
                    name:"新闻管理",
                    route:{name:'policy_news'}
                },
                {
                    name:this.add?"新增":"编辑",
                }
            ]
        }
    }
</script>