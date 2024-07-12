<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import Content from "../components/Content.vue";
export default {
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
<template>
  <div>
    <Navbar />
    <div class="main">
      <Sidebar />
      <Content />
    </div>
  </div>
</template>
<style>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
