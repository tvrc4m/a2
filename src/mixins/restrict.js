import moment from 'moment';
export default {
    name: "RestrictDriving",
    data(){
        return {
            restricts:[
                {
                    start_time: "2019-4-8",
                    end_time: "2019-7-7",
                    weekend:{
                        monday: [5,0],
                        tuesday: [1,6],
                        wednesday: [2,7],
                        thursday: [3,8],
                        friday: [4,9]
                    },
                },
                {
                    start_time: "2019-7-8",
                    end_time: "2019-10-6",
                    weekend:{
                        monday: [4,9],
                        tuesday: [5,0],
                        wednesday: [1,6],
                        thursday: [2,7],
                        friday: [3,8]
                    },
                },
                {
                    start_time: "2019-10-7",
                    end_time: "2020-1-5",
                    weekend:{
                        monday: [3,8],
                        tuesday: [4,9],
                        wednesday: [5,0],
                        thursday: [1,6],
                        friday: [2,7]
                    },
                },
                {
                    start_time: "2020-1-6",
                    end_time: "2020-4-5",
                    weekend:{
                        monday: [2,7],
                        tuesday: [3,8],
                        wednesday: [4,9],
                        thursday: [5,0],
                        friday: [1,6]
                    },
                }
            ],
            restrict_numbers: [],
            is_restrict: false,
            restrict_timer:null,
        }
    },
    methods:{
        getTodayRestrict(){
            var today = moment();
            for(let index in this.restricts){
                if(today.isBetween(this.restricts[index]['start_time'], this.restricts[index]['end_time'])){
                    let weekend = today.format("dddd").toLowerCase()
                    if(this.restricts[index]['weekend'].hasOwnProperty(weekend)){
                        this.is_restrict = true
                        this.restrict_numbers = this.restricts[index]['weekend'][weekend]
                    }
                }
            }
        }
    },
    mounted(){
        this.getTodayRestrict()
        this.restrict_timer = setInterval(()=>{
            this.getTodayRestrict()
        },3600000*2);
    },
    beforeDestroy(){
        clearInterval(this.restrict_timer)
    }
}