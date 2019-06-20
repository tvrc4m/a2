<template>
    <tbody>
       <slot></slot>
    </tbody>
</template>
<script>
    import { ContainerMixin } from 'vue-slicksort';
    export default {
        name: "TableSortContainer",
        mixins:[ContainerMixin]
    }
</script>
