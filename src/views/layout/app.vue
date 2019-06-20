<template>
    <router-view></router-view>
</template>
<script>
    export default {
        name: "AppLayout",
        mounted(){
            var html = document.documentElement;
            var windowWidth = html.clientWidth;
            html.style.fontSize = windowWidth / 10.8 + 'px';
        }
    }
</script>