<script lang="ts">
import Vue from "vue";

// Define the type for the component's props
interface LoaderProps {
  condition: boolean;
}

export default Vue.extend({
  name: "Loader",
  props: {
    condition: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    hasCondition(): boolean {
      return this.condition;
    },
  },
});
</script>

<template>
  <div
    class="loader-wrapper absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.12)] flex items-center justify-center text-blue-600"
    v-if="hasCondition"
  >
    <div class="loader"></div>
  </div>
</template>

<style scoped></style>
