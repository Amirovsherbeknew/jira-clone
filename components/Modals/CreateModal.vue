<script lang="ts">
import Vue from "vue";
import { VueEditor } from "vue2-editor";
import IconBuild from "../IconBuild.vue";
import { IUser } from "~/store";
import { v4 as uuidv4 } from "uuid";
import { Issue } from "../../types/types";
interface CreateModal extends Vue {
  isBoolean: boolean;
}
interface IAssignee {
  value: string;
  label: string;
}
interface ICreateModal {
  isBoolean: boolean;
  value1: string;
  value2: string;
  status: string;
  summary: string;
  content: string;
  reporter: string;
  priority: string;
  dateStart: string;
  dateDue: string;
  estimate: string;
  blocks: string;
  anotherIssue: boolean;
  moreOpen: boolean;
  tooltip: boolean;
  assigneeValue: string[];
  relatedIssues: string[];
  tempIssues: string[];
}
export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data(): ICreateModal {
    return {
      // Modal is opened
      isBoolean: false,
      // First select default value
      value1: "education",
      // Second select default value
      value2: "task",
      // Status
      status: "To do",
      // Duration
      estimate: "",
      // More open is opened
      moreOpen: false,
      // priority
      // Tooltip is opened
      // dateTo
      tooltip: false,
      // summary
      summary: "",
      // reporter
      reporter: "",
      // priority
      priority: "Medium",
      // Start Date
      dateStart: "",
      // Due Date
      dateDue: "",
      // Vue editor content
      content: "Some initial content",
      // Blocks
      blocks: "",
      // Another issue
      anotherIssue: false,
      // Assign value
      assigneeValue: [],
      relatedIssues: [],
      tempIssues: [],
      // options: ["Lucy", "John", "Wick"].map((item) => ({
      //   value: item,
      //   label: `<p>${item}</p>`,
      // })),
    };
  },
  computed: {
    options() {
      return this.$store.state.users.map((user: IUser) => ({
        value: user.name,
        label: `<p>${user.name}</p>`,
      }));
    },
    getIssues() {
      return this.relatedIssues?.map((issueRelated: string) => ({
        value: issueRelated,
        label: `<p>${issueRelated}</p>`,
      }));
    },
  },
  async mounted() {
    // @ts-ignore
    await this.fetchUsers();
    // @ts-ignore
    await this.fetchIssues();
  },
  methods: {
    async fetchUsers(): Promise<void> {
      const axios = await import("axios");
      const res = await axios.default.get<IUser[]>(
        "http://localhost:4000/users"
      );
      this.$store.dispatch("handleUsers", res.data);
    },
    async fetchIssues(): Promise<void> {
      const axios = await import("axios");
      const res = await axios.default("http://localhost:4000/issues");
      // console.log(res.data);
      this.relatedIssues = res.data.map((issue: Issue) => issue.summary);
      console.log(this.relatedIssues);
    },
    async addIssue(): Promise<void> {
      const axios = await import("axios");
      try {
        const res = await axios.default.post("http://localhost:4000/issues", {
          id: uuidv4(),
          project: this.value1,
          type: this.value2,
          status: this.status,
          duration: this.estimate,
          summary: this.summary,
          reporter: this.reporter,
          priority: this.priority,
          dateStart: this.dateStart,
          dateTo: this.dateDue,
          description: this.content,
          blocks: this.blocks,
          assigneeValue: Array.from(this.assigneeValue),
          relatedIssues: Array.from(this.tempIssues),
        });
      } catch (err: TypeError | any | unknown) {
        console.log(err.message);
      } finally {
        alert("Added new issue");
      }
    },
    async handleSubmit(e: Event) {
      e.preventDefault();
      // @ts-ignore
      await this.addIssue();
      this.value1 = "";
      this.value2 = "";
      this.status = "";
      this.estimate = "";
      this.summary = "";
      this.reporter = "";
      this.priority = "";
      this.dateStart = "";
      this.dateDue = "";
      this.content = "";
      this.blocks = "";
      this.anotherIssue = false;
      this.assigneeValue = [];
      // @ts-ignore
      this.setMoreOpen();
      this.isBoolean = false;
      // @ts-ignore
      this.$router.push("/");
    },
    setMoreOpen() {
      this.moreOpen = !this.moreOpen;
    },
    toggleTooltip() {
      this.tooltip = !this.tooltip;
    },
    closeTooltip() {
      this.tooltip = false;
      console.log("Tooltip has been closed", this.tooltip);
    },
    handleSummaryFocus(e: FocusEvent) {
      e.preventDefault();
      (e.target as HTMLElement).style.borderColor = "blue";
    },
    handleSummaryBlur(e: FocusEvent) {
      e.preventDefault();
      if (this.summary.trim()) return;
      (e.target as HTMLElement).style.borderColor = "red";
    },
    handleClick(e: MouseEvent) {
      e.preventDefault();
      const input = this.$refs.dropInput as HTMLInputElement;
      input.click();
    },
    handleInputChange(e: Event) {
      e.preventDefault();
      const input = this.$refs.dropInput as HTMLInputElement;
      const dropZone = this.$refs.dropZone as HTMLDivElement;
      if (input.files?.length) {
        // @ts-ignore
        this.updateThumbnail(dropZone, input.files[0]);
      }
    },
    handleDragOver(e: DragEvent) {
      e.preventDefault();
      const dropZone = this.$refs.dropZone as HTMLDivElement;
      dropZone.classList.add("drop-zone--over");
    },
    handleDragLeave(e: DragEvent) {
      e.preventDefault();
      const dropZone = this.$refs.dropZone as HTMLDivElement;
      dropZone.classList.remove("drop-zone--over");
    },
    handleDragEnd(e: DragEvent) {
      e.preventDefault();
      const dropZone = this.$refs.dropZone as HTMLDivElement;
      dropZone.classList.remove("drop-zone--over");
    },
    updateThumbnail(div: HTMLDivElement, files: File): void {
      const dropPrompt = this.$refs.dropPrompt as HTMLSpanElement;
      const thumbnailElement = this.$refs.dropThumb as HTMLDivElement;
      dropPrompt.style.display = "none";
      thumbnailElement.style.display = "block";
      console.log(thumbnailElement.style.display, files.name);
      thumbnailElement.dataset.label = files.name;

      // Show thumbnail for image file
      if (files.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = () => {
          thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
      } else {
        thumbnailElement.style.backgroundImage = "";
      }
    },
    handleDrop(e: DragEvent) {
      e.preventDefault();
      const input = this.$refs.dropInput as HTMLInputElement;
      const dropZone = this.$refs.dropZone as HTMLDivElement;
      console.log("Drop", e.dataTransfer?.files);
      if (e.dataTransfer?.files.length) {
        input.files = e.dataTransfer.files;
        // @ts-ignore
        this.updateThumbnail(dropZone, e.dataTransfer.files[0]);
      }
      dropZone.classList.remove("drop-zone--over");
    },
  },
  watch: {
    isBoolean: {
      handler(this: CreateModal, val: boolean) {
        if (typeof val === "boolean") {
          this.$emit("input", val);
        }
      },
    },
    value: {
      immediate: true,
      handler(val: boolean) {
        if (typeof val === "boolean") {
          this.isBoolean = val;
        }
      },
    },
  },
});
</script>

