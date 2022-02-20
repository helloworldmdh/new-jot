<template>
    <div :class="computedStyle" :style="{height: computedHeight, top: computedTop}">
        <div>
            <div>
                {{ lectureTitle }}
            </div>
            <div>
                {{ lecturer }}
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'TimeSlot',
    props: {
        'lectureTitle':{
            type: String,
            required: true,
        },
        'lecturer':{
            type: String,
            required: true,
        },
        'location':{
            type: String,
            required: true,
        },
        'length':{
            type: String,
            required: true,
        },
        'startTime':{
            type: Number,
            required:true,
        },
        'isEnabled': {
            type: Boolean,
            default: false,
        },
        'isContinued': {
            type: Boolean,
            default: false,
            required: false,
        },
        'day':{
            type: Number,
            required: true,
        },
    },
    computed:{
        computedHeight(){
            return `${(this.length/20)-0.3}em`
        },
        computedTop(){
            return `${this.startTime/20}em`
        },

        computedStyle(){
            if (this.day == -1) return 'time'
            return 'normal-slot';
        }
    },

}
</script>

<style scoped>

    /*
    Style for all of the time slots on the timetable
    */
    .normal-slot{
        margin-left: 1em;
        margin-bottom: 0.1em;
        padding-left: 1em;
        height: 3em;
        background-color: #A0E7E5;
        border-radius: 0.35em;
        font-size: 15px;
        position: absolute;
        width:98%;
        left:-0.95em;
    }


    /**
    Style for the time shown on the right side
     */
    .time{
        margin-left: 1em;
        padding-left: 1em;
        height: 3em;
        border-radius: 0.35em;
        border-color: #e7b1a0;
        border-width: 2px;
        border-style: solid;
        font-size: 15px;
        position: absolute;
        width:98%;
        left:-0.95em;
    }


</style>