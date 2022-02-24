<template>
    <div class="clock"> 
        <!--to add : a progress bar-->
        <div v-show="timerOn" class="progress">
            <div class="circle-shape">
                <div class="circle">
                    
                </div>
            </div>
        </div>
        <div class="time">
            <h1 v-if="(timerOn == true) && (studyOrRest == false)">Time to Study</h1>
            <h1 v-else-if="(timerOn == true) && (studyOrRest == true)">Time to Rest</h1>
            <h1 v-if="completed">Well Done</h1>
            <p id="minutes" >{{ minutes }}</p>
            <p>:</p>
            <p id="seconds">{{ seconds }}</p>
        </div>

        <div class="input" v-if="!timerOn">
            <div class="desc">Study Time</div>
            <input type="range" min="1" max="60" v-model="selectStudy" step="1" class="slider" id="studyTime">
            <div class="currSelect">{{ selectStudy }}</div>
            <div class="desc">Rest Time</div>
            <input type="range" min="1" max="15" v-model="selectRest" step="1" class="slider" id="restTime">
            <div class="currSelect">{{ selectRest }}</div>
            <div class="desc">Number of Sessions</div>
            <input type="range" min="1" max="15" v-model="sessions" step="1" class="slider" id="numSessions">
            <div class="currSelect">{{ sessions }}</div>
        </div>

        <button type="submit" v-if="!timerOn" @click="startTimer">Start</button>
        <div class="timerInProgress" v-if="timerOn">
            <div v-if="!timerPaused">
                <button type="submit" :style="{'margin-right': buttonMargin}" @click="pauseTimer">Pause</button></div>
            <div v-else>
                <button  type="submit" :style="{'margin-right': buttonMargin}" @click="resumeTimer">Resume</button></div>
            <button  type="submit" :style="{'margin-right': buttonMargin}" @click="cancelTimer">Cancel</button>
        </div>
    </div>
</template>

<script>

export default {
    name:'Clock',
    data() {
        return {
            studyOrRest: false, //false == study, true == rest
            timerOn: false,
            timerPaused: false,
            completed: false,
            minutes: '00',
            seconds: '00',
            selectStudy: 40,
            selectRest: 10,
            sessions: 3,
            interval: setInterval(0),
        }
    },
    computed:{
        buttonMargin(){
            let margin = '0em';
            if (this.timerOn && !this.timerPaused){
                margin = '.5em';
            }
            return margin;
        },
    },
    methods:{
        runTimer(){
            if (this.seconds == 0){
                    this.seconds = 59;
                    this.minutes--;
                }
                else{
                    this.seconds--;
                }

                if (this.seconds<10){
                    this.seconds = '0'+ this.seconds;
                }

                if (this.seconds == 0 && this.minutes == 0){
                    
                    if (this.studyOrRest == false){
                        this.studyOrRest = true;
                        this.sessions--;
                        if (this.sessions == 0){
                            this.completed = true;
                            this.cancelTimer();
                        }   
                        else{
                            this.startBreak();
                        }
                    }
                    else if (this.studyOrRest == true){
                        this.studyOrRest = false;
                        clearInterval(this.interval);
                        this.startTimer();
                    }
                }
        },
        startTimer(){
            this.minutes = this.selectStudy;
            this.completed = false;
            this.timerOn = true;
            this.interval = setInterval (() => {this.runTimer()}, 1000);
        },
        pauseTimer(){
            this.timerPaused = true;
            clearInterval(this.interval);
        },
        resumeTimer(){
            this.timerPaused = false;
            this.interval = setInterval (() => {this.runTimer()}, 1000);
        },
        cancelTimer(){
            console.log(this.minutes);
            clearInterval(this.interval);
            this.studyOrRest = false;
            this.timerOn = false;
            this.minutes = '00';
            this.seconds = '00';
            this.sessions = 3;
        },
        startBreak(){
            this.minutes = this.selectRest;
            this.runTimer;
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.clock{
    height: 40rem;
    text-align: center;
}

.time{
    display: block;
    font-family: 'Montserrat', sans-serif;
    font-size: 58px;
    font-weight: 300;
    letter-spacing: .1em;
    /* margin-top: 5%; */
}

p{
    display: inline;
}

.desc{
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 300;
    margin-top: 2rem;
}

.slider{
    background: rgb(197, 197, 197);
    width: 60%;
    transition: 0.3s ease;
    margin-top: .5rem;
    opacity: 0.7;
    outline: none;
    -webkit-appearance: none;
    -webkit-transition: .5s;
    transition: opacity .5s;
    border-radius: .2em; 
}

.timerInProgress{
    display: block;
    margin-top: 2rem;
}

.currSelect{
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 300;
}

.numsessions{
    margin-bottom: .5em;
    height: 1.5rem;
    width:20%;
}

button{
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
    border-radius: .2rem;
    font-size: 24px;
    font-weight: 300;
    color: black;
    font-weight:600;
}

.progress{
    transform: translatez(0);
    position: relative;
    width: 20em;
    height: 20em;
    margin-left:-10em;
    margin-top:.5rem;
    margin-bottom: .5rem;
    border-color: whitesmoke;
    border-radius: 50%;
    left:50%;
    right:50%
}

</style>