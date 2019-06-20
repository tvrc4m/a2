<template>
    <div class="form-group">
        <label v-if="label.length" class="control-label" :class="lmd">{{label}}</label>
        <div :class="md">
            <input type="text" class="form-control" :disabled="disabled" :placeholder="placeholder" v-model="v" />
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
            },
            labelmd:{
                type:Number,
                default: 1
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
            },
            lmd(){
                let style={required:this.required}
                Object.defineProperty(style, 'col-md-'+this.labelmd, {
                    value: 1,
                    enumerable:true

                })
                return style
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