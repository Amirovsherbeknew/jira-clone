<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Sidebar",
  data() {
    return {
      activeKey: ["1"],
    };
  },
  watch: {
    activeKey(val) {
      console.log(val);
    },
  },
  computed: {
    openSidebar(): boolean {
      return (this as any).$store.state.openSidebar;
    },
  },
  methods: {
    setOpenSidebar(): void {
      (this as any).$store.commit("handleOpenSidebar");
    },
  },
});
</script>
<template>
  <div
    class="sidebar"
    v-bind:class="{ sidebarOpen: openSidebar, sidebarClose: !openSidebar }"
  >
    <div class="btn-controller" @click="setOpenSidebar">
      <i v-if="openSidebar === true" class="fa-solid fa-angle-left"></i>
      <i v-else class="fa-solid fa-angle-right"></i>
    </div>
    <div class="sidebar-header flex items-center justify-between gap-2">
      <div class="sidebar-header__title text-black text-[1.1rem] font-semibold">
        Projects
      </div>
      <div
        class="sidebar-header__add bg-gray-300 hover:bg-gray-400 w-[1.2rem] h-[1.2rem] aspect-square flex justify-center items-center rounded-full text-black text-[1.1rem] cursor-pointer"
      >
        +
      </div>
    </div>
    <a-collapse
      v-model="activeKey"
      :bordered="false"
      class="border-none"
      :accordion="false"
    >
      <a-collapse-panel key="1" header="RECENT">
        <div class="accordion-row">Education</div>
        <div class="accordion-row">View all projects</div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<style scoped>
.sidebar {
  position: absolute;
  border-right: 3px solid lightgray;
  width: 15%;
  height: 91.5vh;
  background-color: white;
  padding: 1.5rem 1rem;
  color: black;
  transition: transform 0.4s ease;
  z-index: 15;
}
.sidebarOpen {
  transform: translateX(0);
}
.sidebarOpen .btn-controller {
  opacity: 0;
}
.sidebarOpen:hover .btn-controller {
  opacity: 1 !important;
}
.sidebarClose {
  transform: translateX(-90%);
}
.sidebarClose:hover {
  transform: translateX(0);
}
.btn-controller {
  position: absolute;
  top: 1.8rem;
  left: 100%;
  transform: translateX(-50%);
  border-radius: 50%;
  width: 1.3rem;
  height: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 0 10px 0 gray;
  color: #000;
  font-size: 0.7rem;
  cursor: pointer;
  z-index: 1;
  transition-duration: 0.4s;
}
.btn-controller:hover {
  transform: translateX(-50%);
  background-color: lightskyblue;
  color: white;
}
.ant-collapse > .ant-collapse-item {
  border: none;
}
.accordion-row {
  border-radius: 4px;
  padding: 0.6rem 0.4rem;
}
.accordion-row:hover {
  cursor: pointer;
  background-color: rgb(241, 240, 240);
}
</style>
