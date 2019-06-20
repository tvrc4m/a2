<template>
    <div class="loading" style="text-align: center;">
        <loading style="height: 64px;padding: 15px;" v-bind="$attrs"></loading>
    </div>
</template>
<script>
    import loading from '@/components/loading/index'
    export default {
        name:"TableLoading",
        components:{
            loading
        }
    }
</script>