<script lang="ts">
import { Issue } from "~/types/types";
import { getIssues } from "~/services/api";
import sortByField from "~/utils/sortData";
import AppsOpener from "../assets/icons/AppsOpener.vue";
import Jira from "../assets/icons/Jira.vue";
import Bell from "../assets/icons/Bell.vue";
import IconMapper from "./IconMapper.vue";

export default {
  components: {
    AppsOpener,
    Jira,
    Bell,
    IconMapper,
  },
  data() {
    return {
      isAuthorized: "IA",
      searchInput: "",
      visiably: false,
      issues: [] as Issue[],
      moreIssues: false as boolean,
      // list: []
    };
  },
  async created() {
    try {
      this.issues = await getIssues(this.$api);
      // @ts-ignore
      sortByField<Issue>(this.issues, "updated");
      // console.log("Issue datas has been come");
    } catch (err: TypeError | any | unknown) {
      console.log(err.message);
    }
  },
  computed: {
    issueItems() {
      return this.moreIssues
        ? this.issues
        : this.issues.slice(0, Math.min(this.issues.length, 5));
    },
  },
  methods: {
    handleMoreIssues(e: MouseEvent | Event) {
      this.moreIssues = !this.moreIssues;
    },
  },
  // watch: {
  //  list: {
  //   deep:true,
  //   handler (val) {
  //     console.log(val)
  //   }
  //  }
  // },
  // computed: {
  //   ViewAddUserSelect () {
  //     return this.roleCode === 'azo'
  //   }
  // }
};
</script>
<template>
  <header
    class="px-[0.75rem] py-[0.5rem] text-gray-600 flex justify-between items-center gap-2 border-[gray] border-b-[1px]"
  >
    <div class="flex items-center gap-2">
      <span
        class="apps-opener block rounded-full hover:bg-gray-200 p-[0.125rem] cursor-pointer"
      >
        <AppsOpener />
      </span>
      <span class="logo tabHover font-['Baskervville'] flex items-center gap-2">
        <Jira />
        <span class="logo-title text-[1.3rem] comic text-black font-bold"
          >Jira</span
        >
      </span>
      <nav class="px-4 flex gap-2 text-gray-700 font-[500] text-[0.9rem]">
        <nuxt-link to="/your-work" class="tabHover">
          Your work <i class="fa-solid fa-angle-down text-[0.8rem]"></i>
        </nuxt-link>
        <nuxt-link to="/projects" class="tabHover">
          Projects <i class="fa-solid fa-angle-down text-[0.8rem]"></i>
        </nuxt-link>
        <nuxt-link to="/" class="tabHover">
          <a-dropdown class="rounded-[20px]">
            <a class="ant-dropdown-link" @click.prevent>
              Filters <i class="fa-solid fa-angle-down text-[0.8rem]"></i>
            </a>
            <template #overlay>
              <div class="dropdown-overlay__child" @click.stop>
                <a-menu class="text-black font-semibold">
                  <a-menu-item>Current Search</a-menu-item>
                  <a-menu-item>Search for issues</a-menu-item>
                  <a-menu-divider />
                </a-menu>
                <div class="text-wrapper">
                  <span class="text-[0.8rem] !py-4 text-gray-800 font-semibold"
                    >RECENT ISSUES</span
                  >
                </div>
                <div class="issues-list-wrapper">
                  <a-menu class="text-black font-semibold">
                    <a-menu-item
                      v-for="issue in issueItems"
                      :key="issue.id"
                      class="flex items-center gap-4"
                    >
                      <IconMapper :iconName="issue.type" />
                    </a-menu-item>
                  </a-menu>
                </div>
                <a-menu>
                  <a-menu-item @click="handleMoreIssues">{{
                    moreIssues ? "Hide" : "More..."
                  }}</a-menu-item>
                  <a-menu-divider />
                  <a-menu-item>Input issues from CSV</a-menu-item>
                  <a-menu-divider />
                </a-menu>
                <div class="text-wrapper">
                  <span class="text-[0.8rem] !py-4 text-gray-800 font-semibold"
                    >FILTERS</span
                  >
                </div>
                <a-menu class="text-black font-semibold">
                  <a-menu-item>My open issues</a-menu-item>
                  <a-menu-item>Issues opened by me</a-menu-item>
                  <a-menu-divider />
                  <a-menu-item>Manage filters</a-menu-item>
                </a-menu>
              </div>
            </template>
          </a-dropdown>
        </nuxt-link>
        <nuxt-link to="dashboards" class="tabHover">
          Dashboards <i class="fa-solid fa-angle-down text-[0.8rem]"></i>
        </nuxt-link>
        <!-- <nuxt-link to="teams" class="tabHover">
          Teams <i class="fa-solid fa-angle-down text-[0.8rem]"></i>
        </nuxt-link> -->
        <a-dropdown>
          <a class="ant-dropdown-link tabHover" @click.prevent>
            Teams
            <i class="fa-solid fa-angle-down text-[0.8rem]"></i>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="/create-user">Create user</a>
              </a-menu-item>
              <a-menu-item>
                <a href="/users">Users</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <nuxt-link to="plans" class="tabHover">
          Plans <i class="fa-solid fa-angle-down text-[0.8rem]"></i>
        </nuxt-link>
        <nuxt-link to="apps" class="tabHover">
          Apps <i class="fa-solid fa-angle-down text-[0.8rem]"></i>
        </nuxt-link>
        <a-button @click="visiably = true" type="primary">Create</a-button>
      </nav>
    </div>
    <div
      class="header-settings flex items-center justify-end gap-[0.6rem] text-[0.9rem]"
    >
      <button
        class="upgrade group rounded-[4px] border-[1px] border-[#a882ee] px-2 py-[0.375rem] flex items-center gap-2 hover:border-none hover:bg-gradient-to-tr hover:from-purple-300 hover:to-blue-600"
      >
        <span class="upgrade-logo group-hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
            />
          </svg>
        </span>
        <span class="upgrade__title text-[blue] group-hover:text-white"
          >Upgrade</span
        >
      </button>
      <div
        class="header-search border-[1px] border-[gray] p-2 flex items-center gap-2 rounded-[4px] w-[12vw] duration-400"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search"
          class="outline-none border-none bg-inherit text-gray-600"
          v-model="searchInput"
        />
      </div>
      <div
        class="notification scale-x-[-1] text-black text-[1.2rem] p-1 rounded-full hover:bg-gray-300 !cursor-pointer"
      >
        <Bell />
      </div>
      <div
        class="help rounded-full w-[2.2rem] aspect-square flex justify-center items-center text-[1.2rem] hover:bg-gray-300 cursor-pointer"
      >
        <i class="fa-solid fa-circle-question"></i>
      </div>
      <div
        class="settings text-[1.2rem] h-[2.1rem] aspect-square rounded-full flex justify-center items-center hover:bg-gray-300 cursor-pointer"
      >
        <i class="fa-solid fa-gear"></i>
      </div>
      <div
        class="user rounded-full w-[1.4rem] aspect-square bg-[#007c80] flex items-center justify-center text-black text-[0.7rem]"
      >
        <span v-if="this.isAuthorized">{{ this.isAuthorized }}</span>
        <span v-else class="text-white"
          ><i class="fa-regular fa-user"></i>
        </span>
      </div>
    </div>
    <CreateModal v-model="visiably" />
  </header>
