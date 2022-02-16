<template>
  <div v-for="(day) in timeArray" :key="day" class="timetable-column">
    <div v-for="(slot) in day" :key="slot" class="timetable-row">
      <div id="boxes">
        <time-slot :lecture-title="slot.title"></time-slot> 
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
          array[i][j] = {
            enabled: true,
            continued: false,
            title: "nice",
            lecturer: "",
            startTime: 0,
            length: 0,
            location: "",
            module: ""
          };
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
  height:2em;
  display:block;
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
    margin-left: 1em;
    margin-bottom: 0.5em;
    padding-left: 0.5em;
    height: 3em;
  } 

</style>
