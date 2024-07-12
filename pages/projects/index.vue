<script lang="ts">
import Vue from "vue";
import db from "../../data.json";

interface IServiceItem {
  name: string;
  title: string;
  slug: string;
}

interface IService {
  name: string;
  slug: string;
  serviceItems: IServiceItem[];
}

export default Vue.extend({
  data(): { projects: IService[] } {
    return {
      projects: [],
    };
  },
  mounted() {
    this.projects = db.services;
  },
});
</script>
<template>
  <div class="projects">
    <p v-if="projects.length === 0">Loading...</p>
    <div v-else>
      <h1>Projects</h1>
      <ul class="project-links">
        <li
          v-for="projectItem in projects"
          :key="projectItem.name"
          class="mt-1"
        >
          <nuxt-link
            :key="projectItem.name"
            :to="'projects/' + projectItem.slug"
            class="items"
            >{{ projectItem.name }}</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
.projects {
  font-size: 1rem;
}
.items {
  font-size: 1.2rem;
}
</style>
