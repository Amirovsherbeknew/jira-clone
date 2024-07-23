<script lang="ts">
import Vue from "vue";
import { getProjects } from "@/services/api";
import Loader from "./Loader.vue";

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
  name: "ProjectsView",
  components: { Loader },
  data(): { projects: IService[] } {
    return {
      projects: [],
    };
  },
  computed: {
    Projects(): IService[] {
      return this.projects || [];
    },
  },
  async created() {
    // @ts-ignore
    this.projects = await getProjects(this.$api);
    // console.log("Projects fetched $api");
  },
});
</script>
<template>
  <div class="projects">
    <Loader
      :condition="$store.getters.getUsers?.length === 0"
      v-if="$store.getters.getUsers?.length === 0"
    />

    <div v-else>
      <h1>Projects</h1>
      <ul class="project-links">
        <li
          v-for="projectItem in Projects"
          :key="projectItem.name"
          class="mt-1"
        >
          <nuxt-link
            :key="projectItem.name"
            :to="'projects/' + projectItem.slug"
            class="items"
            >{{
              projectItem.name[0].toUpperCase() +
              projectItem.name.slice(1).toLowerCase()
            }}</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
.projects {
  font-size: 1rem;
  padding: 2rem 2.5rem;
}
.items {
  font-size: 1.2rem;
}
</style>
