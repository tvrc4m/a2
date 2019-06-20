import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LayoutBasic = () => import('@/views/layout/basic')

const home = () => import('@/views/home/index')
const login = () => import('@/views/login')
const AdminUserList = () => import('@/views/admin/user/index')
const AdminUserForm = () => import('@/views/admin/user/form')
const AdminRuleList = () => import('@/views/admin/rule/index')
const AdminRuleForm = () => import('@/views/admin/rule/form')
const AdminRulePermission = () => import('@/views/admin/rule/permission')
const UserList = () => import('@/views/user/index')
const UserForm = () => import('@/views/user/form')

const NewsList = () => import('@/views/news/index')
const NewsForm = () => import('@/views/news/form')

const CompanyList = () => import('@/views/company/index')
const CompanyForm = () => import('@/views/company/form')
const CompanyUserList = () => import('@/views/company/user/index')
const CompanyUserForm = () => import('@/views/company/user/form')
const CompanyRuleList = () => import('@/views/company/rule/index')
const CompanyRuleForm = () => import('@/views/company/rule/form')
const CompanyOfficeList = () => import('@/views/company/office/index')
const CompanyOfficeForm = () => import('@/views/company/office/form')

const OrderList = () => import('@/views/order/index')
const OrderForm = () => import('@/views/order/form')

const ServiceSetting = () => import('@/views/service/setting')
const TijianPakcageForm = () => import('@/views/service/tijian/package/form')
const JiatingDoctorForm = () => import('@/views/service/jiating/doctor/form')

const PolicyModuleList = () => import('@/views/policy/module/index')
const PolicyModuleForm = () => import('@/views/policy/module/form')
const PolicyNewsList = () => import('@/views/policy/news/index')
const PolicyNewsForm = () => import('@/views/policy/news/form')

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
                path: "/adm/user",
                name: "admin_user",
                components: {
                    default: AdminUserList,
                }
            },
            {
                path: "/adm/user/add",
                name: "admin_user_add",
                components: {
                    default: AdminUserForm,
                }
            },
            {
                path: "/adm/user/edit/:id",
                name: "admin_user_edit",
                components: {
                    default: AdminUserForm,
                }
            },
            {
                path: "/adm/rule",
                name: "admin_rule",
                components: {
                    default: AdminRuleList,
                }
            },
            {
                path: "/adm/rule/add",
                name: "admin_rule_add",
                components: {
                    default: AdminRuleForm,
                }
            },
            {
                path: "/adm/rule/edit/:id",
                name: "admin_rule_edit",
                components: {
                    default: AdminRuleForm,
                }
            },
            {
                path: "/adm/rule/:id/permission",
                name: "admin_rule_permission",
                components: {
                    default: AdminRulePermission,
                }
            },
            {
                path: "user",
                name: "user",
                components: {
                    default: UserList,
                }
            },
            {
                path: "user/add",
                name: "user_add",
                components: {
                    default: UserForm,
                }
            },
            {
                path: "user/edit/:id",
                name: "user_edit",
                components: {
                    default: UserForm,
                }
            },
        ]
    },
    {
        path: '/news',
        components: {
            default: LayoutBasic,
        },
        children:[
            {
                path: "",
                name: "news",
                components: {
                    default: NewsList,
                }
            },
            {
                path: "add",
                name: "news_add",
                components: {
                    default: NewsForm,
                }
            },
            {
                path: "edit/:id",
                name: "news_edit",
                components: {
                    default: NewsForm,
                }
            },
        ]
    },
    {
        path: '/policy',
        components: {
            default: LayoutBasic,
        },
        children:[
            {
                path: "module",
                name: "policy_module",
                components: {
                    default: PolicyModuleList,
                }
            },
            {
                path: "module/add",
                name: "policy_module_add",
                components: {
                    default: PolicyModuleForm,
                }
            },
            {
                path: "module/edit/:id",
                name: "policy_module_edit",
                components: {
                    default: PolicyModuleForm,
                }
            },
            {
                path: "news",
                name: "policy_news",
                components: {
                    default: PolicyNewsList,
                }
            },
            {
                path: "news/add",
                name: "policy_news_add",
                components: {
                    default: PolicyNewsForm,
                }
            },
            {
                path: "news/edit/:id",
                name: "policy_news_edit",
                components: {
                    default: PolicyNewsForm,
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
                name: "company",
                components: {
                    default: CompanyList,
                }
            },
            {
                path: "add",
                name: "company_add",
                components: {
                    default: CompanyForm,
                }
            },
            {
                path: "edit/:id",
                name: "company_edit",
                components: {
                    default: CompanyForm,
                }
            },
            {
                path: ":cid/user",
                name: "company_user",
                components: {
                    default: CompanyUserList,
                }
            },
            {
                path: ":cid/user/add",
                name: "company_user_add",
                components: {
                    default: CompanyUserForm,
                }
            },
            {
                path: ":cid/user/edit/:id",
                name: "company_user_edit",
                components: {
                    default: CompanyUserForm,
                }
            },
            {
                path: ":cid/rule",
                name: "company_rule",
                components: {
                    default: CompanyRuleList,
                }
            },
            {
                path: ":cid/rule/add",
                name: "company_rule_add",
                components: {
                    default: CompanyRuleForm,
                }
            },
            {
                path: ":cid/rule/edit/:id",
                name: "company_rule_edit",
                components: {
                    default: CompanyRuleForm,
                }
            },
            {
                path: ":cid/office",
                name: "company_office",
                components: {
                    default: CompanyOfficeList,
                }
            },
            {
                path: ":cid/office/add",
                name: "company_office_add",
                components: {
                    default: CompanyOfficeForm,
                }
            },
            {
                path: ":cid/office/edit/:id",
                name: "company_office_edit",
                components: {
                    default: CompanyOfficeForm,
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
        path: '/company/:cid/service',
        components: {
            default: LayoutBasic,
        },
        children:[
            {
                path: ":alias/setting",
                name: "service_setting",
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
            }
        ]
    }
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
