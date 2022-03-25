<template>
  <div class="timer_page">
    <div class="header">Timer</div>
    <div class="total_time">
      Total time studied: {{ totalTime }} minutes
    </div>
    <div class="clock">
      <div v-show="timerOn" class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: widthProgress }"
          aria-valuenow="currProgress"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div class="time">
        <h1 v-if="timerOn == true && studyOrRest == false">Time to Study</h1>
        <h1 v-else-if="timerOn == true && studyOrRest == true">Time to Rest</h1>
        <h1 v-if="completed">Well Done</h1>
        <p id="minutes">{{ minutes }}</p>
        <p>:</p>
        <p id="seconds">{{ seconds }}</p>
      </div>

      <div class="input" v-if="!timerOn">
        <div class="desc">Study Time</div>
        <input
          type="range"
          min="5"
          max="60"
          v-model="selectStudy"
          step="5"
          class="slider"
          id="studyTime"
        />
        <div class="currSelect">{{ selectStudy }} minutes</div>
        <div class="desc">Rest Time</div>
        <input
          type="range"
          min="1"
          max="15"
          v-model="selectRest"
          step="1"
          class="slider"
          id="restTime"
        />
        <div class="currSelect">{{ selectRest }} minutes</div>
        <div class="desc">Number of Sessions</div>
        <input
          type="range"
          min="1"
          max="10"
          v-model="sessions"
          step="1"
          class="slider"
          id="numSessions"
        />
        <div class="currSelect">{{ sessions }}</div>
      </div>

      <button type="submit" v-if="!timerOn" @click="startTimer">Start</button>
      <div class="timerInProgress" v-if="timerOn">
        <div v-if="!timerPaused">
          <button
            type="submit"
            :style="{ 'margin-right': buttonMargin }"
            @click="pauseTimer"
          >
            Pause
          </button>
        </div>
        <div v-else>
          <button
            type="submit"
            :style="{ 'margin-right': buttonMargin }"
            @click="resumeTimer"
          >
            Resume
          </button>
        </div>
        <button
          type="submit"
          :style="{ 'margin-right': buttonMargin }"
          @click="cancelTimer"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import app from "../api/firebase";
import {
  getFunctions,
  httpsCallable
  } from "firebase/functions";
import { getAuth } from "firebase/auth";

export default {
  name: 'Timer',
  data() {
    return {
      studyOrRest: false, //false == study, true == rest
      timerOn: false,
      timerPaused: false,
      completed: false,
      minutes: "00",
      totalseconds: "00",
      totalminutes: "00",
      currSeconds: "00",
      seconds: "00",
      selectStudy: 40,
      selectRest: 10,
      sessions: 3,
      interval: setInterval(0),
      currProgress: 0,
      totalTime: 0,
    };
  },
  computed: {
    buttonMargin() {
      let margin = "0em";
      return margin;
    },
    widthProgress() {
      let p = this.currProgress + "%";
      return p;
    },
  },
  created(){
    this.getTotalTime();
  },
  methods: {
    runTimer() {
      this.currProgress = (this.currSeconds / this.totalseconds) * 100;
      if (this.seconds == 0) {
        this.seconds = 59;
        this.minutes--;
      } else {
        this.currSeconds++;
        this.seconds--;
      }

      if (this.seconds < 10) {
        this.seconds = "0" + this.seconds;
      }

      if (this.seconds == 0 && this.minutes == 0) {
        if (this.studyOrRest == false) {
          this.studyOrRest = true;
          this.sessions--;
          if (this.sessions == 0) {
            this.totalTime = +this.totalTime + +this.totalminutes;
            this.completed = true;
            this.saveNewTime();
            this.cancelTimer();
          } else {
            this.totalTime = +this.totalTime + +this.totalminutes;
            this.saveNewTime();
            this.startBreak();
          }
        } else if (this.studyOrRest == true) {
          this.studyOrRest = false;
          this.currSeconds = 0;
          clearInterval(this.interval);
          this.startTimer();
        }
      }
    },
    startTimer() {
      this.minutes = this.selectStudy;
      this.totalminutes = this.minutes;
      this.totalseconds = this.minutes * 60;
      this.currSeconds = 0;
      this.completed = false;
      this.timerOn = true;
      this.interval = setInterval(() => {
        this.runTimer();
      }, 10);
    },
    pauseTimer() {
      this.timerPaused = true;
      clearInterval(this.interval);
    },
    resumeTimer() {
      this.timerPaused = false;
      this.interval = setInterval(() => {
        this.runTimer();
      }, 1000);
    },
    cancelTimer() {
      console.log(this.minutes);
      clearInterval(this.interval);
      (this.currSeconds = "00"),
        (this.totalseconds = "00"),
        (this.totalminutes = "00"),
        (this.studyOrRest = false);
      this.timerOn = false;
      this.minutes = "00";
      this.seconds = "00";
      this.sessions = 3;
    },
    startBreak() {
      this.minutes = this.selectRest;
      this.totalseconds = this.minutes * 60;
      this.currSeconds = 0;
      this.runTimer;
    },
    getTotalTime() {
       const functions = getFunctions(app);
       const getTotalTime = httpsCallable(functions, "gettotaltime");

      getTotalTime().then((result) => {
         console.log(result);
         if (result.data === "No data in database") {
           return;
         } else {
           console.log(result.data);
           this.totalTime = result.data.data;
         }
       });
     },
     saveNewTime() {
      const functions = getFunctions(app);
      const auth = getAuth(app);
      const saveNewTime = httpsCallable(functions, "saveNewTime");
      // eslint-disable-next-line no-unused-vars
      const uid = auth.currentUser.uid;
      //const timeStudied = this.getTotalTime();
      if (!uid) return;

      saveNewTime({
        timeStudied: this.totalTime,
        uid: uid,
      }).then((result) => {
        console.log(result);
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.timer_page{
  height: 90vh;
}

.header {
  font-size: 64px;
  font-weight: 300;
  text-align: center;
}
.clock {
  height: 20vh;
  text-align: center;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0.9em;
  height: 0.9em;
  background: white;
  cursor: pointer;
  border-radius: 50%;
}

.time {
  display: block;
  font-family: "Montserrat", sans-serif;
  font-size: 58px;
  font-weight: 300;
  letter-spacing: 0.1em;
  padding: 5vh 0 2vh 0;
}

p {
  display: inline;
}

.desc {
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 300;
  margin-top: 2rem;
}

.slider {
  background: rgb(197, 197, 197);
  width: 60%;
  transition: 0.3s ease;
  margin-top: 0.5rem;
  opacity: 0.7;
  outline: none;
  -webkit-appearance: none;
  -webkit-transition: 0.5s;
  transition: opacity 0.5s;
  border-radius: 0.2em;
}

.timerInProgress {
  display: block;
  margin-top: 2rem;
}

.currSelect {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 300;
}

.numsessions {
  margin-bottom: 0.5em;
  height: 1.5rem;
  width: 20%;
}

button {
  display: inline;
  width: 15%;
  height: 60px;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 0;
  overflow: hidden;
  position: relative;
  transform: translatez(0);
  text-decoration: none;
  box-sizing: border-box;
  border-radius: 0.2rem;
  font-size: 24px;
  font-weight: 300;
  color: black;
  font-weight: 600;
}

.progress {
  position: relative;
  width: 40em;
  height: 2em;
  margin-left: -20em;
  margin-top: 3rem;
  margin-bottom: 4rem;
  left: 50%;
  right: 50%;
}

.progress-bar {
  background: rgb(160, 158, 158);
}
</style>