<template>
  <base-dialog title="Selected Timeslot">
    <div class="dialog_container">
      <div class="detail_labels">
        <div class="time_d">Title</div>
        <div class="time_d">Module</div>
        <div class="time_d">Time</div>
        <div class="time_d">Day</div>
        <div class="time_d">Lecturer</div>
      </div>
      <div class="info" v-if="!editing">
        <div class="time_i">{{title}}</div>
        <div class="time_i">{{mod_name}}</div>
        <div class="time_i">{{fulltime}}</div>
        <div class="time_i">{{day_name}}</div>
        <div class="time_i">{{lecturer}}</div>
      </div>
      <div class="mod_inputs" else>
				<div class="mod_inputs">
				<!--<input type="text" class="input_box_title" v-model.trim="newTimeSlot.title" required/><br>

				<input type="text" class="input_box_modname" v-model.trim="modName" list="modnames required"/>
				<datalist id="modnames">
					<option v-for="mod in existingModules" :key="mod"> {{ mod.name }}</option>
				</datalist>
				
				<input :disabled="colourDisabled" type="color" class="input_box_color" v-model="newModule.colour"/><br>
				<input type="time" class="input_box_time" v-model="startTimeString" required/> - <input type="time" class="input_box_time" v-model="endTimeString" required/><br>
				<select class="input_box" v-model="newTimeSlot.day">
					<option v-for="(d, index) in days" :key="d" :value="index"> {{ d }}</option>
				</select><br>
				<input :disabled="colourDisabled" type="text" class="input_box" v-model.trim="newModule.lecturer"/><br> -->
			</div>
			</div>
    </div>

    <template #actions>
			<button class="btn btn-primary m-3" @click="edit">Edit</button>
		</template>

  </base-dialog>
</template>

<script>

export default {
  name: 'ViewModuleMenu',
  data(){
    return{
      editing: false,
      fulltime: "___-___",
      lecturer: "________",
      day_name: "",
    };
  },
  methods:{
    changeDay(){
      switch(this.day){
        case(0): return this.day_name = "Monday";
        case(1): return this.day_name = "Tuesday";
      }
    }
  },
  props: {
    mod_name: {
      type: String,
    },
    title: {
      type: String,
    },
    sTime: {
      type: Number,
    },
    day: {
      type: Number,
    },
    time_length:{
      type: Number,
    }
  },
}
</script>

<style>
.dialog_container{
	display: grid;
	grid-template-columns: 1fr 2fr;
}

.btn{
	height: 54px;
  width: 5rem;
 }
</style>