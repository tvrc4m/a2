<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <breadcrumb :paths="breadcrumbs"></breadcrumb>
                <p class="text-muted page-title-alt"></p>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12"> 
                <ul class="nav nav-tabs tabs">
                    <li class="tab" :class="{active:action_alias==action.alias}" v-for="action in actions" :key="action.alias">
                        <a :href="'#'+action.alias" data-toggle="tab" aria-expanded="false"> 
                            <span class="visible-xs"><i class="fa fa-home"></i></span> 
                            <span class="hidden-xs">{{action.name}}</span> 
                        </a> 
                    </li> 
                </ul> 
                <div class="tab-content"> 
                    <div class="tab-pane active" v-if="action_alias=='check_reject'"> 
                        <form class="form-horizontal" role="form">
                            <iform type="textarea" label="模板内容" placeholder="请输入模板内容" :value.sync="template.content" required></iform>
                            <span>备注说明</span>
                            <!-- <iform type="confirm" @submit="updatePackage"></iform> -->
                        </form>
                    </div>
                    <div class="tab-pane" v-else-if="action_alias=='check_pass'">
                        <form class="form-horizontal" role="form">
                            <iform type="textarea" label="模板内容" placeholder="请输入模板内容" :value.sync="template.content" required></iform>
                            <span>备注说明</span>
                            <!-- <iform type="confirm" @submit="updatePackage"></iform> -->
                        </form>
                    </div> 
                    <div class="tab-pane"  v-else-if="action_alias=='order_success'">
                        <form class="form-horizontal" role="form">
                            <iform type="textarea" label="模板内容" placeholder="请输入模板内容" :value.sync="template.content" required></iform>
                            <span>备注说明</span>
                            <!-- <iform type="confirm" @submit="updatePackage"></iform> -->
                        </form>
                    </div> 
                </div> 
            </div> 
            
        </div>
    </div>
    
</template>
<script>
    import iform from '@/components/form/index'
    import breadcrumb from '@/components/breadcrumb/index'
    import tableLoading from '@/components/loading/table'
    import loading_mixin from '@/mixins/loading'
    import page_mixin from '@/mixins/page'
    import { getActionTemplate,addActionTemplate,editActionTemplate,delActionTemplate } from '@/api/sms/template'
    import { getSmsActions,getSmsAction } from '@/api/sms/action'
    import { getServiceDetail } from '@/api/service'
    export default {
        name:"SmsTemplateForm",
        components:{
            iform,
            breadcrumb
        },
        data(){
            return {
                action:{},
                service:{
                    alias:"",
                    name:""
                },
                template:{},
                actions:[],
                action_alias:"",
                breadcrumbs:[
                    {
                        name:"短信模板管理",
                        route:""
                    },
                ]
            }
        },
        mounted(){
            this.service.alias=this.$route.params.alias
            getSmsActions().then(data=>{
                this.actions=data.data
                if(this.actions && this.actions.length){
                    this.action_alias=this.actions[0].alias
                }
                console.log("action",this.actions)
            })
            getServiceDetail(this.service.alias).then(data=>{
                this.service = data.data
                console.log(this.service)
                // this.$store.commit("setBreadcrumb",[
                //     {
                //         route:{
                //             name:"ServiceSetting",
                //             params:{alias:this.service.alias}
                //         },
                //         name: this.service.name
                //     }
                // ])
            })
        }
    }
</script>