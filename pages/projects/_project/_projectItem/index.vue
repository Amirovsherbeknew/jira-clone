<script lang="ts">
import { getIssueById } from "~/services/api";
import Edit from "../../../../assets/icons/Edit";
import BreadCrumb from "../../../../components/BreadCrumb.vue";
export default {
  components: {
    BreadCrumb,
    Edit,
  },
  data() {
    return {
      slug: "" as string,
      name: "" as string,
      title: "" as string,
      service: null as any,
      serviceItem: null as any,
      focus: false as boolean,
    };
  },
  async mounted() {
    // @ts-ignore
    this.slug = this.$route.params.projectItem;
    const issue = await getIssueById(this.slug);
    this.title = issue[0].summary;
    console.log("Issue", issue, "Title", this.title);
  },
  methods: {
    handleChange(e: Event) {
      const target = e.target as HTMLParagraphElement;
    },
    handleClick() {
      this.focus = true;
      console.log("Hello");
      // @ts-ignore
      this.title = this.$refs.titleRef.textContent;
      console.log(this.title);
    },
  },
};
</script>
<template>
  <div class="flex items-center gap-4">
    <div class="col-first">
      <Edit />
    </div>
    <div class="col-second">
      <BreadCrumb />
      <p
        class="text-[1.2rem] flex justify-between"
        contenteditable
        @input="handleChange"
        @focus="focus = true"
        @blur="focus = false"
        ref="titleRef"
      >
        {{ title }}
        <button
          v-if="focus"
          class="border-[1px] border-[black] px-2 py-[0.1rem] rounded-sm bg-blue-400 text-white hover:bg-blue-600"
          @click="handleClick"
        >
          Save
        </button>
      </p>
    </div>
  </div>
</template>
<style scoped></style>
