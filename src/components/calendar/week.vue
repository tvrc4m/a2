<template>
    <section class="v-cal-content">
        <fixed-header :fixedClass="fixedClass">
            <div class="v-cal-weekdays">
                    <div class="v-cal-weekdays__padding">
                        <div class="v-cal-weekday-item">{{extraTitle}}</div>
                    </div>
                    <div class="v-cal-weekday__wrapper">
                        <div class="v-cal-weekday-item" v-for="day in days">{{ day.d | displayWeek}}</div>
                    </div>
            </div>
        </fixed-header>
        <div class="v-cal-days" v-for="(event,index) in events" style="border-bottom: 1px solid #eaf0f4">
            <div class="v-cal-days__wrapper">
                <div class="v-cal-times">
                    <div class="v-cal-hour text-center v-cal-name-image" style="padding: 15px 2px;" v-if="event.is_leader">
                        <img :src="event.image" alt="" style="width: 32px;height: 32px;margin-right: 5px;border-radius: 4px;" />
                        <div>
                            <div>{{ event.name }}</div>
                            <div style="font-size: 10.5px;">{{ event.position }}</div>
                        </div>
                    </div>
                    <div class="v-cal-hour text-center" style="padding: 15px 2px;" v-else>{{ event.name }}</div>
                </div>
                <div class="v-cal-day v-cal-day--week" v-for="(day,i) in days" @mouseover="show(index+'_'+i,true)" @mouseout="show(index+'_'+i,false)">
                    <div class="v-cal-day__hour-block">
                        <!-- <span class="v-cal-day__hour-block-fill">{{ time | formatTime(use12) }}</span> -->
                        <div class="v-cal-day__hour-content" :style="eventStyle(event.schedule, day.d)">
                            <div class="v-cal-event-list" v-if="event.schedule.length">
                                <div v-for="(schedule, index) in event.schedule" :key="index" v-if="isSame(schedule.start_time, day.d) || isIng(schedule.start_time, schedule.end_time, day.d)">
                                    <event :event="schedule" :ing="isIng(schedule.start_time, schedule.end_time, day.d)" :use12="use12" v-bind="$attrs" v-on="$listeners"></event>
                                </div>
                            </div>
                            <span :style="{visibility:showadd[index+'_'+i]?'visible':'hidden'}" style="width: 100%;text-align: center;display: inline-block;cursor: pointer;display: flex;align-items: center;justify-content: center;margin: 5px 0;">
                                <i class="fa fa-plus-circle" @click="addSchedule(day,event)"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import moment from 'moment';
    import EventBus from '@/utils/bus';
    import event from './event';
    import { mapState } from 'vuex'
    // import IsView from '../mixins/IsView';
    // import ShowsTimes from '../mixins/ShowsTimes';
    import { getImageUrl } from '@/api/upload'
    import defaultAvatar from "@/assets/default.jpg"
    import FixedHeader from 'vue-fixed-header'
    export default {
        name: "week",
        // mixins: [ IsView, ShowsTimes ],
        components: { event, FixedHeader },
        props:{
            use12:{
                type: Boolean,
                default: true,
            },
            allDayLabel: {
                type: String,
                default: () => "all Day"
            },
            events: {
                type: Array,
                default: () => []
            },
            columns: {
                type: Array,
                default: () => []
            },
            minDate: {
                type: [Date, Object],
                default: () => null
            },
            maxDate: {
                type: [Date, Object],
                default: () => null
            },
            activeDate: {
                type: Object,
                required: true
            },
            extraTitle:{
                type: String,
                required:true,
            }
        },
        data() {
            return {
                days: [],
                times:[],
                showadd:{},
                // newEvents: JSON.parse(JSON.stringify(this.events))
            }
        },
        computed:{
            ...mapState(["minibar"]),
            fixedClass(){
                if(this.minibar){
                    return 'vue-fixed-header-mini--isFixed'
                }else{
                    return 'vue-fixed-header--isFixed'
                }
            }
        },
        watch:{
            activeDate(){
                this.buildCalendar()
            }
        },
        methods: {
            timeClicked(data) {
                EventBus.$emit('time-clicked', data)
            },
            isDayDisabled(day) {
                if ( !this.minDate && !this.maxDate )
                    return false;

                if ( this.minDate && this.minDate.isAfter(day, 'day') ) return true;
                if ( this.maxDate && this.maxDate.isBefore(day, 'day') ) return true;
            },
            buildCalendar() {
                //  Reset events
                // this.newEvents = JSON.parse(JSON.stringify(this.events));
                this.days = [];
                
                let now = moment();
                
                let temp = moment( this.activeDate ).day(moment.localeData().firstDayOfWeek());
                let w = temp.week();
                this.days = [];

                do {
                    const day = moment(temp);

                    // const dayEvents = this.events.filter( e => e.date.isSame(day, 'day') )
                    //     .sort( (a, b) => {
                    //         if ( !a.startTime ) return -1;
                    //         if ( !b.startTime ) return 1;
                    //         return moment(a.startTime).format('HH') - moment(b.startTime).format('HH');
                    //     });
                    // const mappedEvents = dayEvents.map( event => {
                    //     event.overlaps = dayEvents.filter( e => moment(event.startTime).isBetween( moment(e.startTime), moment(e.endTime) ) && e !== event ).length;
                    //     return event;
                    // });

                    let newDay = {
                        d: day,
                        isPast: temp.isBefore( now, 'day' ),
                        isToday: temp.isSame( now, 'day' ),
                        isDisabled: this.isDayDisabled(temp),
                        availableTimes: this.times.map( time => moment(time).dayOfYear( day.dayOfYear() ) ),
                        events: []
                    };
                    this.days.push(newDay);
                    temp.add( 1, 'day' );
                } while ( temp.week() === w );

            },
            isSame(start_time, diff){
                return moment(start_time*1000).isSame(diff, 'day')
            },
            isIng(start_time, end_time, diff){
                return moment(start_time*1000).isBefore(diff, 'day') && (moment(end_time*1000).isAfter(diff, 'day') || moment(end_time*1000).isSame(diff, 'day'))
            },
            show(field, status){
                this.$set(this.showadd, field, status)
            },
            addSchedule(day,event){
                this.$emit("add", day, event)
                // this.$router.push({name:"meeting_book_add"})
            },
            eventStyle(schedules,today){
                let match = false;
                for(let i in schedules){
                    if(this.isSame(schedules[i].start_time, today)){
                        match = true
                    }
                }
                if(match){
                    return {}
                }else{
                    return {justifyContent: "center"}
                }
            }
        },
        mounted() {
            EventBus.$on("week-changed",()=>{
                this.buildCalendar()
            })
            this.buildCalendar();
        },
        beforeDestory(){
            EventBus.$off("week-changed")
        }
    }
</script>
<style scoped>
    .v-cal-day--week{
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
    }
    .v-cal-day__hour-content{
        /*self-align:;*/
    }
    .v-cal-event-list{
        text-align: left;
    }
    .fa-plus-circle{
        font-size: 22px;
    }
    .v-cal-weekdays.vue-fixed-header--isFixed {
        position: fixed;
        right: 20px;
        top: 60px;
        width: calc(100vw - 280px);
        z-index: 100;
    }
    .v-cal-weekdays.vue-fixed-header-mini--isFixed {
        position: fixed;
        right: 20px;
        top: 60px;
        width: calc(100vw - 110px);
        z-index: 100;
    }

</style>
