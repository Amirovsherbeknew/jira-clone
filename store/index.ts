// Vuex Store
import { MutationTree, GetterTree, ActionTree } from "vuex";

// Define the user interface
export interface IUser {
  id: number;
  name: string;
  job: string;
}

// Define the state interface
export interface State {
  openSidebar: boolean;
  users: IUser[];
}

// Define the initial state using the state function
export const state = (): State => ({
  openSidebar: false,
  users: [],
});

// Define the mutations
export const mutations: MutationTree<State> = {
  handleOpenSidebar(state: State) {
    state.openSidebar = !state.openSidebar;
  },
  setUsers(state: State, newUsers: IUser[]) {
    state.users = newUsers;
  },
};

export const getters: GetterTree<State, State> = {
  getUsers(state: State): IUser[] {
    return state.users;
  },
};

// Define the actions
export const actions: ActionTree<State, State> = {
  handleUsers({ commit, state }, otherUsers: IUser[]) {
    // console.log(otherUsers);
    commit("setUsers", otherUsers);
  },
  addUsers({ commit, state }, newUsers: IUser[]) {
    commit("setUsers", state.users.concat(newUsers));
  },
  getUser({ commit, state }, userId: string | number): IUser | undefined {
    return state.users.find((user: IUser) => user.id === userId);
  },
  removeUser({ commit, state }, userId: string | number) {
    // console.log(userId);
    commit(
      "setUsers",
      state.users.filter((user) => user.id !== userId)
    );
  },
};
