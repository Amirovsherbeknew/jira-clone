<script lang="ts">
import Vue from "vue";
import db from "../../../data.json";
import BreadCrumb from "../../../components/BreadCrumb.vue";

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
  components: {
    BreadCrumb,
  },
  data() {
    return {
      projectItems: [] as IServiceItem[],
      name: "" as string,
      title: "" as string,
    };
  },
  created() {
    this.name = this.$route.params.project as string;
  },
  mounted() {
    const service = db.services.find(
      (service: IService) => service.slug === this.name
    );
    if (service) {
      this.title = service.name;
      this.projectItems = service.serviceItems;
    }
  },
});
</script>
<template>
  <div class="project">
    <BreadCrumb />
    <h1>Project: {{ title }}</h1>
    <ul>
      <li v-for="item in projectItems" :key="item.slug">
        <nuxt-link :to="`${name}/${item.slug}`" class="items">{{
          item.title
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.project {
  font-size: 1rem;
}
.items {
  font-size: 1.2rem;
}
</style>
