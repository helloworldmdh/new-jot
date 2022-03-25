<template>
  <base-dialog title="Create a Timeslot">
		<div class="dialog_container">
			<div class="labels">
				<div class="label_details">Title </div>
				<div class="label_details">Module </div>
				<div class="label_details">Time </div>
				<div class="label_details">Day </div>
				<div class="label_details">Lecturer </div>
			</div>
			<div class="mod_inputs">
				<input type="text" class="input_box_title" v-model.trim="newTimeSlot.title" required/><br>

				<input type="text" class="input_box_modname" v-model.trim="modName" list="modnames required"/>
				<datalist id="modnames">
					<option v-for="mod in existingModules" :key="mod"> {{ mod.name }}</option>
				</datalist>
				
				<input :disabled="colourDisabled" type="color" class="input_box_color" v-model="newModule.colour"/><br>
				<input type="time" class="input_box_time" v-model="startTimeString" required/> - <input type="time" class="input_box_time" v-model="endTimeString" required/><br>
				<select class="input_box" v-model="newTimeSlot.day">
					<option v-for="(d, index) in days" :key="d" :value="index"> {{ d }}</option>
				</select><br>
				<input :disabled="colourDisabled" type="text" class="input_box" v-model.trim="newModule.lecturer"/><br>
			</div>
		</div>
		<template #actions>
			<button class="btn btn-primary m-3" @click="submit">Submit</button>
		</template>
  </base-dialog>
</template>

<script>
import app from "../../api/firebase"
import { getFunctions, httpsCallable } from "firebase/functions";
// import { getAuth } from 'firebase/auth';
export default ({
	
    name: 'AddModuleMenu',
	data() {
		return {
			colourDisabled: false,
			newTimeSlot: {
				title: "",
				mod: "",
				day: null,
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
			valid: {
				title: "pending",
				module: "pending",
				time: "pending",
				lecturer: "pending",
				location: "pending",
			},
		}
	},
	emits: ['updateTable'],
	watch: {
		startTimeString(string) {
			const splitTimeString = string.split(':');
			this.newTimeSlot.startTime = +splitTimeString[0] * 60 + +splitTimeString[1]
		},
		endTimeString(string) {
			const splitTimeString = string.split(':');
			this.newTimeSlot.length = (+splitTimeString[0] * 60 + +splitTimeString[1]) - this.newTimeSlot.startTime;
		},
		modName(name) {
			if (name == "")
				this.valid.module = "invalid"
			if (this.existingModules) {
				if (this.existingModules.find((mod) => mod.name == name)) {
					this.colourDisabled = true;
				} else {
					this.colourDisabled = false;
				}
			}
			this.newModule.name = name;
			this.newTimeSlot.mod = name;
		},
		valid(data) {
			if (data.name){
				return
			}
		}
	},
	mounted() {
		this.getModules();
	},
	methods: {
		close() {
			this.$emit('updateTable');
		},
		async getTimeSlots() {
			const functions = getFunctions(app);
			const getTimeslots = httpsCallable(functions, 'getTimeslots')
			await getTimeslots().then((result) => {
				this.timeSlots = result.data.data;
			})
		},

		validateMenu() {
			
		},
		
		clearMenu() {
			this.modName = "";
			this. newTimeSlot = {
				title: "",
				mod: "",
				day: null,
				startTime: null,
				length: null,
			};
			this.startTimeString= "";
			this.endTimeString= "";
			this.modName = "";
			this.newModule= {
				name: "",
				colour: "#33CDFF",
				lecturer: "",
			};
		
		},

		submit() {

			this.validateMenu()

			// TODO: Verify input fields are correct before doing \/ \/ \/
			this.getModules().then(() => {
				if (this.existingModules) {
					var exists = !!this.existingModules.find(mod => mod.name == this.newModule.name);
					if (!exists) {
						this.addModule();
					}
				} else {
					this.addModule();
				}
				
				this.addSlot().then(() => {
					this.close();
					this.clearMenu();
				})
				
			})
			

		},
		async getModules() {
			const functions = getFunctions(app);
			const getModules = httpsCallable(functions, 'getModules')
			await getModules().then((result) => {
				this.existingModules = result.data.data;
			})
		},

		addModule() {
			const functions = getFunctions(app);
			const addModule = httpsCallable(functions, 'addModule');
			addModule(this.newModule).then((result) => {
				// Read result of the Cloud Function.
				// /** @type {any} */
				console.log(result);
			}).catch((error) => {
				console.log(error);
			});
		},

		async addSlot() {
			const functions = getFunctions(app);
			const addTimeslot = httpsCallable(functions, 'addTimeslot');
			await addTimeslot(this.newTimeSlot).then((result) => {
				// Read result of the Cloud Function.
				// /** @type {any} */
				console.log(result);
				this.close();
			}).catch((error) => {
				console.log(error);
			});
		},
	},
})
</script>

<style scoped>
.dialog_container{
	display: grid;
	grid-template-columns: 1fr 2fr;
}

.labels{
	width: 4em;
}

.label_details{
	margin: 0.3em 0 0.85em;
}
.mod_inputs{
	width: 20em;
}

.input_box{
	height: 30px;
	width: 20em;
	margin-bottom: 0.5em;
}

.input_box_title{
	height: 30px;
	width: 20em;
	margin-bottom: 0em;
}

.input_box_modname{
	height: 30px;
	width: 16em;
	margin: 0em 0.5em 0.5em 0;
}

.input_box_color{
	height: 30px;
	position: relative;
	width: 3.2em;
	padding: 0 0 0;
	margin: 0px 0px 0px;
	bottom: -5px;
	top: 8px;
}

.input_box_time{
	height: 30px;
	width: 9.523em;
	margin-bottom: 0.5em;
}
.btn{
	height: 54px;
 }
</style>
