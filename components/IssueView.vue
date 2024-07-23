<script lang="ts">
import { getIssueById, updateIssue } from "~/services/api";
import Edit from "~/assets/icons/Edit.vue";
import BreadCrumb from "./BreadCrumb.vue";
import { Issue } from "../types/types";
export default {
  name: "IssueView",
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
      issue: null as null | Issue,
    };
  },
  async created() {
    // @ts-ignore
    this.slug = this.$route.params.projectItem;
    // @ts-ignore
    [this.issue] = await getIssueById(this.$api, this.slug);
    console.log("Issue has been fetched", this.issue);
    this.title = this.issue!.summary;
    // console.log("Issue", issue, "Title", this.title);
  },
  methods: {
    // Summary change
    handleChange(e: Event) {
      let target = e.target as HTMLParagraphElement;
      // console.log(target?.textContent);
    },
    handleBlur() {
      setTimeout(() => {
        this.focus = false;
      }, 100);
    },
    async handleSave() {
      this.title = (this.$refs.titleRef as HTMLDivElement).textContent!.trim();
      console.log("Saved", this.title);
      this.focus = false;
      const res = await updateIssue(this.$api, this.slug, {
        summary: this.title,
      });
      alert("Summary updated");
    },
    handleCancel() {
      console.log("Cancelled");
      this.focus = false;
      document.execCommand("undo");
    },
  },
};
</script>
<template>
  <div class="issue__view">
    <div class="issue-view__header flex items-center gap-4 w-full">
      <div class="col-first">
        <Edit />
      </div>
      <div class="col-second w-full">
        <BreadCrumb />
        <div class="w-full relative">
          <p
            class="text-[1.8rem] flex justify-between w-full"
            contenteditable
            @input="handleChange"
            @click="focus = true"
            @blur="handleBlur"
            ref="titleRef"
          >
            {{ title }}
          </p>
          <div
            v-if="focus"
            class="edit absolute content-[''] bottom-[-0.5rem] right-[0] translate-y-[100%] !bg-[#ffffff] text-red-600 p-2 flex items-center gap-4"
          >
            <div class="edit__btn">
              <span class="save" @click="handleSave"
                ><i class="fa-solid fa-check"></i
              ></span>
            </div>
            <div class="edit__btn">
              <span class="cancel" @click="handleCancel">
                <i class="fa-solid fa-xmark"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="issue-view__main bg-[#a5f3a5] h-[20rem] w-full py-2">
      <div class="buttons-flex flex items-center gap-6">
        <button class="btn-func flex items-center gap-[0.8rem]">
          <span><i class="fa-solid fa-pen"></i></span>
          <span>Edit</span>
        </button>
        <button class="btn-func flex items-center gap-[0.8rem]">
          <span><i class="fa-regular fa-comment"></i></span>
          <span>Comment</span>
        </button>
        <div class="assign-buttons flex items-center gap-1">
          <div class="btn-func">Assign</div>
          <div class="btn-func flex items-center gap-[0.8rem]">
            <span>More</span>
            <span><i class="fa-solid fa-angle-down"></i></span>
          </div>
        </div>
        <div class="other-buttons flex items-center gap-1">
          <div class="btn-func">Ready for Code Review</div>
          <div class="btn-func">Blocked by Dependency</div>
          <div class="btn-func">Needs clarification</div>
        </div>
      </div>
      <div class="details mt-6">
        <div class="details__header flex items-center gap-4">
          <div class="btn-func !px-2 !py-1">
            <i class="fa-solid fa-angle-down"></i>
          </div>
          <span class="font-semibold">Details</span>
        </div>
        <div class="details__main">
          <div class="detail">
            <div class="detail__typename">Type:</div>
            <div class="detail__name">
              <IconMapper :iconName="issue?.type" />
            </div>
          </div>
          <div class="detail">
            <div class="detail__typename">Priority:</div>
            <div class="detail__name">{{ issue?.priority }}</div>
          </div>
          <div class="detail">
            <div class="detail__typename">Status:</div>
            <div class="detail__name">{{ issue?.status }}</div>
          </div>
          <div class="detail">
            <div class="detail__typename">Resolution:</div>
            <div class="detail__name">Unresolved</div>
          </div>
          <div class="detail">
            <div class="detail__typename">Labels:</div>
            <div class="detail__name">{{ issue?.labels || "None" }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.issue__view {
  font-size: 1.5rem;
  padding: 2rem 0;
  height: 100%;
}
.issue-view__header {
  padding: 0 2.5rem;
  border-bottom: 1px solid rgb(172, 170, 170);
}

.issue-view__main {
  padding: 1rem 2.5rem;
  height: 89.5%;
}
.edit__btn {
  background-color: lightgray;
  color: #000;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
}

.details__main {
  padding: 1.3rem 0;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  row-gap: 1.5rem;
  column-gap: 15%;
}
.detail {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 50%;
  font-size: 1.3rem;
}
.detail__typename {
  width: 100%;
  color: gray;
}
.detail__name {
  width: 100%;
}
</style>
