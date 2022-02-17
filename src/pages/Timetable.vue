<template>
  <div v-for="(day) in timeArray" :key="day" class="timetable-column">
    <div v-for="(slot) in day" :key="slot" class="timetable-row">
      <div id="boxes">
        <time-slot 
          :lecture-title="slot.title"
          :lecturer="slot.lecturer"
          :isEnabled="slot.enabled"
        ></time-slot> 
      </div>
    </div>
  </div>
</template>

<script>
import TimeSlot from "../components/Timetable/TimeSlot.vue";

export default {
  mounted(){
    this.createArray();
  },
  name: 'Timetable',
  components: {
    TimeSlot,
  },
  methods: {
    createArray() {
      // let dayArray = [];
     // dayArray.fill(this.time,0,47);
     // this.timeArray.fill(dayArray, 0,6);
      console.log("Attempt");

      var array = new Array(7);
      for(var k = 0; k < array.length; k++){
        array[k] = new Array(48);
      }

      for (var i = 0; i < 7; i++){
        for (var j = 0; j < 48; j++) {
          if ((Math.random()+((j-24)/48)) > 0.5){
            array[i][j] = {
              enabled: false,
              continued: false,
              title: "disabled",
              lecturer: "name",
              startTime: 0,
              length: 0,
              location: "",
              module: ""
            };
          } else if (Math.random()< 0.1) {
            array[i][j] = {
              enabled: true,
              continued: true,
              title: "continued",
              lecturer: "name",
              startTime: 0,
              length: 0,
              location: "",
              module: ""
            };
          } else {
            array[i][j] = {
              enabled: true,
              continued: false,
              title: "lecture",
              lecturer: "name",
              startTime: 0,
              length: 0,
              location: "",
              module: ""
            };
          }
        }
      }

      this.timeArray = array;
    },
    changeTitle(i, j) {
      this.timeArray[i][j].title = "not Nice"
    },
    changeContinuity(i, j){
      this.timeArray[i][j].continued = !this.timeArray[i][j].continued;
    }

  },
  data() {
    return {
      timeArray: [],
    }
  }
}

</script>


<style scoped>

.timetable-row {

  border-width: 2px;
  margin-left: 0.1em;
  border-right-color: #d4d4d4;
  border-right-style: dashed;
}


.timetable-column{
  float: left;
  width: 14%;
  text-align: left;
}

.timetable-row:after {
  content: "";
  display: table;
  clear: both;
} 


#boxes{
  position: relative;
} 

</style>
