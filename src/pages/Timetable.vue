<template>
  <div id="boxes">
    <div v-for="(day, i) in timeArray" :key="day" class="timetable-column">
      <div v-for="(slot, j) in day" :key="slot" class="timetable-row">
        <time-slot>
          <div v-if="slot.enabled">
            <div @click="changeTitle(i, j)">
              <p>
                {{ slot.title }}
              </p>
            </div>
          </div>
        </time-slot> 
      </div>
    </div>
  </div>
</template>

<script>
//import timeSlot from "../components/Timetable/timeSlot.vue";

export default {
  mounted(){
    this.createArray();
  },

  name: 'Timetable',
  components: {
    //timeSlot,
  },
  methods: {
    createArray() {
      // let dayArray = [];
     // dayArray.fill(this.time,0,47);
     // this.timeArray.fill(dayArray, 0,6);
      console.log("Attempt");

      var array = new Array(7);
      for(var k = 0; k< array.length; k++){
        array[k] = new Array(48);
      }

      for (var i = 0; i < 7; i++){
        for (var j = 0; j < 48; j++) {
          array[i][j] = {
          enabled: true,
          sameAsAbove:false,
          title: "nice",
          lecturer: "",
          startTime: 0,
          length: 0,
          location: "",
          module: "",
        };
        }
      }

      this.timeArray = array;
    },
    changeTitle(i, j) {
      this.timeArray[i][j].title = "not Nice"
    },

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
  height:2em
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


/* #boxes{
    display: table;
} */

</style>
