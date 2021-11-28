export const state = () => ({
  hello: {},
});

export const mutations = {
  setHello(state, hello) {
    state.hello = hello;
  },
};

export const actions = {
  async fetch({ commit }) {
    const data = await this.$axios.$get("/api/v1/hello");
    commit("setHello", data);
  },
};
