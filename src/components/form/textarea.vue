<template>
    <div class="form-group">
        <label v-if="label.length" class="col-md-1 control-label" :class="{required:required}">{{label}}</label>
        <div :class="md">
            <textarea id="textarea" class="form-control" rows="3" :placeholder="placeholder" :disabled="disabled" v-model="v"></textarea>
        </div>
    </div>
</template>
<script>
    export default {
        name:"FormText",
        props:{
            label:{
                type:String,
                required:true
            },
            placeholder:{
                type: String,
                default: ""
            },
            value:{
                type:[String,Number],
                default:null
            },
            required:{
                type:Boolean,
                default:false
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                v:null
            }
        },
        computed:{
            md(){
                if(this.label.length){
                    return 'col-md-10'
                }
                return 'col-md-12'
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