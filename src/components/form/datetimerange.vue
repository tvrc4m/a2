<template>
    <div class="form-group datetimerange">
        <label class="col-md-1 control-label" :class="{required:required}">{{label}}</label>
        <div class="col-md-10 text-left" style="display: flex;align-items: center;">
            <datetime v-model="start_time" type="datetime" value-zone="local" placeholder="开始时间" format="yyyy-LL-dd hh:mm a" input-class="form-control" :use12-hour="true"></datetime>
            <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
            <datetime v-model="end_time" type="datetime" value-zone="local" placeholder="结束时间" format="yyyy-LL-dd hh:mm a" input-class="form-control" :use12-hour="true"></datetime>
        </div>
    </div>
</template>
<script>
    import {Datetime} from 'vue-datetime'
    import 'vue-datetime/dist/vue-datetime.css'
    export default {
        name:"FormDateTime",
        components:{
            Datetime
        },
        props:{
            start:{
                type:[String,Number],
                default:null
            },
            end:{
                type:[String,Number],
                default:null
            },
            label: {
                type: String,
                required: true
            },
            required:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                start_time:null,
                end_time:null,
            }
        },
        watch:{
            start_time(val){
                this.$emit("update:start",val)
            },
            end_time(val){
                this.$emit("update:end",val)
            },
            start(val){
                this.start_time=val
            },
            end(val){
                this.end_time=val
            }
        },
        mounted(){
            this.start_time=this.start
            this.end_time=this.end
        }
    }
</script>
<style lang="css">
    .datetimerange .vdatetime{
        flex: 1;
        display: inline-block; 
    }
</style>