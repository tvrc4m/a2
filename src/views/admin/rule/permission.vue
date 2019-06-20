<template>
     <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <breadcrumb :paths="breadcrumbs"></breadcrumb>
                <p class="text-muted page-title-alt"></p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card-box" v-if="data.length">
                    <jstree :data="data" show-checkbox :allow-transition="false" multiple allow-batch whole-row @item-click="itemClick"></jstree>
                    <br>
                    <iform type="confirm" confirm="保存" @submit="updatePermission"></iform>
                </div>
                <table-loading style="margin-top: 100px;" v-if="loading"></table-loading>
            </div>
        </div>
    </div>
</template>
<script>
    import breadcrumb from '@/components/breadcrumb/index'
    import iform from '@/components/form/index'
    import jstree from 'vue-jstree'
    import { getRule,setPermission,getPaths } from '@/api/rule'
    import tableLoading from '@/components/loading/table'
    import loading_mixin from '@/mixins/loading'
    export default {
        name:"Rule",
        components:{
            jstree,
            breadcrumb,
            iform,
            tableLoading
        },
        mixins:[loading_mixin],
        data(){
            return {
                data: [],
                rule:{},
                breadcrumbs:[],   
            }
        },
        watch:{
           
        },
        methods:{
            itemClick (node) {
                // console.log(node.model.text + ' clicked !')
            },
            updatePermission(){
                let selected=[]
                this.data.forEach(node=>{
                    if(node.selected){
                        selected.push(node.value)
                    }
                    node.children.forEach(item=>{
                        if(item.selected){
                            selected.push(item.value)
                        }
                        item.children.forEach(child=>{
                            if(child.selected){
                                selected.push(child.value)
                            }
                        })
                    })
                })
                let permissionsid=selected.join(",")
                setPermission(this.rule.id, permissionsid).then(()=>{
                    this.$message.success("保存成功")
                    this.$router.push({name:"admin_rule"})
                })
            }
        },
        mounted(){
            this.loading=true
            if(this.$route.params.id){
                this.add=false
                Promise.all([getRule(this.$route.params.id),getPaths()]).then(([rule,permissions])=>{
                    this.rule=rule
                    this.loading=false
                    let selected=[]
                    if(rule.paths){
                        selected=rule.paths.split(",").map(item=>parseInt(item))
                    }
                    let rules=permissions.map(item=>{
                        let children=[]
                        if(item.hasOwnProperty("children") && item.children.length){
                                children=item.children.map(child=>{
                                    return {
                                        text:child.label,
                                        value:child.value,
                                        opened:true,
                                        icon:false,
                                        selected:selected.includes(child.value),
                                    }
                                })
                            }
                            return {
                                text:item.label,
                                value:item.value,
                                opened:true,
                                selected:selected.includes(item.value),
                                icon:"",
                                children: children
                            }
                    })
                    console.log(rules)
                    this.data=[
                         {
                            text: "全部",
                            opened: true,
                            icon:"",
                            value:null,
                            children: rules
                        }
                    ]
                    this.breadcrumbs=[
                        {
                            name:"权限管理",
                            route:""
                        },
                        {
                            name:"角色管理",
                            route:{name:"admin_rule"}
                        },
                        {
                            name: rule.name,
                        }
                    ];
                })
            }else{
                
            }
        }
    }
</script>