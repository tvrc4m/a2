import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import Message from 'vue-multiple-message'
import { Settings } from 'luxon'
import store  from './store'

import { Dialog, Alert, Confirm } from 'vue-m-dialog'
Confirm.config({
    title:"提醒",
    confromButtonText:"确定",
    cancelButtonText:"取消"
})

Alert.config({
    title:"提醒",
    confromButtonText:"确定",
    cancelButtonText:"取消"
})
Vue.prototype.$alert=Alert
Vue.prototype.$confirm=Confirm

Settings.defaultLocale = 'zh-cn'

moment.locale("zh-cn",{
    week:{
        dow: 1,
    }
})

require("./filter/global")

Message.config({
    top: 60,
    duration: 2000,
    zIndex: 99999
})
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
