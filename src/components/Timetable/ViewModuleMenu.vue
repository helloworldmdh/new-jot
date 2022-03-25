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
      <div class="info">
        <div class="time_i">{{title}}</div>
        <div class="time_i">{{mod_name}}</div>
        <div class="time_i">{{fulltime}}</div>
        <div class="time_i">{{day}}</div>
        <div class="time_i">{{lecturer}}</div>
      </div>
    </div>
  </base-dialog>
</template>

<script>

export default {
  name: 'ViewModuleMenu',
  data(){
    return{
      fulltime: "___-___",
      lecturer: "________"
    };
  },
  props: {
    mod_name: {
      type: String,
    },
    title: {
      type: String,
    },
    sTime: {
      type: String,
    },
    day: {
      type: String,
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

</style>