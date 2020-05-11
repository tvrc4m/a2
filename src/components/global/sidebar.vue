<template>
    <div class="left side-menu">

        <div class="sidebar-inner slimscrollleft" :class="{'mini-side-menu':minibar}">
            <!--- Divider -->

            <div id="sidebar-menu">
                <!-- <li class="text-muted menu-title">导航</li> -->
                <ul style="z-index: 999999;">
                    <template v-for="menu in menus">
                        <li class="has_sub" v-if="menu.chear && menu.chear.length>0">
                            <a href="javascript:void(0);" :class="['waves-effect',{subdrop:menu.open,'active':$route.path==menu.url}]" @click="menu.open=!menu.open">
                                <i :class="menu.icon"></i> 
                                <span> {{menu.name}} </span>
                                <span v-if="menu.chear && menu.chear.length" class="menu-arrow"></span>
                            </a>
                            <ul v-if="menu.chear && menu.chear.length" v-show="menu.open" class="list-unstyled" :class="{mini:minibar}">
                                <li v-for="submenu in menu.chear">
                                    <router-link :to="submenu.url" :class="{'active':$route.path==submenu.url}">{{submenu.name}}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="has_sub" v-else>
                            <a href="javascript:void(0);" :class="['waves-effect',{subdrop:$route.path==menu.url,'active':$route.path==menu.url}]"  @click="$router.push({path:menu.url})">
                                <i :class="menu.icon"></i> 
                                <span>{{menu.name}}</span>
                            </a>
                        </li>
                    </template>
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</template>
<script>
    import { getSideMenu } from '@/api/login'
    import { getAllServices } from '@/api/service'
    import { mapState } from 'vuex'
    export default {
        name:"SideBar",
        data(){
            return {
                menus:[
                    {
                        name:"系统首页",
                        key:"home",
                        icon:"ti-home",
                        open:true,
                        url:"/",
                        chear:[]
                    },
                    {
                        name:"后台账户",
                        key:"account",
                        icon:"ti-user",
                        open:true,
                        chear:[
                            {
                                name:"用户管理",
                                url:"/user",
                            },
                            {
                                name:"角色管理",
                                url:"/rule",
                            },
                        ]
                    },
                    {
                        name:"企业详情",
                        key:"company",
                        icon:"ti-crown",
                        open:true,
                        url:"/company",
                        chear:[]
                    },
                    {
                        name:"科室管理",
                        key:"office",
                        icon:"ti-agenda",
                        open:true,
                        url:"/office",
                        chear:[]
                    },
                    {
                        name:"订单管理",
                        key:"order",
                        icon:"ti-receipt",
                        open:true,
                        url:"/order",
                        chear:[]
                    },
                    {
                        name:"服务列表",
                        key:"service",
                        icon:"ti-align-right",
                        open:true,
                        chear:[
                            {
                                name:"模块管理",
                                url:"/policy/module",
                            },
                            {
                                name:"新闻管理",
                                url:"/policy/news",
                            },
                        ]
                    }
                ],
                selected: null,
                services:[]
            }
        },
        computed:{
            ...mapState(["minibar"])
        },
        methods:{
            menuClick(menu){
                if(this.selected==menu.key){
                    this.selected=null
                }else{
                    this.selected=menu.key
                }
            }
        },
        mounted(){
             getAllServices().then(data=>{
                let orders=data.map(item=>{
                    return {name:item.name,url:`/order/${item.alias}`}
                })
                let services=data.map(item=>{
                    return {name:item.name,url:`/service/${item.alias}`}
                })
                for(let index in this.menus){
                    if(this.menus[index].key=="order"){
                        this.menus[index]['chear']=orders
                    }else if(this.menus[index].key=="service"){
                        this.menus[index]['chear']=services
                    }
                }
            })
        },
    }
</script>
<style>
    .mini-side-menu{
        width: auto;
        height: 100%;
        overflow: visible;
        position: relative;
    }
</style>