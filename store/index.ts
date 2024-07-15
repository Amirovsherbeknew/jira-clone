interface State {
  openSidebar: boolean;
}

export const state = () => ({
  openSidebar: 0,
  linkItems: [],
});

export const mutations = {
  handleOpenSidebar(state: State) {
    state.openSidebar = !state.openSidebar;
  },
};
