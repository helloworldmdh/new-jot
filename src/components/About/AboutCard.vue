<template>
   <div class="about_box">
        <h3 class="about_title" @click="this.isInactive = !this.isInactive;"> {{ title }} <box-icon name='chevron-down' class="about_icon"></box-icon></h3>
        <div class="about_subtitle" :style="{'height': hideContent}">
            <ul class="about_features">
                <li class="about_feature" v-for="(item, index) in list" :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
export default {
    name:'AboutCard',
    props:{
        title: String,
        list: Array,
    },
    data(){
        return{
            isInactive: true,
        }
    },
    computed:{
        hideContent(){
            if (this.isInactive){
                return `0rem`;
            }
            else{
                return `18rem`;
            }
        },
    }
}
</script>

<style>

</style>