<template>
  <base-dialog title="Selected Timeslot" @close="editing = false">
    <div class="dialog_container">
      <div class="detail_labels">
        <div class="time_d">Title</div>
        <div class="time_d">Module</div>
        <div class="time_d">Time</div>
        <div class="time_d">Day</div>
        <div class="time_d">Lecturer</div>
      </div>
      <div class="info" v-if="!editing">
        <div class="time_i">{{ slot_title }}</div>
        <div class="time_i">{{ mod_name }}</div>
        <div class="time_i">{{ formatTime }}</div>
        <div class="time_i">{{ changeDay }}</div>
        <div class="time_i">{{ lecturer }}</div>
      </div>
      <div class="mod_inputs" v-else>
        <div class="mod_inputs">
          <input
            type="text"
            class="input_box_title"
            v-model.trim="slotInEdit.slot_title"
            required
          /><br>

          <input
            type="text"
            class="input_box_modname"
            v-model.trim="slotInEdit.mod_name"
            required
          />
        <!--<datalist id="modnames">
					<option v-for="mod in existingModules" :key="mod"> {{ slotInEdit.name }}</option>
				</datalist>-->

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
          <select class="input_box" v-model="slotInEdit.day" :value="slotInEdit.day" required>
            <option v-for="d in days" :key="d">
              {{ d }}
            </option></select
          ><br />
          <input
            type="text"
            class="input_box"
            v-model.trim="slotInEdit.lecturer"
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
    </template>
  </base-dialog>
</template>

<script>
export default {
  name: "ViewModuleMenu",
  data() {
    return {
      editing: false,
      lecturer: "________",
      startTimeString: "",
      endTimeString: "",
      slotInEdit: {
        slot_title: this.slot_title,
        mod: this.mod_name,
        day: this.day,
        startTime: this.startTime,
        length: this.time_length,
        colour: "#47C6FF",
        lecturer: "",
      },
      currModule: {
      },
      tempModule: {},
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
  created() {
      const temp_modules = this.$store.getters.getterModules;
      if (temp_modules.length !== 0) {
        this.currModule = temp_modules.find(({ id }) => id == this.mod_name);
        this.tempModule = this.currModule;
      }
  },
  computed: {
    changeDay() {
      var day_name = "";
      switch (this.day) {
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
      }
      return day_name;
    },
    formatTime() {
      let fulltime = "";
      let startTime = this.convertTime(this.sTime);
      let endTime = this.convertTime(this.sTime + this.time_length);
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
    // splitStartTimeString(string) {
    //   if (string != null){
    //   const splitTimeString = string.split(":");
    //   this.slotInEdit.startTime =
    //     +splitTimeString[0] * 60 + +splitTimeString[1];
    //   }
    // },
    // convertEndTimeString(string) {
    //   if (string != null){
    //   const splitTimeString = string.split(":");
    //   this.slotInEdit.length =
    //     +splitTimeString[0] * 60 +
    //     +splitTimeString[1] -
    //     this.slotInEdit.startTime;
    //   }
    // },
    // submit(){
    //   this.$store.dispatch('getModulesFromServer').then(async () => {
    //     const payload = {
    //       moduleName: this.newModule.name,
    //       colour: this.newModule.colour,
    //       lecturer: this.newModule.lecturer,
    //     };

    //     if (this.existingModules) {
    //       var exists = !!this.existingModules.find(
    //         (mod) => mod.name == this.newModule.name
    //       );
    //       if (!exists) {
    //         await this.$store.dispatch('addModule', payload);
    //       }
    //     } else {
    //       await this.$store.dispatch('updateModule', payload);
    //     }
    //     this.$store.dispatch('getModulesFromServer').then(() => {
    //       const payload = {
    //         moduleID: this.$store.getters.getterModules.find((mod) => mod.name == this.newTimeSlot.mod).id,
    //         title: this.newTimeSlot.title,
    //         startTime: this.newTimeSlot.startTime,
    //         length: this.newTimeSlot.length,
    //         day: this.newTimeSlot.day,
    //       };

    //       this.$store.dispatch("updateTimeslot", payload).then(() => {
    //         this.close();
    //         this.clearMenu();
    //       });
    //     });

    //   });
    // },
  },
  props: {
    mod_name: {
      type: String,
    },
    slot_title: {
      type: String,
    },
    sTime: {
      type: Number,
    },
    day: {
      type: Number,
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