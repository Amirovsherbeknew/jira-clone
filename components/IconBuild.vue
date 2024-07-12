<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "IconBuild",
  props: {
    color: {
      type: String,
      default: "#000000",
    },
  },
});
</script>
<template>
  <div
    class="icon-wrapper rounded-sm text-white w-[0.75rem] h-[0.75rem] p-2 aspect-square !flex !justify-center !items-center text-[0.5rem]"
    :style="{ backgroundColor: color }"
  >
    <slot />
  </div>
</template>
<style></style>
