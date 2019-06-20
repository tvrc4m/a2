<template>
    <div id="wrapper" :class="{enlarged:minibar}">
        <global-header></global-header>
        <sidebar></sidebar>
        <div class="content-page">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
        <global-footer></global-footer>
    </div>
</template>
<script>
    import globalHeader from '@/components/global/header'
    import globalFooter from '@/components/global/footer'
    import sidebar from '@/components/global/sidebar'
    import { mapState } from 'vuex'
    export default {
        components:{
            globalHeader,
            globalFooter,
            sidebar,
        },
        computed:{
            ...mapState(["minibar"])
        }
    }
</script>