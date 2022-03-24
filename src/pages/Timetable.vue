<template>
  <add-module-menu :show="showDialogBox" @close="closeBox" @updateTable="updateTable"></add-module-menu>
  <a class="floating-btn" @click="openBox">+</a>
  <div class="timetable">
    <div class="time-column">
        <time-slot v-for="i in 24" :key="i"
        :lectureTitle="i-1+':00'"
        :length="60"
        :startTime="(i-1)*60"
        :day="-1"
        >

        </time-slot>
    </div>
    <div :class="dayStyle(day)" v-for="day in 7" :key="day">
        <time-slot v-for="slot in timeSlots[day-1]" :key="slot.id"
          :lecturer="slot.mod"
          :lectureTitle="slot.title"
          :length="slot.length"
          :startTime="slot.startTime"
          :day="day-1"
          :indent="slot.indent"
        >
        </time-slot>
    </div>
  </div>
</template>

<script>
import app from "../api/firebase"
import TimeSlot from "../components/Timetable/TimeSlot.vue";
import AddModuleMenu from "../components/Timetable/AddModuleMenu.vue";
import { getFunctions, httpsCallable } from "firebase/functions";


export default {

  name: 'Timetable',

  components: {
    TimeSlot,
    AddModuleMenu
},
  created(){
    this.updateTable();
  },
  methods: {
    dayStyle(day) {
      if (day == 1)
        return 'day-today'
      return 'day'

    },

    updateTable(){
      this.getTimeSlots().then(() => {
        this.splitByDay();
        this.checkOverlap();
      });
      this.showDialogBox = false
    },

    splitByDay() {
      this.timeSlots = [[],[],[],[],[],[],[],]
      this.baseTimeSlots.forEach((timeSlot) => {
        this.timeSlots[timeSlot.day].push(timeSlot)
      })
    },

    async getTimeSlots(){
      const functions = getFunctions(app);
			const getTimeslots = httpsCallable(functions, 'getTimeslots')
			await getTimeslots().then((result) => {
				this.baseTimeSlots = result.data.data;
			})
    },
    

    checkOverlap(){
  
      this.timeSlots.forEach((day) => {
        var previousEndTime = 0;
        var previousIndent = 0; 
        day.forEach((slot) => {
          if (slot.startTime < previousEndTime){
            slot.indent = previousIndent + 1
            previousIndent++
          }
          else{
            slot.indent = 0;
            previousIndent = 0;
          }
          previousEndTime = slot.startTime + slot.length
        });
      });
    },

    closeBox(){
      this.showDialogBox = false;
      this.updateTable();
    },
    openBox(){
      this.showDialogBox = true;
    },

  },
  data() {
    return {
      baseTimeSlots: [],
      timeSlots:[
        [
          {
            id: "lecture-0-540",
            title: "lecture1",
            lecturer: "name2",
            day: 0,
            startTime: 340,
            endTime: 660,
            length: 60,
            location: "",
            module: "",
            indent: 0,
          },
          {
            id: "lecture-0-5400",
            title: "lecture2132",
            lecturer: "name123",
            day: 0,
            startTime: 360,
            endTime: 660,
            length: 60,
            location: "",
            module: "",
            indent: 1,
          },
          {
            id: "lecture-0-5200",
            title: "lecture2132",
            lecturer: "name123",
            day: 0,
            startTime: 370,
            endTime: 660,
            length: 60,
            location: "",
            module: "",
            indent: 1,
          },
          {
            id: "lecture-0-540",
            title: "lecture2",
            lecturer: "name1",
            day: 0,
            startTime: 540,
            endTime: 660,
            length: 120,
            location: "",
            module: "",
            indent: 0,
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
            module: "",
            indent: 0,
          },
        ]
      ],
      showDialogBox: false,
    }
  }
}

</script>


<style scoped>
.floating-btn{
  width: 80px;
  height: 80px;
  background: #5ac0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 50%;
  color: #fff;
  font-size: 40px;
  box-shadow:2px 2px 5px rgba(0, 0, 0, 0.25);
  position: fixed;
  right: 20px;
  bottom: 20px;
  transition: background 0.25s;
  z-index: 9;
  cursor: pointer;
}

.floating-btn:active {
  background: #4593b8;
}


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

.day-today{
  width: 13%;
  float: left;
  text-align: left;
  position: relative;
  border-right-color: #d4d4d4;
  background: rgb(241, 241, 241);
  border-right-style: dashed;
  height: 67em;
  border-width: 2px;
}

</style>
