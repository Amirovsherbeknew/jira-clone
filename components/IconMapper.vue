<script lang="ts">
import Vue from "vue";
// @ts-ignore
import makeCapitalAnother from "@/utils/strings";
import IconBuild from "./IconBuild.vue";
export default Vue.extend({
  name: "IconMapper",
  components: {
    IconBuild,
  },
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      mapper: [
        {
          name: "task",
          color: "blue",
          iconClass: "fa-solid fa-check",
        },
        {
          name: "story",
          color: "green",
          iconClass: "fa-solid fa-bookmark",
        },
        {
          name: "bug",
          color: "orange",
          iconClass: "fa-solid fa-circle",
        },
        {
          name: "epic",
          color: "purple",
          iconClass: "fa-solid fa-bolt",
        },
        {
          name: "test",
          color: "lightblue",
          iconClass: "fa-solid fa-magnifying-glass",
        },
        {
          name: "design story",
          color: "darkorange",
          iconClass: "fa-solid fa-lightbulb",
        },
        {
          name: "devops",
          color: "black",
          iconClass: "fa-solid fa-gear",
        },
        {
          name: "improvements",
          color: "lightgreen",
          iconClass: "fa-solid fa-arrow-up",
        },
      ],
    };
  },
  methods: {
    makeCapital(text: string): string {
      return makeCapitalAnother(text);
    },
  },
});
</script>
<template>
  <div>
    <div v-for="icon in mapper" :key="icon.name">
      <div class="flex items-center gap-2" v-if="iconName === icon.name">
        <IconBuild :color="icon.color"
          ><i :class="icon.iconClass"></i
        ></IconBuild>
        <span>{{ makeCapital(icon.name) }}</span>
      </div>
    </div>
  </div>
  <!-- <div class="flex items-center gap-2" v-if="iconName == 'task'">
    <IconBuild color="blue"><i class="fa-solid fa-check"></i></IconBuild>
    <span>Task</span>
  </div>
  <div class="flex items-center gap-2" v-else-if="iconName == 'story'">
    <IconBuild color="green"><i class="fa-solid fa-bookmark"></i> </IconBuild>
    <span>Story</span>
  </div>
  <div class="flex items-center gap-2" v-else-if="iconName == 'bug'">
    <IconBuild color="orange"><i class="fa-solid fa-circle"></i></IconBuild>
    <span>Bug</span>
  </div>
  <div class="flex items-center gap-2" v-else-if="iconName == 'epic'">
    <IconBuild color="purple"><i class="fa-solid fa-bolt"></i></IconBuild>
    <span>Epic</span>
  </div>
  <div class="flex items-center gap-2" v-else-if="iconName == 'test'">
    <IconBuild color="lightblue"
      ><i class="fa-solid fa-magnifying-glass"></i
    ></IconBuild>
    <span>Test</span>
  </div>
  <div class="flex items-center gap-2" v-else-if="iconName == 'design story'">
    <IconBuild color="darkorange"
      ><i class="fa-solid fa-lightbulb"></i
    ></IconBuild>
    <span>Design Story</span>
  </div>
  <div class="flex items-center gap-2" v-else-if="iconName == 'devops'">
    <IconBuild color="black"><i class="fa-solid fa-gear"></i></IconBuild>
    <span>Devops</span>
  </div>
  <div class="flex items-center gap-2" v-else>
    <IconBuild color="lightgreen"
      ><i class="fa-solid fa-arrow-up"></i
    ></IconBuild>
    <span>Improvements</span>
  </div> -->
</template>
<style scoped></style>
