<template>
    <div :is="form" v-bind="$attrs" v-on="$listeners"></div>
</template>
<script>
    import text from './text'
    import password from './password'
    import textarea from './textarea'
    import select from './select'
    import selectmulti from './selectmulti'
    import confirm from './confirm'
    import upload from './upload'
    import iswitch from './switch'
    import rich from './richtext'
    import radio from './radio'
    import datetime from './datetime'
    import datetimerange from './datetimerange'
    export default {
        name:"FormIndex",
        props:{
            type:{
                type:String,
                required:true
            }
        },
        computed:{
            form(){
                switch(this.type){
                    case 'text': return text;
                    case 'password': return password;
                    case 'textarea': return textarea;
                    case 'select': return select;
                    case 'selectmulti': return selectmulti;
                    case 'confirm': return confirm;
                    case 'upload': return upload;
                    case 'switch': return iswitch;
                    case 'rich': return rich;
                    case 'radio': return radio;
                    case 'datetime': return datetime;
                    case 'datetimerange': return datetimerange;
                }
            }
        }
    }
</script>