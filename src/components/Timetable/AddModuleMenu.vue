<template>
  <base-dialog title="Create a Timeslot">
    <div class="dialog_container" ref="dialog_container">
      <div class="labels">
        <div class="label_details">Title</div>
        <div class="label_details">Module</div>
        <div class="label_details">Time</div>
        <div class="label_details">Day</div>
        <div class="label_details">Lecturer</div>
      </div>
      <div class="mod_inputs">
        <input
          type="text"
          class="input_box_title"
          v-model.trim="newTimeSlot.title"
          required
        /><br />

        <input
          type="text"
          class="input_box_modname"
          v-model.trim="modName"
          list="modnames"
          required
        />
        <datalist id="modnames">
          <option v-for="mod in existingModules" :key="mod">
            {{ mod.name }}
          </option>
        </datalist>

        <input
          :disabled="colourDisabled"
          type="color"
          class="input_box_color"
          v-model="newModule.colour"
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
        <select class="input_box" v-model="newTimeSlot.day">
          <option v-for="(d, index) in days" :key="d" :value="index">
            {{ d }}
          </option></select
        ><br />
        <input
          :disabled="colourDisabled"
          type="text"
          class="input_box"
          v-model.trim="newModule.lecturer"
        /><br />
      </div>
    </div>
    <template #actions>
      <button class="btn btn-primary m-3" @click="submit">Submit</button>
    </template>
  </base-dialog>
</template>

<script>
export default {
  name: "AddModuleMenu",
  data() {
    return {
      colourDisabled: false,
      newTimeSlot: {
        title: "",
        mod: "",
        day: 0,
        startTime: null,
        length: null,
      },
      startTimeString: "",
      endTimeString: "",
      modName: "",
      newModule: {
        name: "",
        colour: "#33CDFF",
        lecturer: "",
      },
      existingModules: [],
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
  emits: ["updateTable"],
  watch: {
    startTimeString(string) {
      const splitTimeString = string.split(":");
      this.newTimeSlot.startTime =
        +splitTimeString[0] * 60 + +splitTimeString[1];
    },
    endTimeString(string) {
      const splitTimeString = string.split(":");
      this.newTimeSlot.length =
        +splitTimeString[0] * 60 +
        +splitTimeString[1] -
        this.newTimeSlot.startTime;
    },
    modName(name) {
      if (this.existingModules) {
        const mod = this.existingModules.find((mod) => mod.name == name);
        if (mod) {
          this.colourDisabled = true;
          this.newModule.colour = mod.colour
          this.newModule.lecturer = mod.lecturer
        } else {
          this.colourDisabled = false;
        }
      }
      this.newModule.name = name;
      this.newTimeSlot.mod = name;
    },
  },
  async mounted() {
    await this.$store.dispatch("getModulesFromServer");
    let temp = this.$store.getters.getterModules;
    if (!temp) this.existingModules = [];
    else this.existingModules = temp;
  },
  methods: {
    close() {
      this.$emit("updateTable");
    },

    validateMenu() {
      if (!this.newTimeSlot.title.trim()) {
        alert('Please give the timeslot a name!');
        return false;
      }
      if (!this.newTimeSlot.mod.trim()) {
        alert('Please give the module name!');
        return false;
      }
      if (!this.newTimeSlot.startTime) {
        alert('Please enter the time when your module starts!');
        return false;
      }
      if (!this.newTimeSlot.length || this.newTimeSlot.length <= 0) {
        alert('Please enter a valid finishing time!');
        return false;
      }
      if (this.newModule.lecturer == "" || this.newModule.lecturer.length < 0) {
        alert('please enter a valid lecturer name!');
        return false;
      }
      return true;
    },

    clearMenu() {
      this.modName = "";
      this.newTimeSlot = {
        title: "",
        mod: "",
        day: null,
        startTime: null,
        length: null,
      };
      this.startTimeString = "";
      this.endTimeString = "";
      this.modName = "";
      this.newModule = {
        name: "",
        colour: "#33CDFF",
        lecturer: "",
      };
    },

    submit() {
      if (!this.validateMenu()) return;

      let loader = this.$loading.show({
        loader: 'dots',
        container: this.$refs["dialog_container"],
        canCancel: false,
      })
      this.$store.dispatch('getModulesFromServer').then(async () => {
        
        const payload = {
          moduleName: this.newModule.name,
          colour: this.newModule.colour,
          lecturer: this.newModule.lecturer,
        };
        
        if (this.existingModules) {
          var exists = !!this.existingModules.find(
            (mod) => mod.name == this.newModule.name
          );
          if (!exists) {
            await this.$store.dispatch('addModule', payload);
          }
        } else {
          await this.$store.dispatch('addModule', payload);
        }

        this.$store.dispatch('getModulesFromServer').then(() => {
          const payload = {
            moduleID: this.$store.getters.getterModules.find((mod) => mod.name == this.newTimeSlot.mod).id,
            title: this.newTimeSlot.title,
            startTime: this.newTimeSlot.startTime,
            length: this.newTimeSlot.length,
            day: this.newTimeSlot.day,
          };
          
          this.$store.dispatch("addSlot", payload).then(() => {
            loader.hide();
            this.close();
            this.clearMenu();
          });
        });
      }).catch((error) => {
        loader.hide();
        console.log(error.message);
      });
    },


    
  },
};
</script>

<style scoped>
.dialog_container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.labels {
  width: 4em;
}

.label_details {
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
