<template>
    <div class="form-group">
        <label class="col-md-1 control-label">{{label}}</label>
        <div class="col-md-10">
            <iswitch v-bind="$attrs" v-on="$listeners"></iswitch>
        </div>
    </div>
</template>
<script>
    import iswitch from '@/components/switch/index'
    export default {
        name:"FormSwitch",
        components:{
            iswitch
        },
        props:{
            label:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                
            }
        }
    }
</script>
<style scoped>
    
</style>
