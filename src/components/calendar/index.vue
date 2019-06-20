<template>
    <div class="v-cal">
        <header class="v-cal-header">
            <div class="v-cal-header__title-bar">
                <div class="v-cal-header__title">
                    <div class="actions actions-left print-hidden">
                        <slot name="tabs"></slot>
                    </div>
                    <div class="v-cal-title">
                        <span style="padding: 0 15px;line-height: 30px;cursor: pointer;" @click="prev"><i class="fa fa-angle-left"></i></span>
                        {{ calendarTitle }}
                        <span style="padding: 0 15px;line-height: 30px;cursor: pointer;" @click="next"><i class="fa fa-angle-right"></i> </span>
                    </div>
                    <div v-for="action in actions" class="actions print-hidden">
                        <button type="button" class="btn btn-primary btn-xs m-r-10" :class="'btn-'+action.color" @click="$router.push(action.route)">
                            <i v-if="action.icon" :class="['fa', action.icon]"></i>
                            {{action['name']}}
                        </button>
                    </div>
                    <div class="actions actions-right print-hidden">
                        <slot name="actions"></slot>
                    </div>
                </div>
            </div>
        </header>
        <slot name="loading"></slot>
        <Week class="v-cal-content--week" :activeDate.sync="activeDate" v-bind="$attrs" v-on="$listeners"></Week>
        <footer class="v-cal-footer"></footer>
    </div>
</template>

<script>
    import Event from '@/utils/event';
    import EventBus from '@/utils/bus';
    import moment from 'moment';
    import Week from './week';
    import EventDialog from '@/components/dialog';
    export default {
        name: "VueScheduler",
        components: { Week },
        props: {
            activeDate: {
                type: Object,
                required: true
            },
            use12: {
                type: Boolean,
                default: () => true
            },
            // eventDisplay: {
            //     type: [String, Function],
            //     default: () => true
            // },
            disableDialog: {
                type: Boolean,
                default: false
            },
            eventDialogConfig: {
                type: Object,
                default: () => { return {} }
            },
            actions:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data() {
            return {
                today: moment(),
                activeView: 'week',
            }
        },
        computed: {
            // newEvents() {
            //     return this.events.map(e => {
            //         return new Event(e).bindGetter('displayText', this.eventDisplay);
            //     });
            // },
            calendarTitle() {
                if ( this.activeDate === null )
                    return '';
                const weekStart = moment(this.activeDate).day(1);
                const weekEnd = moment(this.activeDate).day(7);
                return weekStart.format('YYYY-MM-DD') + ' - ' + weekEnd.format('YYYY-MM-DD');
            }
        },
        methods: {
            openEventDialog(data) {
                if ( !this.disableDialog ) {

                    const { fields, ...config } = this.eventDialogConfig;

                    if ( data instanceof Date ) {
                        config.date = data
                    } else {
                        config.date = data.date;
                        config.startTime = data.time !== null ? moment(data.time, 'HH') : null;
                        config.endTime = data.time !== null ? moment(data.time, 'HH').add(1, 'h') : null;
                    }

                    EventDialog.show(config, fields)
                        .$on('event-created', (event) => {
                            this.events.push(event._e);
                            this.$emit('event-created', event._e);
                        });
                }
            },
            bindEvents() {
                EventBus.$on('day-clicked', (date) => {
                    this.$emit('day-clicked', date);
                    this.openEventDialog(date);
                });
                EventBus.$on('time-clicked', (data) => {
                    this.$emit('time-clicked', data);
                    this.openEventDialog(data);
                });
                EventBus.$on('event-clicked', (event) => {
                    this.$emit('event-clicked', event._e);
                });
            },
            goToToday() {
                let activeDate = moment(this.today);
                this.$emit("update:activeDate", moment(this.today))
                EventBus.$emit(this.activeView + '-changed', activeDate.toDate() );
            },
            prev() {
                let activeDate = moment(this.activeDate.subtract(1, this.activeView + 's'));
                this.$emit("update:activeDate", activeDate)
                EventBus.$emit(this.activeView + '-changed', activeDate.toDate() );
            },
            next() {
                let activeDate = moment(this.activeDate.add(1, this.activeView + 's'));
                this.$emit("update:activeDate", activeDate)
                EventBus.$emit(this.activeView + '-changed', activeDate.toDate() );
            },
        },
        mounted() {
            this.bindEvents();
        },
        beforeDestroy() {
            EventBus.$off('day-clicked');
            EventBus.$off('time-clicked');
            EventBus.$off('event-clicked');
        }
    }
</script>

<style scoped>
    .v-cal-header__title{
        display: flex;
        justify-content: space-between;
    }
    .v-cal-header__title > div{
        flex: 1;
    }
    .v-cal-header__title .actions-left{
        text-align: left;
    }
    .v-cal-header__title .actions-right{
        text-align: right;
    }
</style>
