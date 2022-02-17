<template>
    <div :class="slotStyle">
        <div v-show="isEnabled">
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
        slotStyle() {
            if (this.isEnabled){
                if (this.isContinued){
                    return "continous-slot"
                }
                return "normal-slot"
            }
            return "empty-slot"
        }
    },
    data() {
        return {
            // continued: this.isContinued,
            // title: "nice",
            // lecturer: "",
            // startTime: 0,
            // length: 0,
            // location: "",
            // module: "",
            // enabled: this.isEnabled,
        }
    },
    methods:{
        
    }
}
</script>

<style>
    .normal-slot{
        margin-left: 1em;
        margin-bottom: 0.1em;
        padding-left: 1em;
        height: 3em;
        background-color: #A0E7E5;
        border-radius: 0.25em;
        font-size: 15px;
    }

    .empty-slot{
        margin-left: 1em;
        margin-bottom: 0.1em;
        padding-left: 1em;
        height: 3em;
        background-color: #ffffff;
        border-radius: 0.25em;
        font-size: 15px;
    }

    .continuous-slot{
        margin-left: 1em;
        padding-left: 1em;
        height: 3em;
        background-color: #A0E7E5;
        border-radius: 0.25em;
        border-bottom-left-radius: 0em;
        border-bottom-right-radius: 0em;
        font-size: 15px;
    }




</style>