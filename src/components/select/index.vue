<template>
    <div class="btn-group bootstrap-select show-tick">
        <button type="button" class="btn dropdown-toggle form-control" :class="{disabled:disabled}" data-toggle="dropdown" :title="selected.name" @click.stop="open=!open" style="min-width: 160px;">
            <span class="filter-option pull-left" v-if="selected">{{selected.name}}</span>
            <span class="filter-option pull-left" v-else style="opacity: 0.7;">{{placeholder}}</span>&nbsp;
            <span class="bs-caret"><span class="caret"></span></span>
        </button>
        <div :class="['dropdown-menu',{open:open}]" v-if="!disabled">
            <ul class="dropdown-menu inner" role="menu" :style="{height: options.length<=10?'auto':'300px'}">
                <li v-for="option in options" :key="option.value" class="ms-hover" @click="optionClick(option)">
                    <a>
                        <span class="text">{{option.name}}</span>
                        <span v-show="option.value==v" class="glyphicon glyphicon-ok check-mark"></span>
                    </a>
                </li>
            </ul>
        </div>
        <select v-show="false" class="selectpicker" v-model="v" :disabled="disabled">
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
                type: [String, Number],
                default: null
            },
            disabled:{
                type:Boolean,
                default:false,
            }
        },
        data() {
            return {
                v: null,
                open:false
            }
        },
        computed:{
            selected(){
                if(!this.options.length){
                    return ''
                }
                let options=this.options.filter(item=>item.value==this.v)
                if(options.length){
                    return options[0]
                }
                return ''
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
                this.v=option.value
                this.open=false
            }
        },
        mounted() {
            this.v = this.value
            bus.$on("select-single",()=>{
                this.open=false
            })
        },
        beforeDestroy(){
            bus.$off('select-single')
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
    .open > .dropdown-menu {
        display: block;
        height: 300px;
        overflow: auto;
    }
    .dropdown-toggle.disabled{
        background-color: #eee;
    }
</style>
</style>
