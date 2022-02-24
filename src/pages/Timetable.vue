<template>
  <div class="timetable">
    <div class="time-column">
        <time-slot v-for="i in 24" :key="i"
        :lectureTitle="i-1+':00 - '+(i)+':00'"
        :length="60"
        :startTime="(i-1)*60"
        :day="-1"
        >

        </time-slot>
    </div>
    <div class="day" v-for="day in 7" :key="day">
        <time-slot v-for="slot in timeSlots[day-1]" :key="slot.id"
          :lecturer="slot.lecturer"
          :lectureTitle="slot.title"
          :length="slot.length"
          :startTime="slot.startTime"
          :day="day-1"
        >
        </time-slot>
    </div>
  </div>

</template>

<script>
import TimeSlot from "../components/Timetable/TimeSlot.vue";

export default {
  name: 'Timetable',

  components: {
    TimeSlot,
  },
  methods: {

    
  },
  computed: {

  },
  data() {
    return {
      timeArray: [],
      timeSlots:[
        [
          {
            id: "lecture-0-540",
            title: "lecture",
            lecturer: "name",
            day: 0,
            startTime: 340,
            endTime: 660,
            length: 60,
            location: "",
            module: ""
          },
          {
            id: "lecture-0-540",
            title: "lecture",
            lecturer: "name1",
            day: 0,
            startTime: 540,
            endTime: 660,
            length: 120,
            location: "",
            module: ""
          }
        ],
        [
          {
            id: "lecture2-0-600",
            title: "lecture2",
            lecturer: "name2",
            day: 1,
            startTime: 800,
            endTime: 660,
            length: 30,
            location: "",
            module: ""
          },
        ]
      ],
    }
  }
}

</script>


<style scoped>




.day{
  width: 13%;
  float: left;
  text-align: left;
  position: relative;
  border-right-color: #d4d4d4;
  border-right-style: dashed;
  height: 67em;
  border-width: 2px;
}
.time-column{
  width: 9%;
  float: left;
  text-align: left;
  position: relative;
  border-right-color: #d4d4d4;
  border-right-style: dashed;
  height: 67em;
  border-width: 2px;
}



</style>
