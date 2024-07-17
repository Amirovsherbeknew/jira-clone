<!-- <script lang="ts">
import Vue from "vue";
import findName from "../utils/traverseObj";
import db from "../data.json";
export default Vue.extend({
  data() {
    return {
      links: string[],
    };
  },
  mounted() {
    // @ts-ignore
    const arr: string[] = this.$route.path.split("/");
    let temp: string = "";
    for (const item of arr) {
      if (temp === "") temp += "/";
      else temp += item + "/";
      this.links.push(temp);
    }
    console.log(this.links);

    // this.links = [["/projects", "Projects"], ...this.links];
    // console.log("breadcrumb", this.links);
  },
});
</script>
<template>
  <div>
    <a-breadcrumb style="padding: 1rem 0">
      <a-breadcrumb-item v-for="link in links" :key="link">
        <nuxt-link :to="link" class="breadcrumb-link">{{
          link
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
</style> -->

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      links: [] as [string, string][],
    };
  },
  mounted() {
    // @ts-ignore
    const arr: string[] = this.$route.path
      .split("/")
      .filter((item: string) => item !== "");
    let temp: string = "";
    for (const item of arr) {
      temp += `/${item}`;
      this.links.push([item, temp]);
    }
    console.log(this.links);
  },
});
</script>

<template>
  <div>
    <a-breadcrumb style="padding: 1rem 0">
      <a-breadcrumb-item v-for="link in links" :key="link[0]">
        <nuxt-link :to="link[1]" class="breadcrumb-link">{{
          link[0]
        }}</nuxt-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<style scoped>
.breadcrumb-link {
  color: blue;
  font-size: 1rem;
}
</style>
