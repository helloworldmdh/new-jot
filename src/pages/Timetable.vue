<template>
  <add-module-menu :show="showDialogBox" @close="closeBox" @updateTable="updateTableAndClose"></add-module-menu>
  <a class="floating-btn" @click="openBox">+</a>
  <view-module-menu :show="slotSelect" @close="unselect" 
    :slot_title="selected.title"
    :mod_name="selected.mod"
    :sTime="selected.startTime"
    :day="selected.day"
    :time_length="selected.length"
  />
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
          :colour="slot.colour"
          @click="selectSlot(slot)"
        >
        </time-slot>
    </div>
  </div>
</template>

<script>
import TimeSlot from "../components/Timetable/TimeSlot.vue";
import AddModuleMenu from "../components/Timetable/AddModuleMenu.vue";
import ViewModuleMenu from '../components/Timetable/ViewModuleMenu.vue';


export default {

  name: 'Timetable',

  components: {
    TimeSlot,
    AddModuleMenu,
    ViewModuleMenu,
  },
  created(){
    this.updateTable();
    const d = new Date();
    if (d.getDay() == 0) this.currentDay = 7;
    else this.currentDay = d.getDay()
  },
  methods: {
    dayStyle(day) {
      if (day == this.currentDay)
        return 'day-today'
      return 'day'
    },

    updateTableAndClose() {
      this.updateTable()
      this.closeBox()
    },

    async updateTable(){
      await this.$store.dispatch('getTimeSlots');
      let temp = this.$store.getters.getterTimeSlots;
      if (!temp) this.baseTimeSlots = []
      else this.baseTimeSlots = temp;
      await this.$store.dispatch('getModulesFromServer');
      temp = this.$store.getters.getterModules;
      if (!temp) this.existingModules = []
      else this.existingModules = temp
      this.addColour();
      this.splitByDay();
      this.checkOverlap();
    },

    addColour() {
      this.colourTimeSlots = this.baseTimeSlots;
      this.baseTimeSlots.forEach((slot, index)=> {
        console.log(this.existingModules)
          this.colourTimeSlots[index].colour = this.existingModules.find(mod => mod.id == slot.modID).colour
      })
    },

    splitByDay() {
      this.timeSlots = [[],[],[],[],[],[],[],]
      this.colourTimeSlots.forEach((timeSlot) => {
        this.timeSlots[timeSlot.day].push(timeSlot)
      })
    },

    checkOverlap(){
      this.timeSlots.forEach((day) => {
        day.sort((a,b) => {
          if (a.startTime == b.startTime)
            return b.length - a.length
          return a.startTime - b.startTime;
        })
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
    selectSlot(slot){
      this.selected = slot;
      console.log(this.selected);
      this.slotSelect = true;
    },
    unselect(){
      this.slotSelect = false;
    },
  },
  data() {
    return {
      selected:{
        title: "",
        day: 0,
        startTime: 0,
        length: 0,
        location: "",
        module: "",
        lecturer: "",
      },
      slotSelect: false,
      baseTimeSlots: [],
      colourTimeSlots: [],
      existingModules: [],
      currentDay: 0,
      timeSlots:[
        [
          {
            title: "Loading Modules...",
            day: 0,
            startTime: 0,
            length: 1440,
            location: "",
            module: "",
            colour: "rgba(128, 128, 128, 0.1)",
            indent: 0,
          },
        ],
        [
          {
            title: "Loading Modules...",
            day: 1,
            startTime: 0,
            length: 1440,
            location: "",
            module: "",
            colour: "rgba(128, 128, 128, 0.1)",
            indent: 0,
          },
        ],
        [
          {
            title: "Loading Modules...",
            day: 2,
            startTime: 0,
            length: 1440,
            location: "",
            module: "",
            colour: "rgba(128, 128, 128, 0.1)",
            indent: 0,
          },
        ],
        [
          {
            title: "Loading Modules...",
            day: 3,
            startTime: 0,
            length: 1440,
            location: "",
            module: "",
            colour: "rgba(128, 128, 128, 0.1)",
            indent: 0,
          },
        ],
        [
          {
            title: "Loading Modules...",
            day: 4,
            startTime: 0,
            length: 1440,
            location: "",
            module: "",
            colour: "rgba(128, 128, 128, 0.1)",
            indent: 0,
          },
        ],
        [
          {
            title: "Loading Modules...",
            day: 5,
            startTime: 0,
            length: 1440,
            location: "",
            module: "",
            colour: "rgba(128, 128, 128, 0.1)",
            indent: 0,
          },
        ],
        [
          {
            title: "Loading Modules...",
            day: 6,
            startTime: 0,
            length: 1440,
            location: "",
            module: "",
            colour: "rgba(128, 128, 128, 0.1)",
            indent: 0,
          },
        ],
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
