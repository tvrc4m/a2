<template>
    <div class="form-group">
        <label class="control-label" :class="lmd">{{label}}</label>
        <div class="col-md-10">
            <htmlselect v-bind="$attrs" v-on="$listeners"></htmlselect>
        </div>
    </div>
</template>
<script>
    import htmlselect from "@/components/select/index"
    export default {
        name: "FormSelect",
        components:{
            htmlselect
        },
        props: {
            label: {
                type: String,
                required: true
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
    }
</script>
