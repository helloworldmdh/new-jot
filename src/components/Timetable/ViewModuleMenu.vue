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
        <div class="time_i">{{formatTime}}</div>
        <div class="time_i">{{changeDay}}</div>
        <div class="time_i">{{lecturer}}</div>
      </div>
      <div class="mod_inputs" else>
				<!-- <div class="mod_inputs">
				<input type="text" class="input_box_title" v-model.trim="slotInEdit.title" required/><br>

				<input type="text" class="input_box_modname" v-model.trim="modName" list="modnames required"/>
				<datalist id="modnames">
					<option v-for="mod in existingModules" :key="mod"> {{ slotInEdit.name }}</option>
				</datalist>
				
				<input :disabled="colourDisabled" type="color" class="input_box_color" v-model="slotInEdit.colour"/><br>
				<input type="time" class="input_box_time" v-model="startTimeString" required/> - <input type="time" class="input_box_time" v-model="endTimeString" required/><br>
				<select class="input_box" v-model="slotInEdit.day">
					<option v-for="(d, index) in days" :key="d" :value="index"> {{ d }}</option>
				</select><br>
				<input :disabled="colourDisabled" type="text" class="input_box" v-model.trim="slotInEdit.lecturer"/><br>
			</div> -->
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
      lecturer: "________",
      // slotInEdit:{
      //   title: "",
			// 	mod: "",
			// 	day: null,
			// 	startTime: null,
			// 	length: "",
			// 	colour: this.colour,
			// 	lecturer: this.lecturer,
      // },
    };
  },
  computed:{
    changeDay(){
      var day_name ="";
      switch(this.day){
        case(0): day_name = "Monday";
        break;
        case(1): day_name = "Tuesday";
        break;
        case(2): day_name = "Wednesday";
         break;
        case(3): day_name = "Thursday";
         break;
        case(4): day_name = "Friday";
         break;
        case(5): day_name = "Saturday";
         break;
        case(6): day_name = "Sunday";
      }
      return day_name;
    },
    formatTime(){
      let fulltime = "";
      let startTime = this.convertTime(this.sTime);
      let endTime = this.convertTime((this.sTime+this.time_length));
      fulltime = startTime+" - "+endTime;
      return fulltime;
    }
  },
  methods:{
    convertTime(mins){
      let h = Math.floor(mins / 60);
      let m = mins % 60;
      h = h < 10 ? '0' + h : h; // (or alternatively) h = String(h).padStart(2, '0')
      m = m < 10 ? '0' + m : m; // (or alternatively) m = String(m).padStart(2, '0')
      return h+":"+m;
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