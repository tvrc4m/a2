<template>
    <tr>
        <slot></slot>
    </tr>
</template>
<script>
    import { ElementMixin } from 'vue-slicksort';
    export default {
        name: "TableSortItem",
        mixins:[ElementMixin],
    }
</script>
