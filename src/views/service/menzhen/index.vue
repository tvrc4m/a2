<template>
     <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <breadcrumb :paths="breadcrumbs" :actions="actions"></breadcrumb>
                <p class="text-muted page-title-alt"></p>
            </div>
        </div>
        <div class="row">
           
        </div>
    </div>
</template>
<script>
    import breadcrumb from '@/components/breadcrumb/index'
    import iswitch from '@/components/switch/index'
    import tableLoading from '@/components/loading/table'
    import loading_mixin from '@/mixins/loading'
    import page_mixin from '@/mixins/page'
    import { getDoctors,delDoctor } from '@/api/service/doctor'
    export default {
        name:"ServiceTijianDoctor",
        components:{
            breadcrumb,
            iswitch,
            tableLoading
        },
        mixins:[page_mixin,loading_mixin],
        data(){
            return {
                headers:[
                    {
                        label:"ID",
                        name:"id",
                    },
                    {
                        label:"姓名",
                        name:"name",
                    },
                    {
                        label:"联系电话",
                        name:"tel",
                    },
                    {
                        label:"所属科室",
                        name:"office_id",
                    },
                    {
                        label:"预约时间",
                        name:"time",
                    },
                    {
                        label:"备注",
                        name:"remark",
                    },
                    {
                        label:"操作",
                        name:"opt",
                    }
                ],
                data:[],
                breadcrumbs:[
                    {
                        name:"就诊服务",
                        route:""
                    },
                ],
                total:0,
                service:{
                    alias:"menzhen",
                    name:"就诊服务"
                }
            }
        },
        computed:{
            actions(){
                return [
                    {
                        name:"短信模板",
                        icon:"fa-plus",
                        route:{
                            name:'sms_template_form',
                            params:{alias:this.service.alias}
                        }
                    }
                ]
            }
        },
        methods:{
            editDoctor(doctor){
                this.$router.push({name:"jiating_doctor_edit",params:{id:doctor.id,cid:this.company_id,alias:this.service.alis}})
            },
            doDel(doctor){
                // this.$confirm('是否确认删除?').then(()=>{
                //     delDoctor(doctor.id).then(()=>{
                //         this.data=this.data.filter(item=>item.id!=doctor.id)
                //     })
                // })
            },
            changePage(page){
                
            }
        },
        mounted(){
            this.changePage(1)
        }
    }
</script>