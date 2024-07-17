<script lang="ts">
import Vue from "vue";
import BreadCrumb from "../../../components/BreadCrumb.vue";
import { getSpecificIssues } from "@/services/api";
import { Issue } from "~/types/types";

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
      issues: [] as Issue[],
    };
  },
  created() {
    // @ts-ignore
    this.name = this.$route.params.project as string;
  },
  async mounted() {
    this.issues = await getSpecificIssues(this.name);
    console.log(this.issues);
  },
});
</script>
<template>
  <div class="project">
    <BreadCrumb />
    <h1 class="text-[1.2rem]">Issues</h1>
    <table class="issues-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>ID</th>
          <th>Summary</th>
          <th>Status</th>
          <th>Assignee</th>
          <th>Due Date</th>
          <th>Labels</th>
          <th>Created</th>
          <th>Reporter</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="issue in issues" :key="issue.id">
          <td>{{ issue.type }}</td>
          <td>{{ issue.id }}</td>
          <td>
            <nuxt-link :to="`${name}/${issue.id}`" class="items">{{
              issue.summary
            }}</nuxt-link>
          </td>
          <td>{{ issue.status }}</td>
          <td>{{ issue.assigneeValue.join(" ") }}</td>
          <td>{{ issue.dateTo }}</td>
          <td>{{ issue.labels }}</td>
          <td>{{ issue.dateStart }}</td>
          <td>{{ issue.reporter }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <ul>
      <li v-for="item in issues" :key="item.id">
        <nuxt-link :to="`${name}/${item.id}`" class="items">{{
          item.summary
        }}</nuxt-link>
      </li>
    </ul> -->
  </div>
</template>

<style scoped>
.project {
  font-size: 1rem;
}
.items {
  font-size: 1.2rem;
}
.issues-table {
  max-width: 100%;
  overflow: hidden;
  overflow-y: auto;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  border: 1px solid gray;
}
th,
td {
  padding: 0.5rem;
  border: 1px solid lightgray;
}
table {
  border-radius: 10px;
}
thead tr:first-child th:first-child {
  border-top-left-radius: 10px;
}
thead tr:first-child th:last-child {
  border-top-right-radius: 10px;
}
tbody tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}
tbody tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}
</style>
