<script lang="ts">
import Vue from "vue";
import { getUsers, removeUser } from "~/services/api";
import Loader from "./Loader.vue";

export default Vue.extend({
  components: { Loader },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers(): Promise<void> {
      // @ts-ignore
      const res = await getUsers(this.$api);
      this.$store.dispatch("handleUsers", res);
    },
    async deleteUser(e: Event, userId: number | string): Promise<void> {
      e.preventDefault();
      try {
        // @ts-ignore
        const res = await removeUser(this.$api, userId);
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
  <div class="users-view">
    <Loader
      :condition="$store.getters.getUsers?.length === 0"
      v-if="$store.getters.getUsers?.length === 0"
    />
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
  </div>
</template>
<style scoped>
.users-view {
  padding: 1.5rem 2rem;
}
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
