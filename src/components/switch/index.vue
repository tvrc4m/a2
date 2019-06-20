<template>
    <div>
        <input type="checkbox" data-plugin="switchery" data-color="#1AB394" data-secondary-color="#ED5565" data-switchery="true" v-show="false" v-model="v" />
        <span class="switchery switchery-default mini" :class="{closed:v==1}" @click="changeStatus">
            <small></small>
        </span>
    </div>
</template>
<script>
    export default {
        name:"SwitchComponent",
        props:{
            value:{
                type:[String,Number],
                default:null
            }
        },
        data(){
            return {
                v:null
            }
        },
        watch:{
            v(val){
                this.$emit("update:value",val)
            },
            value(val){
                this.v=val
            }
        },
        methods:{
            changeStatus(){
                if(this.v==1){
                    this.v=0
                }else{
                    this.v=1
                }
                this.$emit("change",this.v)
            }
        },
        mounted(){
            this.v=this.value
        }
    }
</script>
<style scoped>
    .switchery {
        background-color: #fff;
        border: 1px solid #dfdfdf;
        border-radius: 20px;
        cursor: pointer;
        display: inline-block;
        height: 30px;
        position: relative;
        vertical-align: middle;
        width: 50px;
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        box-sizing: content-box;
        background-clip: content-box;
    }
    .switchery.mini {
        border-radius: 10px;
        height: 20px;
        width: 35px;
    }
    small {
        font-size: 85%;
    }
    .switchery small{
        background: #fff;
        border-radius: 100%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.4);
        height: 30px;
        position: absolute;
        top: 0;
        width: 30px;
        left: 0px;
        transition: background-color 0.4s ease 0s, left 0.2s ease 0s;
    }
    .switchery.mini small{
        height: 20px;
        width: 20px;
    }
    .switchery.closed{
        box-shadow: rgb(26, 179, 148) 0px 0px 0px 16px inset;
        border-color: rgb(26, 179, 148);
        background-color: rgb(26, 179, 148);
        /*transition: border 0.4s ease 0s, box-shadow 0.4s ease 0s, background-color 1.2s ease 0s;*/
    }
    .switchery.closed small{
        left: 20px;
        transition: background-color 0.4s ease 0s, left 0.2s ease 0s;
        background-color: rgb(255, 255, 255);
    }
</style>
