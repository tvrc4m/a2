import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        minibar: localStorage.getItem("minibar")=="true" || false,
    },
    mutations: {
       update_minibar(state,mini){
            state.minibar=mini
            localStorage.setItem("minibar", mini)
       }
    }
})