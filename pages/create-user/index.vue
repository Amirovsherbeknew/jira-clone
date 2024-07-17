<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      name: "",
      job: "",
    };
  },
  methods: {
    handleFocus(e: Event) {
      if (!(e.target instanceof HTMLInputElement)) return;
      if (e.target.value.trim()) {
        e.target.style.borderColor = "black";
      } else {
        e.target.style.borderColor = "red";
      }
    },
    handleBlur(e: Event) {
      if (!(e.target instanceof HTMLInputElement)) return;
      if (e.target.value.trim()) {
        e.target.style.borderColor = "black";
      }
      e.target.blur();
    },
    handleSubmit(e: Event) {
      e.preventDefault();
      this.addUser();
    },
    async addUser() {
      const axios = await import("axios");
      try {
        const res = await axios.default.post("http://localhost:4000/users", {
          id: uuidv4(),
          name: this.name.trim(),
          job: this.job.trim(),
        });
      } catch (err: TypeError | any | unknown) {
        console.log(err.name);
      } finally {
        alert("Added new user");
        this.name = "";
        this.job = "";
        const interval = setTimeout(() => {
          clearTimeout(interval);
          // @ts-ignore
          this.$router.push("/users");
        }, 1000);
      }
    },
  },
});
</script>
<template>
  <div class="create-user-form__wrapper">
    <form @submit="handleSubmit">
      <span class="create-user__title block w-full text-center"
        >Create user</span
      >
      <hr class="absolute w-full h-[1px] my-4 bg-gray-260" />
      <div class="mt-[calc(2rem+1px)]"></div>
      <p>
        <label for="name">
          Name
          <div class="star-required">
            <i class="fa-solid fa-star"></i>
          </div>
        </label>
      </p>
      <input
        type="text"
        class="name"
        id="name"
        v-model="name"
        @focus="handleFocus"
        @blur="handleBlur"
        required
      />
      <p class="mt-4">
        <label for="job">
          Job
          <div class="star-required">
            <i class="fa-solid fa-star"></i>
          </div>
        </label>
      </p>
      <input
        type="text"
        class="name"
        id="job"
        v-model="job"
        @focus="handleFocus"
        @blur="handleBlur"
        required
      />
      <button type="submit">Add User</button>
    </form>
  </div>
</template>
<style scoped>
.create-user-form__wrapper {
  border-radius: 8px;
  border: 1px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 100%;
  font-size: 1rem;
  padding: 0.8rem 2rem;
  padding-bottom: 2rem;
}
form {
  display: block;
  position: relative;
}
.create-user__title {
  font-size: 2rem;
  font-weight: 600;
}
form label {
  position: relative;
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 600;
}
.star-required {
  position: absolute;
  top: 5px;
  right: -10px;
  color: rgb(128, 4, 4);
  font-size: 0.4rem;
}
form input {
  outline: none;
  border: 1px solid black;
  border-radius: 4px;
  padding: 0.4rem;
  width: 100%;
}
form button {
  display: block;
  margin: auto;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: rgb(0, 132, 255);
  color: white;
  transition-duration: 0.4s;
}
form button:hover {
  background-color: rgb(8, 92, 170);
}
</style>
