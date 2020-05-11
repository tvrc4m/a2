<template>
    <div class="topbar">
        <div class="topbar-left">
            <div class="text-center">
                <div class="logo">
                    <i class="icon-c-logo"></i><span>凤凰之家运营管理平台</span>
                </div>
            </div>
        </div>
        <div class="navbar navbar-default" role="navigation">
            <div class="container">
                <div class="">
                    <div class="pull-left">
                        <button class="button-menu-mobile open-left waves-effect waves-light" @click="toggleSidebar">
                            <i class="md md-menu"></i>
                        </button>
                        <span class="clearfix"></span>
                    </div>
                    <ul class="nav navbar-nav navbar-right pull-right">
                        <li class="dropdown top-menu-item-xs">
                            <a href="javascript:void(0);" class="dropdown-toggle waves-effect waves-light" @click.stop="toggleNotification">
                                <i class="icon-bell"></i> <span class="badge badge-xs badge-danger">{{unread_total}}</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-lg" :class="{show:showNotification}">
                                <li class="notifi-title"><span class="label label-default pull-right">未读 {{unread_total}}</span>消息通知</li>
                                <li class="list-group slimscroll-noti notification-list">
                                    <!-- list item-->
                                    <a href="javascript:void(0);" class="list-group-item">
                                        <div class="media">
                                            <div class="media-body">
                                                <h5 class="media-heading">新增未审核工作人员</h5>
                                                <p class="m-0">
                                                    <small>你有{{unread_total}}条未读消息</small>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li class="top-menu-item-xs">
                                    <a href="javascript:void(0);" class="list-group-item text-right">
                                        <small class="font-600">查看所有消息通知</small>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown top-menu-item-xs">
                            <a href="javascript:void(0);" class="dropdown-toggle profile waves-effect waves-light">{{login_name}}</a>
                        </li>
                        <li>
                             <div class="dropdown pull-left">
                                <button class="button-menu-mobile open-left waves-effect waves-light" @click.stop="toggleProfile">
                                    <i class="md md-menu"></i>
                                </button>
                                <ul class="dropdown-menu" :class="{show:showProfile}">
                                    <!-- <li><a href="javascript:void(0)"><i class="ti-user m-r-10 text-custom"></i>编辑</a></li> -->
                                    <!-- <li class="divider"></li> -->
                                    <li><a href="javascript:void(0)" @click="logout"><i class="ti-power-off m-r-10 text-danger"></i>退出</a></li>
                                </ul>
                                <span class="clearfix"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '@/utils/bus'
    import { userLogout } from '@/api/login'
    import { mapState,mapMutations } from 'vuex'
    export default {
        name: "GlobalHeader",
        data() {
            return {
                show: false,
                showNotification:false,
                showProfile:false,
                unread_total:7,
            }
        },
        computed:{
            ...mapState(["minibar","login_name"])
        },
        methods:{
            ...mapMutations(["update_minibar"]),
            toggleNotification(){
                this.showNotification=!this.showNotification
                if(this.showProfile)
                    this.showProfile=false
            },
            toggleProfile(){
                this.showProfile=!this.showProfile
                if(this.showNotification)
                    this.showNotification=false
            },
            logout(){
                userLogout().then(()=>{
                    this.$router.push({name:"login"})
                })
            },
            toggleSidebar(){
                console.log(this.minibar, !this.minibar)
                this.update_minibar(!this.minibar)
            }
        },
        mounted(){
            bus.$on('dropdown-profile',()=>{
                this.showProfile=false
            })
            bus.$on('dropdown-notification',()=>{
                this.showNotification=false
            })
        },
        beforeDestroy(){
            bus.$off('dropdown-profile')
            bus.$off('dropdown-notification')
        }
    }
</script>
<style>
    .show{
        display: inline-block;
    }
</style>