</template>
<style scoped>
.tabHover {
  padding: 0.4rem 0.2rem;
  border-radius: 4px;
  width: fit-content;
}
.tabHover:hover {
  cursor: pointer;
  background-color: rgb(229, 227, 227);
}
nav button {
  border-radius: 4px;
  padding: 0.2rem 0.8rem;
  background-color: rgb(57, 104, 171);
  color: white;
  transition-duration: 0.4s;
}
nav button:hover {
  background-color: rgb(8, 60, 132);
}
.ant-dropdown {
  border-radius: 6px !important;
}
.dropdown-overlay__child {
  background-color: white !important;
  border-radius: 6px !important;
  transform: translateY(1.5rem);
  box-shadow: 0 3px 6px 0 black;
  padding-bottom: 0.8rem;
  /* !bg-red-600 shadow-lg translate-y-6 */
}
.dropdown-overlay__child menu,
.dropdown-overlay__child ul {
  border-radius: 6px !important;
}
.text-wrapper {
  padding: 0 1rem;
  background-color: inherit;
}

.ant-menu-item {
  height: 1.8rem !important;
}

.issues-list-wrapper {
  margin: 0.6rem 0;
  height: auto;
  max-height: 15rem;
  overflow: hidden;
  overflow-y: auto;
}
</style>
