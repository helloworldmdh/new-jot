<template>
  <base-dialog
    :title="slotInEdit.title"
    :colour="currSlot.colour"
    @close="close"
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
        <div class="time_i">{{ changeDay(currSlot.day) }}</div>
        <div class="time_i">{{ currModule.lecturer }}</div>
        <box-icon class="delete_style" name='trash' size="md" :color="computedAccentColour" animation="tada-hover" @click="deleteSlot"></box-icon>
      </div>
      <div class="mod_inputs" v-else-if="editing">
        <div class="mod_inputs">
          <input
            type="text"
            class="input_box_title"
            v-model.trim="slotInEdit.title"
            required
          /><br />
          <select class="input_box_modname" v-model="moduleInEdit.name" id="modnames">
            <option v-for="mod in temp_module" :key="mod" :value="mod.name">{{ mod.name }}</option>
          </select>
          <input
            type="color"
            class="input_box_color"
            v-model="moduleInEdit.colour"
            disabled
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
          <select class="input_box" v-model="slotInEdit.day" required>
            <option v-for="(d, index) in days" :key="d" :value="index" :selected="d == changeDay(slotInEdit.day)">
              {{ d }}
            </option>
            </select
          ><br />
          <input
            type="text"
            class="input_box"
            v-model.trim="moduleInEdit.lecturer"
            required disabled
          /><br />
        </div>
      </div>
    </div>

    <template #actions v-if="!editing">
      <box-icon class="icon_style" name='pencil' size="md" :color="computedAccentColour" animation="tada-hover" @click="edit"></box-icon>
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
  emits: ['deleteSlot', 'closeModuleMenu'],
  computed: {
    formatTime() {
      let fulltime = "";
      let startTime = this.convertTime(this.currSlot.startTime);
      let endTime = this.convertTime(this.currSlot.startTime + this.currSlot.length);
      fulltime = startTime + " - " + endTime;
      return fulltime;
    },
    computedAccentColour() {
      // Counting the perceptive luminance - human eye favors green color...
      if (this.currSlot.colour.length != 7) return "#646464"
      var luminance = (0.299 * this.hexToRgb(this.currSlot.colour).r + 0.587 * this.hexToRgb(this.currSlot.colour).g + 0.114 * this.hexToRgb(this.currSlot.colour).b)/255;
      if (luminance < 0.5)
        return "#ffffff"
      else
        return "#000000"
    },
  },
  methods: {
    changeDay(d) {
      var day_name = "";
      switch (d) {
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
    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
    async updateSlot(){ //Object.is(ob1, ob2) -> true if equal, false if not
      console.log("I am being called! YAYAYYAYAYAY");
      //await this.$store.dispatch('addModule', this.moduleInEdit);
      if (this.moduleInEdit.name != this.currModule.name){
          //delete old timeslot in old module
          this.deleteSlot();

          //add new timeslot in new module
          this.moduleInEdit.id = this.temp_module.find( mod => mod.name == this.moduleInEdit.name).id;
          //do not change colour or lecturer
      }
      
      console.log(this.currModule, this.moduleInEdit);
      console.log(this.currSlot, this.slotInEdit)
      
      const newSlot = {
        moduleID: this.moduleInEdit.id,
        title: this.slotInEdit.title,
        startTime: this.slotInEdit.startTime,
        length: this.slotInEdit.length,
        day: this.slotInEdit.day,
        id: this.currSlot.id
      };
      
      this.$store.dispatch("addSlot", newSlot).then(() => {
        this.edit();
        this.close();
      });
    },
    async deleteSlot(){
      await this.$store.dispatch('deleteTimeSlot', {
        moduleID: this.currSlot.modID,
        timeslotID: this.currSlot.id,
      });
      this.close();
    },
    close() {
      this.$emit('closeModuleMenu');
      this.editing = false;
      this.slotSelect = false;
    }
  },
  watch: {
    selected(){
      const temp_modules = this.$store.getters.getterModules;
      this.temp_module = temp_modules;
      this.slotInEdit = JSON.parse(JSON.stringify(this.currSlot));

      console.log(this.slotInEdit,"Slot")
      console.log(this.currSlot,"Differ");
      if (temp_modules.length != 0) {
        this.currModule = temp_modules.find( mod => mod.id == this.currSlot.modID);
        this.moduleInEdit = JSON.parse(JSON.stringify(this.currModule))
      }
      this.startTimeString = this.convertTime(this.currSlot.startTime);
      this.endTimeString = this.convertTime(this.currSlot.startTime+this.currSlot.length);
    },
    startTimeString(string) {
      const splitTimeString = string.split(":");
      this.slotInEdit.startTime =
        +splitTimeString[0] * 60 + +splitTimeString[1];
    },
    endTimeString(string) {
      const splitTimeString = string.split(":");
      this.slotInEdit.length =
        +splitTimeString[0] * 60 +
        +splitTimeString[1] -
        this.slotInEdit.startTime;
    },
  },
  props: {
    currSlot: {
      type: Object,
    },
    selected:{
      type: Boolean,
    }
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

.icon_style{
  position: absolute;
  width: 3rem;
  right: 1rem;
  top: 1rem;
}

.delete_style{
  position: absolute;
  width: 3rem;
  right: 4rem;
  top: 1rem;
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