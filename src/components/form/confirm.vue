<template>
    <div class="form-group">
        <label class="control-label" :class="lmd"></label>
        <div class="col-md-10 text-left">
            <button type="button" class="btn btn-primary btn-sm m-r-10" @click="doConfirm">{{confirm}}</button>
            <button type="button" class="btn btn-white btn-sm" v-if="back" @click="doBack">{{back}}</button>
        </div>
    </div>
</template>
<script>
    export default {
        name:"FormText",
        props:{
            confirm:{
                type:String,
                default:"确认"
            },
            back:{
                type:String,
                default:"返回"
            },
            labelmd:{
                type:Number,
                default: 1
            },
            // submit:{
            //     type:Function,
            //     required:true,
            // }
        },
        computed:{
            lmd(){
                let style={required:this.required}
                Object.defineProperty(style, 'col-md-'+this.labelmd, {
                    value: 1,
                    enumerable:true

                })
                return style
            }
        },
        methods:{
            doConfirm(){
                this.$emit("submit")
            },
            doBack(){
                if(this._events.cancel){
                    this.$emit("cancel")
                }else{
                    this.$router.back();
                }
            }
        },
        mounted(){
            // console.log(this._events)
        }
    }
</script>