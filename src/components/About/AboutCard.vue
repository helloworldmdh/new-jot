<template>
   <div class="about_box">
        <h3 class="about_title"> {{ title }} </h3>
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
}
</script>

<style>

</style>