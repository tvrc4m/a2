<template>
    <div ref="event_block" class="v-cal-event-item" style="font-size: 14.5px;line-height: 16px;" :title="event.name" :class="eventClasses" @click.stop="eventClicked">
        <span class="v-cal-event-name" style="line-height: 16px;display: inline-block;" v-if="!ing">
            <img :src="amOrpm=='am'?am:pm" style="height: 16px;display: inline-block;margin-top: -2px;" />
            {{ event.start_time | timeFormat }}
        </span>
        <span :class="['v-cal-event-name']" style="color:#337ab7">{{ eventName }}</span>
        <div style="margin-top:5px;">
            <span v-for="user in event.user" v-if="user.realname" style="margin-right: 5px;">
                {{user.realname}}
            </span>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import EventBus from '@/utils/bus';
    import am from '@/assets/am.png'
    import pm from '@/assets/pm.png'
    export default {
        name: "EventItem",
        props: {
            event: {
                type: Object,
                required: true
            },
            ing: {
                type: Boolean,
                required: true
            },
            use12: {
                type: Boolean,
                required: true
            },
            hasDynamicSize: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                ancestorHeight: 0,
                am,
                pm
            }
        },
        computed: {
            eventClasses() {
                return {
                    'is-overlapping': this.event.overlaps > 0,
                    'event-title-center':this.ing,
                }
            },
            amOrpm(){
                return (moment(this.event.start_time*1000).format("a"))
            },
            eventName(){
                if(this.ing){
                    switch(this.event.type){
                        case 1:return this.event.name;
                        case 2:return this.event.name;
                        case 3:return '出访中';
                        case 4:return '出差中';
                        case 5:return this.event.name;
                    }
                }else{
                    return this.event.name
                }
            }
        },
        mounted() {
            if ( this.hasDynamicSize ) {
                this.getAndSetAncestorHeight();
                window.addEventListener('resize', this.getAndSetAncestorHeight);
            }
        },
        beforeDestroy() {
            if ( this.hasDynamicSize )
                window.removeEventListener('resize', this.getAndSetAncestorHeight);
        },
        methods: {
            eventClicked() {
                this.$emit('event-clicked', this.event);
            },
            getAndSetAncestorHeight() {
                this.ancestorHeight = this.findAncestor(this.$refs.event_block, 'v-cal-day__hour-content').offsetHeight;
            },
            findAncestor (el, cls) {
                while ((el = el.parentElement) && !el.classList.contains(cls)) ;
                return el;
            }
        }
    }
</script>

<style>
    
</style>