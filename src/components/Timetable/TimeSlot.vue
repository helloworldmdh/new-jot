<template>
    <div :class="slot">
        <p>
          {{ lectureTitle }}
        </p>
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
    
        'isEnabled': {
            type: Boolean,
            default: false,
        },
        'isContinued': {
            type: Boolean,
            default: false,
            required: false,
        }
    },
    computed:{
        // slotIsContinuous(){
        //     return {active: this.timeSlot};
        // }
    },
    data() {
        return {
        continued: this.isContinued,
        title: "nice",
        lecturer: "",
        startTime: 0,
        length: 0,
        location: "",
        module: "",
        enabled: this.isEnabled,
        }
    },
    methods:{
        
    }
}
</script>

<style>
    .slot{
        margin-left: 1em;
        margin-bottom: 0.5em;
        padding-left: 0.5em;
        height: 3em;
        background-color: #A0E7E5;
    }

    .active{
        margin-bottom: 0em;
    }
</style>