<template>
  <a-modal
    v-model="isBoolean"
    title="Create issue"
    :bodyStyle="{
      overflow: 'hidden',
      overflowY: 'auto',
    }"
    :wrap-style="{ borderRadius: '16px' }"
    :afterClose="closeTooltip"
    :style="{ width: '90vw' }"
  >
    <form @submit="handleSubmit">
      <div class="modal-main overflow-hidden overflow-y-auto h-[50vh]">
        <div class="flex justify-between items-center gap-2">
          <div class="required">
            <div class="required-star"><i class="fa-solid fa-star"></i></div>
            <span>Required fields are marked with an asterisk</span>
          </div>
          <div class="more relative">
            <span
              class="more-icon text-[1.4rem] w-[1.8rem] aspect-square flex justify-center items-center rounded-sm hover:bg-gray-100 cursor-pointer"
              @click="setMoreOpen"
              ><i class="fa-solid fa-ellipsis"></i
            ></span>
            <div
              v-if="moreOpen"
              class="more-window-wrapper absolute top-full right-0 min-w-fit"
            >
              <div
                class="more-window rounded-md border-gray-200 border-[1px] min-w-fit w-[6vw] bg-white hover:bg-gray-100 shadow-lg px-2 py-[0.75rem]"
              >
                Show fields
              </div>
            </div>
          </div>
        </div>
        <div class="project-select mt-4 text-[0.8rem] !font-semibold">
          <label>
            <div class="required text-black">
              <div class="required-star"><i class="fa-solid fa-star"></i></div>
              Project
            </div>
          </label>
          <a-select
            ref="select"
            v-model="value1"
            style="margin-top: 0.2rem; width: 45%"
            aria-required="true"
          >
            <a-select-option value="education"
              ><i class="fa-solid fa-book-open"></i> Education</a-select-option
            >
            <a-select-option value="work"
              ><i class="fa-solid fa-briefcase"></i> Work</a-select-option
            >
          </a-select>
        </div>
        <div class="issue-select mt-4 text-[0.8rem] !font-semibold">
          <label>
            <div class="required text-black">
              <div class="required-star"><i class="fa-solid fa-star"></i></div>
              Issue type
            </div>
          </label>
          <a-select
            ref="select"
            v-model="value2"
            style="margin-top: 0.2rem; width: 45%; padding: 0.2rem"
            aria-required="true"
          >
            <a-select-option value="task">
              <div class="flex items-center gap-2">
                <IconBuild color="blue"
                  ><i class="fa-solid fa-check"></i
                ></IconBuild>
                <span>Task</span>
              </div>
            </a-select-option>
            <a-select-option value="story">
              <div class="flex items-center gap-2">
                <IconBuild color="green"
                  ><i class="fa-solid fa-bookmark"></i>
                </IconBuild>
                <span>Story</span>
              </div>
            </a-select-option>
            <a-select-option value="bug">
              <div class="flex items-center gap-2">
                <IconBuild color="orange"
                  ><i class="fa-solid fa-circle"></i
                ></IconBuild>
                <span>Bug</span>
              </div>
            </a-select-option>
            <a-select-option value="epic">
              <div class="flex items-center gap-2">
                <IconBuild color="purple"
                  ><i class="fa-solid fa-bolt"></i
                ></IconBuild>
                <span>Epic</span>
              </div>
            </a-select-option>
            <a-select-option value="test">
              <div class="flex items-center gap-2">
                <IconBuild color="lightblue"
                  ><i class="fa-solid fa-magnifying-glass"></i
                ></IconBuild>
                <span>Test</span>
              </div>
            </a-select-option>
            <a-select-option value="design story">
              <div class="flex items-center gap-2">
                <IconBuild color="darkorange"
                  ><i class="fa-solid fa-lightbulb"></i
                ></IconBuild>
                <span>Design Story</span>
              </div>
            </a-select-option>
            <a-select-option value="devops">
              <div class="flex items-center gap-2">
                <IconBuild color="black"
                  ><i class="fa-solid fa-gear"></i
                ></IconBuild>
                <span>Devops</span>
              </div>
            </a-select-option>
            <a-select-option value="improvements">
              <div class="flex items-center gap-2">
                <IconBuild color="lightgreen"
                  ><i class="fa-solid fa-arrow-up"></i
                ></IconBuild>
                <span>Improvements</span>
              </div>
            </a-select-option>
          </a-select>
        </div>
        <div class="learn-issue mt-2 text-[0.8rem]">
          <nuxt-link to="/learn-issues" class="hover:underline"
            >Learn about issue types</nuxt-link
          >
        </div>
        <hr class="block mt-6 mb-6 h-[1px] bg-gray-300" />
        <div class="status-select w-full mt-2">
          <label
            class="status-label relative text-[0.8rem] text-black !font-semibold w-fit"
          >
            <span>Status</span>
            <a-tooltip
              placement="right"
              :visible="tooltip"
              overlayClassName="bg-inherit"
            >
              <template slot="title">
                Choose the status of your issue while creating it. For example,
                select In progress if you've started the work. You can manage
                this field in
                <span class="text-gray-600 font-bold">System settings</span>.
              </template>
              <div class="status-icon" @click="toggleTooltip">
                <i class="fa-solid fa-circle-info"></i>
              </div>
            </a-tooltip>
          </label>
          <a-select v-model="status" style="width: 10vw" aria-required="true">
            <a-select-option value="concepting"
              ><div class="effect-blue">Concepting</div></a-select-option
            >
            <a-select-option value="design"
              ><div class="effect-blue">Design</div></a-select-option
            >
            <a-select-option value="testing"
              ><div class="effect-blue">Testing</div></a-select-option
            >
            <a-select-option value="launch"
              ><div class="effect-green">Launch</div></a-select-option
            >
          </a-select>
          <span class="block mt-2 w-full text-[0.7rem] font-semibold"
            >This is the issue's initial status upon creation
          </span>
        </div>
        <div class="summary-select mt-4">
          <div class="required text-[0.8rem] !font-semibold text-black">
            <label for="summary">Summary</label>
            <div class="required-star"><i class="fa-solid fa-star"></i></div>
          </div>
          <input
            type="text"
            id="summary"
            ref="summary-input"
            class="summary-input"
            v-model="summary"
            @focus="handleSummaryFocus"
            @blur="handleSummaryBlur"
            required
          />
          <p v-if="!summary.trim().length" class="summary-error">
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>Summary is required</span>
          </p>
        </div>
        <div
          class="description-blank mt-6 text-[0.8rem] !font-semibold text-black"
        >
          <div class="description-title">Description</div>
          <vue-editor v-model="content"></vue-editor>
        </div>
        <div class="assignee mt-4">
          <div class="assignee-label text-[0.8rem] !font-semibold text-black">
            Assignee
          </div>
          <a-select
            v-model="assigneeValue"
            mode="multiple"
            placeholder="automatic"
            style="width: 100%"
          >
            <a-select-option
              v-for="item in options"
              :key="item.id"
              :value="item.value"
            >
              <span v-html="item.label"></span>
            </a-select-option>
          </a-select>
          <p>
            <nuxt-link to="/me" class="hover:underline text-[0.8rem]"
              >Assign to me</nuxt-link
            >
          </p>
        </div>
        <div class="reporter">
          <div class="required">
            <div class="required-star"><i class="fa-solid fa-star"></i></div>
            <span class="block text-[0.8rem] !font-semibold !text-black"
              >Reporter</span
            >
          </div>
          <input
            v-model="reporter"
            type="text"
            class="input-global"
            placeholder="Username"
            required
          />
        </div>
        <div class="priority">
          <div class="priority-label text-[0.8rem] !font-semibold !text-black">
            Priority
          </div>
          <a-select
            v-model="priority"
            style="color: black !important; width: 45%"
          >
            <a-select-option value="medium">Medium</a-select-option>
            <a-select-option value="highest"
              ><span class="text-red-600"
                ><i class="fa-solid fa-angles-up"></i></span
              >&nbsp; Highest</a-select-option
            >
            <a-select-option value="high"
              ><span class="text-red-600"
                ><i class="fa-solid fa-angle-up"></i></span
              >&nbsp; High</a-select-option
            >
            <a-select-option value="low"
              ><span class="text-blue-600"
                ><i class="fa-solid fa-angle-down"></i></span
              >&nbsp; Low</a-select-option
            >
            <a-select-option value="lowest"
              ><span class="text-blue-600"
                ><i class="fa-solid fa-angles-down"></i></span
              >&nbsp; Lowest</a-select-option
            >
          </a-select>
          <p>
            <nuxt-link to="/priority" class="hover:underline text-[0.8rem]"
              >Learn about priority levels</nuxt-link
            >
          </p>
        </div>
        <div class="labels">
          <div class="labels-label text-[0.8rem] !font-semibold !text-black">
            Labels
          </div>
          <a-select style="color: black !important; width: 45%"> </a-select>
        </div>
        <div class="date-due mt-4">
          <div class="date-due-label text-[0.8rem] !font-semibold !text-black">
            Due date
          </div>
          <input type="date" placeholder="Select date" v-model="dateDue" />
        </div>
        <div class="drag-drop mt-4 w-[100%]">
          <label class="text-[0.8rem] !font-semibold !text-black"
            >Attachment</label
          >
          <div
            class="drop-zone"
            ref="dropZone"
            @click="handleClick"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @dragend="handleDragEnd"
            @drop="handleDrop"
          >
            <span class="drop-zone__prompt" ref="dropPrompt">
              <i class="fa-solid fa-cloud-arrow-up"></i> Drop files to attach or
              browse</span
            >
            <div
              class="drop-zone__thumb"
              data-label="myFile.txt"
              ref="dropThumb"
            ></div>
            <input
              type="file"
              name="myFile"
              class="drop-zone__input"
              ref="dropInput"
              @change="handleInputChange"
            />
          </div>
        </div>
        <div class="original-estimate mt-4">
          <label class="block text-[0.8rem] text-black font-semibold"
            >Original Estimate</label
          >
          <input
            type="text"
            class="input-global"
            placeholder="2w 1d 5h 4m"
            v-model="estimate"
          />
          <span class="block mt-2 w-[45%] text-justify">
            An estimate of how much work remains until this issue will be
            resolved. The format of this is ' *w *d *h *m ' (representing weeks,
            days, hours and minutes - where * can be any number). Examples: 4d,
            5h 30m, 60m and 3w.
          </span>
        </div>
        <div class="date-start mt-4">
          <label class="block text-[0.8rem] text-black font-semibold"
            >Start date</label
          >
          <input type="date" class="input-global" v-model="dateStart" />
          <div class="date-start__ps mt-2 text-[0.8rem]">
            Choose a category using a popup picker window.
          </div>
        </div>
        <div class="issues-linked mt-4">
          <label class="block text-[0.8rem] text-black font-semibold"
            >Linked Issues</label
          >
          <a-select
            v-model="blocks"
            style="color: black !important; width: 45%"
          >
            <a-select-option value="blocks">blocks</a-select-option>
            <a-select-option value="is blocked by"
              >is blocked by</a-select-option
            >
            <a-select-option value="clones">clones</a-select-option>
            <a-select-option value="is cloned by">is cloned by</a-select-option>
            <a-select-option value="duplicated">duplicated</a-select-option>
            <a-select-option value="is duplicated by"
              >is duplicated by</a-select-option
            >
            <a-select-option value="relates to">relates to</a-select-option>
          </a-select>
          <p class="mt-2">
            <a-select
              v-model="tempIssues"
              style="color: black !important; width: 45%"
              mode="multiple"
            >
              <a-select-option
                v-for="(item, ind) in getIssues"
                :key="ind"
                :value="item.value"
              >
                <span v-html="item.label"></span>
              </a-select-option>
            </a-select>
          </p>
        </div>
      </div>
      <div class="footer">
        <div class="col">
          <input
            type="checkbox"
            name="anotherIssue"
            id="anotherIssue"
            v-model="anotherIssue"
          />
          <label for="anotherIssue">Create another issue</label>
        </div>
        <div class="col flex gap-4">
          <button class="hover:underline">Cancel</button>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-400 text-white rounded-[4px] p-2"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  </a-modal>
