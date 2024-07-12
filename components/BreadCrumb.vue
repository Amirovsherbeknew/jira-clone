<script lang="ts">
import Vue from "vue";
import findName from "../utils/traverseObj";
import db from "../data.json";
export default Vue.extend({
  data() {
    return {
      links: [],
    };
  },
  mounted() {
    const arr = this.$route.path.split("/");
    let temp: string = "";
    for (const item of arr) {
      if (temp === "") temp += "/";
      else temp += item + "/";
      const findWord = findName(
        db,
        item
          .split("")
          .filter((char) => char !== "/")
          .join("")
      );
      // console.log(
      //   item
      //     .split("")
      //     .filter((char) => char !== "/")
      //     .join(""),
      //   findWord
      // );

      this.links.push([temp.slice(0, -1), findWord]);
    }
    this.links = [["/projects", "Projects"], ...this.links.slice(2)];
    // console.log("breadcrumb", this.links);
  },
});
</script>
<template>
  <div>
    <a-breadcrumb style="padding: 1rem 0">
      <a-breadcrumb-item v-for="link in links" :key="link[0]">
        <nuxt-link :to="link[0]" class="breadcrumb-link">{{
          link[1]
        }}</nuxt-link></a-breadcrumb-item
      >
    </a-breadcrumb>
  </div>
</template>
<style scoped>
.breadcrumb-link {
  color: blue;
  font-size: 1rem;
}
</style>
