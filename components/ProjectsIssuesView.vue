<script lang="ts">
import Vue from "vue";
import BreadCrumb from "./BreadCrumb.vue";
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
  name: "ProjectsIssuesView",
  components: {
    BreadCrumb,
  },
  data() {
    return {
      projectItems: [] as IServiceItem[],
      name: "" as string,
      title: "" as string,
      loading: true as boolean,
      issues: [] as Issue[],
      issueSearchText: "" as string,
      issueProps: [
        { label: "Type", name: "type", show: true },
        { label: "ID", name: "id", show: true },
        { label: "Summary", name: "summary", show: true },
        { label: "Status", name: "status", show: true },
        { label: "Assignee", name: "assigneeValue", show: true },
        { label: "Due Date", name: "dateTo", show: true },
        { label: "Labels", name: "labels", show: true },
        { label: "Created", name: "dateStart", show: true },
        { label: "Reporter", name: "reporter", show: true },
      ] as { label: string; name: string; show: boolean }[],
    };
  },
  methods: {
    toggleColumn(label: string) {
      const ind = this.issueProps.findIndex((p) => p.label === label);
      // if (prop) {
      //   prop.show = !prop.show;
      // }
      this.issueProps[ind].show = !this.issueProps[ind].show;
    },
  },
  async created() {
    // @ts-ignore
    this.name = this.$route.params.project as string;
    this.issues = await getSpecificIssues(
      // @ts-ignore
      this.$api,
      this.name,
      this.issueSearchText
    );
    this.loading = false;
  },
  watch: {
    issueSearchText: {
      async handler(newSearchText: string) {
        this.issues = await getSpecificIssues(
          // @ts-ignore
          this.$api,
          this.name,
          newSearchText
        );
      },
      immediate: true,
    },
  },
});
</script>
<template>
  <Loader
    :condition="$store.getters.getUsers?.length === 0"
    v-if="$store.getters.getUsers?.length === 0"
  />

  <div class="project" v-else>
    <BreadCrumb />
    <div class="project-issues__header flex items-center justify-between gap-4">
      <h1 class="text-[1.2rem] h-[100%] flex items-center">Issues</h1>
      <a-dropdown
        :trigger="['click']"
        class="issues-filter-dropdown"
        placement="bottomRight"
        overlayClassName="!w-[20rem]"
      >
        <a class="ant-dropdown-link" @click.prevent>
          <span>Click me</span>
          &nbsp;
          <i class="fa-solid fa-angle-down"></i>
        </a>
        <template #overlay>
          <div
            class="!translate-y-[1rem] bg-white rounded-md"
            @click="(e) => e.stopPropagation()"
          >
            <div class="dropdown-header px-4 pt-4">
              <span>Columns</span>
              <div class="mt-2 flex gap-2 items-center">
                <div class="btn btn--dark">My defaults</div>
                <div class="btn btn--light">Filter</div>
              </div>
              <div class="issue-search__wrapper">
                <input
                  type="text"
                  v-model="issueSearchText"
                  placeholder="Search"
                  @click="(e) => e.stopPropagation()"
                />
                <span class="search-logo"
                  ><i class="fa-solid fa-magnifying-glass"></i
                ></span>
              </div>
            </div>
            <a-menu class="!py-4">
              <a-menu-divider />
              <a-menu-item
                v-for="{ show, label } in issueProps"
                :key="label"
                @click="(e) => e.stopPropagation()"
              >
                <input
                  type="checkbox"
                  :checked="show"
                  :id="label"
                  @change="toggleColumn(label)"
                  @click="(e) => e.stopPropagation()"
                />
                <label :for="label" @click="(e) => e.stopPropagation()">{{
                  label
                }}</label>
              </a-menu-item>
            </a-menu>
          </div>
        </template>
      </a-dropdown>
    </div>
    <table class="issues-table">
      <thead>
        <tr>
          <template v-for="{ label, show } in issueProps">
            <th v-if="show" v-bind:key="label">
              <span v-if="show">{{ label }}</span>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="issue in issues" :key="issue.id">
          <template v-for="{ label, show, name } in issueProps">
            <td v-if="show" :key="label">
              <span v-if="name === 'summary'">
                <nuxt-link :to="name + '/' + issue.id" class="items">
                  {{ issue[name] }}
                </nuxt-link>
              </span>
              <span v-else-if="name === 'assigneeValue'">
                {{ issue[name]?.join(" ") }}
              </span>
              <span v-else>
                {{ issue[name] }}
              </span>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.project {
  font-size: 1rem;
  padding: 2rem 2.5rem;
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
.issues-filter-dropdown {
  border-radius: 4px;
  background-color: rgb(2, 42, 75);
  padding: 0.3rem 0.5rem;
  color: white;
}
.issue-search__wrapper {
  position: relative;
  margin-top: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  background-color: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.issue-search__wrapper input {
  border: none;
  outline: none;
  width: 100%;
}
.btn {
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
}
.btn--light {
  background-color: white;
  color: rgb(1, 27, 48);
}
.btn--dark {
  background-color: rgb(2, 42, 75);
  color: white;
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