</template>

<style scoped>
.modal-main {
  padding-bottom: 10vh !important;
  width: 100% !important;
}
.ant-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ant-modal-header {
  padding: 2rem 1.5rem !important;
}
.ant-modal-title {
  font-size: 1.2rem !important;
}
.ant-modal-close-x {
  height: fit-content !important;
  width: fit-content !important;
  width: 0;
  margin-top: 2.1rem;
  margin-right: 1.5rem;
  line-height: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.required {
  position: relative;
  width: fit-content;
}
.required-star {
  position: absolute;
  top: 0.2rem;
  right: -0.5rem;
  font-size: 0.3rem;
  color: rgb(180, 18, 18);
}
.status-select {
  position: relative;
  width: fit-content;
}
.status-label {
  display: block;
}
.status-icon {
  display: block;
  position: absolute;
  top: 0.1rem;
  right: -0.5rem;
  font-size: 0.4rem;
  color: gray;
  cursor: pointer;
}
.ant-tooltip-arrow {
  display: none !important;
}
.ant-tooltip-inner {
  width: 20vw;
  background-color: white !important;
  border: 1px solid lightgray !important;
  text-align: justify !important;
  color: black !important;
}
.effect-blue {
  display: block;
  width: fit-content;
  border-radius: 4px !important;
  padding: 0.1px 2px !important;
  background-color: rgb(201, 228, 237) !important;
  color: blue !important;
  font-weight: semibold;
}
.effect-green {
  display: block;
  width: fit-content;
  border-radius: 4px !important;
  padding: 0.1px 2px !important;
  background-color: rgb(209, 249, 209) !important;
  color: green !important;
  font-weight: semibold;
}
.summary-input {
  outline: none;
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(164, 6, 6);
  width: 100%;
  padding: 0.4rem 0.7rem;
  transition-duration: 0.4s;
}
.summary-error {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: rgb(164, 6, 6);
}
.input-global {
  outline: none;
  border-radius: 3px;
  border: 2px solid lightgray;
  width: 45%;
  padding: 0.4rem;
  color: black;
}
.input-global:focus {
  border-color: blue;
}
.priority {
  margin-top: 1rem;
}
input[type="date"] {
  outline: none;
  border-radius: 3px;
  border: 2px solid lightgray;
  width: 45%;
  padding: 0.4rem;
  color: black;
}
input[type="date"]:focus {
  border-color: blue;
}
.drop-zone {
  width: 100% !important;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  color: black;
  border: 1px dashed lightgray;
  border-radius: 4px;
}
.drop-zone__prompt {
  display: block;
  margin: auto;
  width: 100%;
  height: 100%;
  text-align: center;
}
.drop-zone--over {
  border-style: solid;
}
.drop-zone__input {
  display: none;
}
.drop-zone__thumb {
  display: none;
  color: black !important;
  min-height: 10rem;
  width: 100%;
  border-radius: 4px;
  background-color: #cccccc;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}
.drop-zone__thumb::after {
  content: attr(data-label);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5px 0;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.75);
  font-size: 0.875rem;
  text-align: center;
}
.footer {
  width: 100%;
  height: 6vh !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
</style>
