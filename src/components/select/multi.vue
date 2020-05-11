<template>
    <div class="btn-group bootstrap-select show-tick">
        <button type="button" class="btn dropdown-toggle form-control" :class="{disabled:disabled}" data-toggle="dropdown" :title="selected" @click.stop="open=!open" style="min-width: 100%;">
            <span class="filter-option pull-left" v-if="selected">{{selected}}</span>
            <span class="filter-option pull-left" v-else style="opacity: 0.7;">{{placeholder}}</span>&nbsp;
            <span class="bs-caret"><span class="caret"></span></span>
        </button>
        <div :class="['dropdown-menu',{open:open}]" v-if="!disabled">
            <ul class="dropdown-menu inner" role="menu">
                <li v-for="option in options" :key="option.value" class="ms-hover" @click.stop="optionClick(option)">
                    <a>
                        <span class="text">{{option.name}}</span>
                        <span v-show="v.includes(option.value)" class="glyphicon glyphicon-ok check-mark"></span>
                    </a>
                </li>
            </ul>
        </div>
        <select v-show="false" class="selectpicker" data-style="btn-white" multiple v-model="v" :disabled="disabled">
            <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
        </select>
    </div>
</template>
<script>
    import bus from '@/utils/bus'
    export default {
        name: "FormSelect",
        props: {
            options: {
                type: Array,
                default () {
                    return []
                }
            },
            placeholder:{
                type:String,
            },
            value: {
                type: Array,
                default(){
                    return []
                }
            },
            disabled:{
                type:Boolean,
                default:false,
            }
        },
        data() {
            return {
                v: [],
                open:false
            }
        },
        computed:{
            selected(){
                let names=[]
                this.options.forEach(option=>{
                    if(this.v.includes(option.value)){
                        names.push(option.name)
                    }
                })
                return names.join(", ")
            }
        },
        watch: {
            v(val) {
                this.$emit("update:value", val)
            },
            value(val){
                this.v=val
            }
        },
        methods:{
            optionClick(option){
                if(this.v.includes(option.value)){
                    this.v.splice(this.v.indexOf(option.value),1)
                }else{
                    this.v.push(option.value)
                }
                // this.open=false
            }
        },
        mounted() {
            this.v = this.value
            bus.$on("select-multiply",()=>{
                this.open=false
            })
        },
        beforeDestroy(){
            bus.$off('select-multiply')
        }
    }
</script>
<style scoped>
    .open{
        display: inline-block;
        padding: 0;
    }
    .dropdown-toggle{
        position: relative;
    }
    .bs-caret{
        position: absolute;
        right: 15px;
    }
    .dropdown-toggle.disabled{
        background-color: #eee;
    }
</style>
