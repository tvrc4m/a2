import io from 'socket.io-client';
export default {
    name:"Socket",
    data(){
        return {
            socket:null,
            host: process.env.SOCKET_API
        }
    },
    mounted(){
        this.connected=false
        this.socket = io(this.host);
        this.socket.on('connect', ()=>{
            console.log("socket connect")
        })
        // this.socket.on("disconnect")
    },
    beforeDestroy(){
        if(this.socket){
            this.socket.close()
        }
    }
}