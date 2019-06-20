import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        minibar: localStorage.getItem("minibar")=="true" || false,
        token: localStorage.getItem("token") || "",
        login_name: localStorage.getItem("login_name") || "",
        is_super: localStorage.getItem("is_super") || "",
        paths: JSON.parse(localStorage.getItem("paths")) || [],
    },
    mutations: {
       update_minibar(state,mini){
            state.minibar=mini
            localStorage.setItem("minibar", mini)
       },
       setLoginInfo(state,payout){
            state.token=payout.token
            state.login_name=payout.name
            localStorage.setItem("token",payout.token)
            localStorage.setItem("login_name",payout.name)
        },
        setPermission(state,permission){
            localStorage.setItem("is_super",permission.is_super)
            localStorage.setItem("paths",JSON.stringify(permission.paths))
            state.is_super=permission.is_super
            state.paths=permission.paths
        }
    }
})