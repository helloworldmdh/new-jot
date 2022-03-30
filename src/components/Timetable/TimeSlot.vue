<template>
    <div :class="computedStyle" :style="{'height': computedHeight, 'background-color': this.colour, 'top': computedTop, 'margin-left': computedLeft, 'width': computedWidth, 'color': computedFont}">
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
            required: false,
        },
        'location':{
            type: String,
            required: false,
        },
        'colour': {
            type: String,
            default: "#A0E7E5"
        },
        'length':{
            type: Number,
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
        'indent':{
            type: Number,
            default: 0,
        }
    },
    computed:{
        computedHeight() {
            return `${(this.length/15)-0.3}em`
        },
        computedTop() {
            return `${this.startTime/15}em`
        },
        computedLeft() {
            return `${this.indent+1}vw`
        },
        computedWidth() {
            return `${96-(this.indent*8)}%`
        },
        computedStyle() {
            if (this.day == -1) return 'time'
            return 'normal_slot';
        },
        computedFont() {
            // Counting the perceptive luminance - human eye favors green color...
            if (this.colour.length != 7) return "#646464"
            var luminance = (0.299 * this.hexToRgb(this.colour).r + 0.587 * this.hexToRgb(this.colour).g + 0.114 * this.hexToRgb(this.colour).b)/255;
            if (luminance < 0.5)
                return "#ffffff"
            else
                return "#000000"
        },
    },
    methods: {
        hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },
    }

}
</script>

<style scoped>

    /*
        Style for all of the time slots on the timetable
    */
    .normal_slot{
        margin-left: 1em;
        margin-bottom: 0.1em;
        padding-left: 1em;
        height: 3em;
        background-color: #e0e0e0;
        border-radius: 0.35em;
        font-size: 15px;
        position: absolute;
        width:98%;
        border-width: 1px;
        border-color: grey;
        border-style: solid;
        left:-0.95em;
        overflow: hidden;
        cursor: pointer;
    }

    /*
        Style for the time shown on the right side
     */
    .time{
        background-color: #e0e0e0;
        margin-left: 1em;
        padding-left: 1em;
        height: 3em;
        border-bottom-color: #9c9c9c;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        font-size: 15px;
        position: absolute;
        width:98%;
        left:-0.95em;
    }


</style>