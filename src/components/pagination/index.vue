<template>
    <div style="text-align: right;">
        <ul class="pagination pagination-split" v-if="total>0">
            <li v-if="max>1" :class="{disabled:current==1}">
                <a href="javascript:void(0);" @click="pre"><i class="fa fa-angle-left"></i></a>
            </li>
            <li v-for="p in pages" :class="{active:current==p}">
                <a href="javascript:void(0);" @click="changePage(p)">{{p}}</a>
            </li>
            <li v-if="max>1" :class="{disabled:current==max}">
                <a href="javascript:void(0);" @click="next"><i class="fa fa-angle-right"></i></a>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:"Pagination",
        props:{
            total:{
                type:Number,
                required:true,
            },
            size:{
                type:Number,
                required:true
            },
            page:{
                type:Number,
                required:true,
                default:1
            }
        },
        data(){
            return {
                current:0
            }
        },
        computed:{
            pages(){
                let pages=[]
                for(let i=1;i<=this.max;i++){
                    pages.push(i)
                }
                return pages
            },
            max(){
                return this.total<=this.size?1:Math.ceil(this.total/this.size)
            }
        },
        watch:{
            current(page){
                console.log(this.max,page)
                this.$emit("change",page)
            }
        },
        methods:{
            changePage(p){
                this.current=p
            },
            pre(){
                if(this.current>1)
                    this.current-=1
            },
            next(){
                if(this.current<this.max)
                    this.current+=1
            }
        },
        mounted(){
            this.current=this.page
        }
    }
</script>