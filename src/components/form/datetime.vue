<template>
    <div class="form-group">
        <label class="col-md-1 control-label" :class="{required:required}">{{label}}</label>
        <div class="col-md-10 text-left">
            <datetime v-model="v" type="datetime" input-class="form-control" format="yyyy-LL-dd hh:mm a" :use12-hour="true"></datetime>
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
            name:{
                type:String,
                required:true
            },
            value:{
                type:[String,Number],
                default:null
            },
            label: {
                type: String,
                required: true
            },
            items:{
                type:Array,
                required: true,
            },
            required:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                v:null
            }
        },
        watch:{
            v(val){
                this.$emit("update:value",val)
            },
            value(val){
                this.v=val
            }
        },
        mounted(){
            this.v=this.value
        }
    }
</script>