<script lang="ts">
import Vue from "vue";
import { IUser } from "~/store";

export default Vue.extend({
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers(): Promise<void> {
      const axios = await import("axios");
      const res = await axios.default.get<IUser[]>(
        "http://localhost:4000/users"
      );
      this.$store.dispatch("handleUsers", res.data);
    },
    async deleteUser(e: Event, userId: number | string): Promise<void> {
      e.preventDefault();
      try {
        const BASE_URL = "http://localhost:4000/users/" + userId;
        const axios = await import("axios");
        const res = await axios.default.delete(BASE_URL);
        this.$store.dispatch("removeUser", userId);
      } catch (err: TypeError | any | unknown) {
        console.log(err.message);
      } finally {
        alert("User with id " + userId + " was successfully deleted");
      }
    },
  },
});
</script>

<template>
  <div
    class="loader-wrapper absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.25)] flex items-center justify-center text-blue-600"
    v-if="$store.getters.getUsers?.length === 0"
  >
    <div class="loader"></div>
  </div>
  <table v-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr class="user" v-for="user in $store.getters.getUsers" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.job }}</td>
        <td class="flex items-center gap-4 text-[1.5rem]">
          <i
            class="fa-solid fa-pen-to-square text-yellow-500 hover:scale-[1.3]"
            @click="() => $router.push(`/update-user/${user.id}`)"
          ></i>
          <i
            class="fa-regular fa-trash-can text-red-600 hover:scale-[1.3]"
            @click="(e) => deleteUser(e, user.id)"
          ></i>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
table {
  margin: 1rem;
  font-size: 1.1rem;
}

th,
td {
  padding: 0.5rem;
}
tr {
  transition-duration: 0.4s;
}
tr:hover {
  background-color: lightgreen;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
</style>
