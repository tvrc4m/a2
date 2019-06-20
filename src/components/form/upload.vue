<template>
    <div class="form-group">
        <label v-if="!!label" class="control-label" :class="[labelSize,{required:required}]">{{label}}</label>
        <div :class="buttonSize">
            <input type="file" @change="changeFile" class="filestyle" data-input="false" id="filestyle-1" style="position: absolute; clip: rect(0px, 0px, 0px, 0px);">
            <div class="bootstrap-filestyle input-group" style="display: inline-block;">
                <span class="group-span-filestyle " tabindex="0">
                    <label for="filestyle-1" class="btn btn-default" :class="{'btn-xs':small}">
                        <span class="icon-span-filestyle glyphicon glyphicon-folder-open"></span> 
                        <span class="buttonText">{{button}}</span>
                    </label>
                    <span>{{placeholder}}</span>
                </span>
            </div>
            <img :src="url" alt="" style="width: 36px;margin-right: 10px;" />
        </div>
    </div>
</template>
<script>
    export default {
        name: "FormUpload",
        props: {
            label: {
                type: String,
                required: true
            },
            button: {
                type: String,
                default:"上传"
            },
            placeholder:{
                type: String,
                default: ""
            },
            small:{
                type:Boolean,
                default:false
            },
            btnSize:{
                type:Number,
                default: 10
            },
            url:{
                type:String
            },
            required:{
                type:Boolean,
                default:false
            }
        },
        computed:{
            labelSize(){
                return `col-md-${12 - this.btnSize}`
            },
            buttonSize(){
                return `col-md-${this.btnSize} small`
            }
        },
        methods:{
            changeFile(event){
                this.$emit("change-file", event.target.files[0])
            }
        }
    }
</script>
<style scoped>
    .small{
        padding-top: 7px;
    }
</style>