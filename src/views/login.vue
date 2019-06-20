<template>
    <div class="login">
        <div class="account-pages"></div>
        <div class="clearfix"></div>
        <div class="wrapper-page">
            <div class=" card-box">
                <div class="panel-heading">
                    <h3 class="text-center"><strong>凤凰之家服务提供商</strong> </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal m-t-20">
                        <iform type="text" label="" placeholder="用户名" @keyup.native.enter="doLogin" :value.sync="user.username"></iform>
                        <iform type="password" label="" placeholder="密码" @keyup.native.enter="doLogin"  :value.sync="user.password"></iform>
                        <div class="form-group text-center m-t-20">
                            <div class="col-xs-12">
                                <button class="btn btn-primary btn-block text-uppercase waves-effect waves-light" type="button" @click.enter="doLogin">登录</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { userLogin } from '@/api/login'
    import iform from '@/components/form/index'
    export default {
        name:"Login",
        components:{
            iform
        },
        data(){
            return {
                user:{
                    username:null,
                    password:null
                }
            }
        },
        methods:{
            doLogin(){
                if(!this.user.username || !this.user.username.length){
                    this.$message.error('请填写用户名')
                    return false
                }
                if(!this.user.password || !this.user.password.length){
                    this.$message.error('请填写密码')
                    return false
                }
                userLogin(this.user.username,this.user.password).then(data=>{
                    // localStorage.setItem("authKey",data.authKey)
                    // localStorage.setItem("sessionId",data.sessionId)
                    // localStorage.setItem("username", data.userInfo.realname?data.userInfo.realname:data.userInfo.username)
                    // localStorage.setItem("uid", data.userInfo.id)
                    this.$router.push("/")
                })
            }
        }
    }
</script>
<style>
    .login{
        background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
        background-repeat: no-repeat;
        background-position: center 110px;
        background-size: 100%;
        height: 100vh;
    }
</style>
