<template>
    <div class="container">
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="tab-content br-n pn">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import calendar from '@/components/calendar/index'
    import moment from 'moment';
    export default {
        components: {
        },
        data() {
            return {
                initialDate: new Date(),
                events:[
                    {
                        date:moment(new Date()),
                        displayText:""
                    }
                ],
                actions:[
                    {
                        name:"导出Excel",
                        route:"print",
                        color:"primary",
                    },
                    {
                        name:"打印",
                        route:"print",
                        color:"success",
                    },
                ],
                tab:null
            }
        },
        computed:{
            activeDate(){
                return moment(this.initialDate);
            }
        },
        watch:{
            tab(val){
                console.log(val)
            }
        },
        mounted(){
            if(this.$route.query.tab){
                this.tab=this.$route.query.tab
            }else{
                this.tab='meeting'
            }
            if(this.$route.query.start){
                this.initialDate=new Date(this.$route.query.start)
            }else{
                this.initialDate=new Date()
            }
        }
    }
</script>
<style scoped>
    .nav-pills li a{
        font-size: 12px;
        line-height: 28px !important;
    }
</style>
