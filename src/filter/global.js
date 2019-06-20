import Vue from 'vue'
import moment from 'moment'

Vue.filter('displayWeek',(date)=>{
    let datetime=date.format(' (MM.DD)')
    switch(parseInt(date.format('E'))){
        case 7:return '星期日'+datetime;
        case 1:return '星期一'+datetime;
        case 2:return '星期二'+datetime;
        case 3:return '星期三'+datetime;
        case 4:return '星期四'+datetime;
        case 5:return '星期五'+datetime;
        case 6:return '星期六'+datetime;
    }
})

Vue.filter("dateFormat",(timestamp,showyear=true)=>{
    if(!timestamp){
        return '--'
    }
    var date = new Date(timestamp * 1000);
    var year=date.getFullYear()
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hour=date.getHours();
    var minute=date.getMinutes();
    return (showyear?year+"-":"")+(month>9?month:"0"+month)+"-"+(day>9?day:"0"+day)+" "+(hour>9?hour:"0"+hour)+":"+(minute>9?minute:"0"+minute);
})

Vue.filter("timeFormat",(timestamp)=>{
    return moment(timestamp*1000).format("HH:mm")
})