<template>
    <div class="form-group">
        <label class="control-label" :class="lmd">{{label}}</label>
        <div class="col-md-10 text-left" style="line-height: 36px;">
            <div style="display: inline-block;" v-for="(item,index) in items"  :key="index">
                <span v-if="index!=0">&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="radio" :name="name" v-model="v" :value="item.value" />&nbsp;&nbsp;{{item.name}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"FormRadio",
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
        methods:{
            
        }
    }
</script>