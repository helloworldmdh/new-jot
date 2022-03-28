<template>
  <base-dialog
    title="Selected Timeslot"
    :colour="currSlot.colour"
    @close="editing = false"
  >
    <div class="dialog_container">
      <div class="detail_labels">
        <div class="time_d">Title</div>
        <div class="time_d">Module</div>
        <div class="time_d">Time</div>
        <div class="time_d">Day</div>
        <div class="time_d">Lecturer</div>
      </div>
      <div class="info" v-if="!editing">
        <div class="time_i">{{ currSlot.title }}</div>
        <div class="time_i">{{ currModule.name }}</div>
        <div class="time_i">{{ formatTime }}</div>
        <div class="time_i">{{ changeDay }}</div>
        <div class="time_i">{{ currModule.lecturer }}</div>
      </div>
      <div class="mod_inputs" v-else>
        <div class="mod_inputs">
          <input
            type="text"
            class="input_box_title"
            v-model.trim="slotInEdit.title"
            required
          /><br />

          <input
            type="text"
            class="input_box_modname"
            v-model="moduleInEdit.name"
            required
          />
          <datalist id="modnames">
            <option v-for="mod in temp_module" :key="mod">{{ mod.name }}</option>
          </datalist>
          <input
            type="color"
            class="input_box_color"
            v-model="slotInEdit.colour"
          /><br />
          <input
            type="time"
            class="input_box_time"
            v-model="startTimeString"
            required
          />
          -
          <input
            type="time"
            class="input_box_time"
            v-model="endTimeString"
            required
          /><br />
          <select class="input_box" :v-model="slotInEdit.day" required>
            <option v-for="d in days" :key="d">
              {{ d }}
            </option></select
          ><br />
          <input
            type="text"
            class="input_box"
            v-model.trim="moduleInEdit.lecturer"
            required
          /><br />
        </div>
      </div>
    </div>

    <template #actions v-if="!editing">
      <button class="btn btn-primary m-3" @click="edit">Edit</button>
    </template>
    <template #actions v-else>
      <button class="btn btn-primary m-3" @click="edit">Cancel</button>
      <button class="btn btn-primary m-3" @click="updateSlot">Update</button>
    </template>
  </base-dialog>
</template>

<script>
export default {
  name: "ViewModuleMenu",
  data() {
    return {
      editing: false,
      startTimeString: "",
      endTimeString: "",
      slotInEdit: {
        title: "",
        module: "",
        colour: "",
      },
      currModule: {
        
      },
      moduleInEdit: {},
      tempModule: [],
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    };
  },
  computed: {
    changeDay() {
      var day_name = "";
      switch (this.slotInEdit.day) {
        case 0:
          day_name = "Monday";
          break;
        case 1:
          day_name = "Tuesday";
          break;
        case 2:
          day_name = "Wednesday";
          break;
        case 3:
          day_name = "Thursday";
          break;
        case 4:
          day_name = "Friday";
          break;
        case 5:
          day_name = "Saturday";
          break;
        case 6:
          day_name = "Sunday";
          break;
      }
      return day_name;
    },
    formatTime() {
      let fulltime = "";
      let startTime = this.convertTime(this.currSlot.startTime);
      let endTime = this.convertTime(this.currSlot.startTime + this.currSlot.length);
      fulltime = startTime + " - " + endTime;
      return fulltime;
    },
  },
  methods: {
    convertTime(mins) {
      let h = Math.floor(mins / 60);
      let m = mins % 60;
      h = h < 10 ? "0" + h : h; // (or alternatively) h = String(h).padStart(2, '0')
      m = m < 10 ? "0" + m : m; // (or alternatively) m = String(m).padStart(2, '0')
      return h + ":" + m;
    },
    edit() {
      this.editing = !this.editing;
    },
    async updateSlot(){ //Object.is(ob1, ob2) -> true if equal, false if not
      console.log("I am being called! YAYAYYAYAYAY");
      if (this.currModule !== this.moduleInEdit){
        await this.$store.dispatch('addModule', this.moduleInEdit);
      }
      console.log(this.currSlot, this.slotInEdit, !Object.is(this.currSlot, this.slotInEdit), this.currSlot !== this.slotInEdit);
      if (this.currSlot !== this.slotInEdit){
        console.log("Not same")
      const newSlot = {
            moduleID: this.moduleInEdit.moduleID,
            title: this.slotInEdit.title,
            startTime: this.slotInEdit.startTime,
            length: this.slotInEdit.length,
            day: this.slotInEdit.day,
            id: this.slotInEdit.id
          };
      
          this.$store.dispatch("addSlot", newSlot).then(() => {
            this.edit();
        });
       }else{ 
        this.edit();
      }
    }
  },
  watch: {
    currSlot(){
      const temp_modules = this.$store.getters.getterModules;
      this.temp_module = temp_modules;
      this.slotInEdit = this.currSlot;
      console.log(this.slotInEdit,"Slot")
      console.log(this.currSlot,"Differ");
      if (temp_modules.length != 0) {
        this.currModule = temp_modules.find( mod => mod.id == this.currSlot.modID);
        this.moduleInEdit = this.currModule;
      }
      this.startTimeString = this.convertTime(this.currSlot.startTime);
      this.endTimeString = this.convertTime(this.currSlot.startTime+this.currSlot.length);
    }
  },
  props: {
    currSlot: {
      type: Object,
    },
    time_length: {
      type: Number,
    },
  },
};
</script>

<style>
.dialog_container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.time_d,
.time_i {
  margin: 0.3em 0 0.85em;
}
.mod_inputs {
  width: 20em;
}

.input_box {
  height: 30px;
  width: 20em;
  margin-bottom: 0.5em;
}

.input_box_title {
  height: 30px;
  width: 20em;
  margin-bottom: 0em;
}

.input_box_modname {
  height: 30px;
  width: 16em;
  margin: 0em 0.5em 0.5em 0;
}

.input_box_color {
  height: 30px;
  position: relative;
  width: 3.2em;
  padding: 0 0 0;
  margin: 0px 0px 0px;
  bottom: -5px;
  top: 8px;
}

.input_box_time {
  height: 30px;
  width: 9.523em;
  margin-bottom: 0.5em;
}

.btn {
  height: 54px;
  width: 5rem;
}
</style>