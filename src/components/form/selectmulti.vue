<template>
    <div class="form-group">
        <label class="col-md-1 control-label" :class="{required:required}">{{label}}</label>
        <div class="col-md-10">
            <selectmulti v-bind="$attrs" v-on="$listeners"></selectmulti>
        </div>
    </div>
</template>
<script>
    import selectmulti from "@/components/select/multi"
    export default {
        name: "FormSelectMulti",
        components:{
            selectmulti
        },
        props: {
            label: {
                type: String,
                required: true
            },
            required:{
                type:Boolean,
                default:false
            }
        }
    }
</script>
