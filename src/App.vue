<template>
    <div @click="dropdown">
        <router-view></router-view>
    </div>
</template>
<script>
    import bus from '@/utils/bus'
    export default {
        name: 'App',
        methods:{
            dropdown(){
                bus.$emit("dropdown-profile")
                bus.$emit("dropdown-notification")
                bus.$emit("select-single")
                bus.$emit("select-multiply")
            }
        }
    }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
