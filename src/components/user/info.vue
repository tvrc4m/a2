<template>
    <div class="contact-card">
        <a class="pull-left" href="#">
            <img class="img-circle" v-if="user.image" :src="user.image" alt="" />
        </a>
        <div class="member-info" style="padding-bottom: 0;">
            <h4 class="header-title" style="text-transform:none;"><b>{{user.realname}}</b></h4>
            <div class="text-dark" style="margin-bottom: 2px;"><small>职工号: {{user.username}}</small></div>
            <div class="text-dark"><small>手机号码: {{user.tel}}</small></div>
        </div>
    </div>
</template>

<script>
    import { getImageUrl } from '@/api/upload'
    import defaultAvatar from "@/assets/default.jpg"
    export default {
        name:"UserInfo",
        props:{
            user:{
                type:Object,
                required:true
            }
        },
        data(){
            return {
                defaultAvatar
            }
        },
        mounted(){
            if(this.user.image){
            }else if(this.user.img && this.user.img.length){
                this.$set(this.user, "image", defaultAvatar)
                getImageUrl(this.user.img).then(data=>{
                    this.$set(this.user, "image", data)
                })
            }
        }
    }
</script>