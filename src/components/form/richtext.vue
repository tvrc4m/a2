<template>
    <div class="form-group">
        <label class="col-md-1 control-label" :class="{required:required}">{{label}}</label>
        <div class="col-md-10">
            <quill-editor class="quill-editor" v-model="content" :options="editorOption"></quill-editor>
        </div>
    </div>
</template>
<script>
    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    export default {
        name:"FormRichText",
        components:{
            quillEditor
        },
        props:{
            label: {
                type: String,
                required: true
            },
            value: {
                type: String,
                default: null
            },
            required:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                editorOption:{
                    placeholder: "请输入正文",
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }]
                        ]
                    }
                },
                content:null
            }
        },
        watch:{
            content(val){
                this.$emit("update:value",val)
            },
            value(val){
                this.content=val
            }
        },
        mounted(){
            this.content = this.value
        }
    }
</script>
<style>
    .quill-editor{
        color: black;
        font-size: 14px;

    }
    .quill-editor .ql-container{
        min-height: 120px;
    }
</style>