<template>
    <div class="container">
        <div class="row">
            <div :is="service"></div>
        </div>
    </div>
</template>
<script>
    import tijian from './tijian/package/index'
    import jiating from './jiating/doctor/index'
    import liliao from './liliao/index'
    import menzhen from './menzhen/index'
    import zhuyuan from './zhuyuan/index'
    export default {
        data() {
            return {
                service:null
            }
        },
        watch:{
            $route(route){
                if(route.name=='service'){
                    this.changeService()
                }
            }
        },
        methods:{
            changeService(){
                switch(this.$route.params.alias){
                    case 'tijian':
                        this.service = tijian;
                        break;
                    case 'jiating':
                        this.service= jiating;
                        break;
                    case 'liliao':
                        this.service= liliao;
                        break;
                    case 'menzhen':
                        this.service= menzhen;
                        break;
                    case 'zhuyuan':
                        this.service= zhuyuan;
                        break;
                }
            }
        },
        mounted(){
           this.changeService()
        }
    }
</script>
<style scoped>
   
</style>
