import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LayoutBasic = () => import('@/views/layout/basic')

const home = () => import('@/views/home/index')
const login = () => import('@/views/login')

const CompanyDetail = () => import('@/views/company/detail')
const CompanyForm = () => import('@/views/company/form')
const CompanyUserList = () => import('@/views/company/user/index')
const CompanyUserForm = () => import('@/views/company/user/form')
const CompanyRuleList = () => import('@/views/company/rule/index')
const CompanyRuleForm = () => import('@/views/company/rule/form')
const CompanyRulePermission = () => import('@/views/company/rule/permission')
const CompanyOfficeList = () => import('@/views/company/office/index')
const CompanyOfficeForm = () => import('@/views/company/office/form')

const OrderList = () => import('@/views/order/index')
const OrderForm = () => import('@/views/order/form')

const ServiceSetting = () => import('@/views/service/setting')
const TijianPakcageForm = () => import('@/views/service/tijian/package/form')
const JiatingDoctorForm = () => import('@/views/service/jiating/doctor/form')

const smsTemplateForm=()=>import('@/views/sms/template/form')

const routes = [
    {
        path: "/login",
        name: "login",
        component: login
    },
    {
        path: '/',
        components: {
            default: LayoutBasic,
        },
        children: [
            {
                path: "/",
                name: "home",
                components: {
                    default: home,
                }
            },
            {
                path: "user",
                name: "user",
                components: {
                    default: CompanyUserList,
                }
            },
            {
                path: "user/add",
                name: "user_add",
                components: {
                    default: CompanyUserForm,
                }
            },
            {
                path: "user/edit/:id",
                name: "user_edit",
                components: {
                    default: CompanyUserForm,
                }
            },
            {
                path: "rule",
                name: "rule",
                components: {
                    default: CompanyRuleList,
                }
            },
            {
                path: "rule/add",
                name: "rule_add",
                components: {
                    default: CompanyRuleForm,
                }
            },
            {
                path: "rule/edit/:id",
                name: "rule_edit",
                components: {
                    default: CompanyRuleForm,
                }
            },
            {
                path: "rule/edit/:id/permission",
                name: "rule_permission",
                component: CompanyRulePermission
            },
            {
                path: "office",
                name: "office",
                components: {
                    default: CompanyOfficeList,
                }
            },
            {
                path: "office/add",
                name: "office_add",
                components: {
                    default: CompanyOfficeForm,
                }
            },
            {
                path: "office/edit/:id",
                name: "office_edit",
                components: {
                    default: CompanyOfficeForm,
                }
            },
        ]
    },
    {
        path: '/company',
        components: {
            default: LayoutBasic,
        },
        children:[
            {
                path: "",
                name: "company_detail",
                components: {
                    default: CompanyDetail,
                }
            },
            {
                path: "edit",
                name: "company_edit",
                components: {
                    default: CompanyForm,
                }
            },
            
            
        ]
    },
    {
        path: '/order',
        components: {
            default: LayoutBasic,
        },
        children:[
            {
                path: ":name",
                name: "order",
                components: {
                    default: OrderList,
                }
            },
            {
                path: "add",
                name: "order_add",
                components: {
                    default: OrderForm,
                }
            },
            {
                path: "edit/:id",
                name: "order_edit",
                components: {
                    default: OrderForm,
                }
            },
        ]
    },
    {
        path: '/service',
        components: {
            default: LayoutBasic,
        },
        children:[
            {
                path: ":alias",
                name: "service",
                components: {
                    default: ServiceSetting,
                }
            },
            {
                path:"tijian/package/add",
                name:"tijian_package_add",
                component:TijianPakcageForm,
            },
            {
                path:"tijian/package/add/:id",
                name:"tijian_package_edit",
                component:TijianPakcageForm,
            },
            {
                path:"jiating/doctor/add",
                name:"jiating_doctor_add",
                component:JiatingDoctorForm,
            },
            {
                path:"jiating/doctor/add/:id",
                name:"jiating_doctor_edit",
                component:JiatingDoctorForm,
            },
            {
                path:":alias/sms",
                name:"sms_template_form",
                component:smsTemplateForm
            },
        ]
    },
]

const router = new Router({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
})

export default router
