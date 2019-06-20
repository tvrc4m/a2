<template>
    <div class="col-sm-12">
        <ol class="breadcrumb">
            <li v-for="(path,index) in paths" :key="index" :class="{active:index==paths.length-1}">
                <a v-if="index!=paths.length-1" href="javascript:void(0);" @click="go(path.route)">{{path.name}}</a>
                <span v-else>{{path.name}}</span>
            </li>
            <li v-for="action in actions" class="actions pull-right">
                <button type="button" class="btn btn-primary btn-xs m-r-10" @click="go(action.route)">
                    <i v-if="action.icon" :class="['fa', action.icon]"></i>
                    {{action['name']}}
                </button>
            </li>
            <slot name="actions"></slot>
        </ol>
    </div>
</template>
<script>
    export default {
        name:"Breadcrumb",
        props:{
            paths:{
                type:Array,
                required:true,
                default(){
                    return []
                }
            },
            actions:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            go(route){
                this.$router.push(route)
            }
        }
    }
</script>
<style>
    .actions::before{
        content:"" !important;
    }
</style>