<script lang="ts">
import Vue from "vue";
const Content = Vue.extend({
  name: "Content",
  computed: {
    openSidebar(): boolean {
      return this.$store.state.openSidebar;
    },
  },
});
export default Content;
</script>
<template>
  <div
    class="content"
    v-bind:class="{ contentLeft: !openSidebar, contentRight: openSidebar }"
  >
    <Nuxt />
  </div>
</template>
<style scoped>
.content {
  position: relative;
  height: 91.5vh;
  height: 91.5vh;
  color: black;
  transition-duration: 0.4s;
  transform: translateX(0);
  /* padding: 2rem 2.5rem; */
  background-color: lightgreen;
}
.contentRight {
  margin-left: 15vw;
  width: 85%;
}
.contentLeft {
  margin-left: 1.5vw;
  width: 100%;
}
</style>
