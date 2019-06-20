import pagination from '@/components/pagination/index'
export default {
    components:{
        pagination
    },
    data(){
        return {
            total:0,
            params:{
                limit: 20,
                page: 1
            }
        }
    }
}