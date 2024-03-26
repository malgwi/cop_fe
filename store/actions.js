import { store, TOKEN_KEY, retrieve } from "~/helpers/storage";
export default {
  async login({ commit }, data) {
    try {
      const resp = await this.$auth.loginWith("local", {
        data: data
      });
      commit("SET_USER", resp.data);
      store(TOKEN_KEY, resp.data.access_token);
    } catch (error) {
      console.log(error.response);
    }
  },
  async logout({ commit }) {
    commit("LOGOUT");
  },
  async fetchAllEvents({ commit }, page = 1) {
    try {
      const response = await this.$axios.get(`/community/events?page=${page}`);
      const events = await response.data.data;
      commit("SET_EVENTS", events);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllDiscussions({ commit, getters }) {
    const response = await this.$axios.get("/community/discussions");
    const discusions = await response.data.data;
    commit("SET_DISCUSSIONS", discusions);
  },
  async searchDiscussions({ commit }, queries) {
    const { page, keyword, category } = queries;
    const response = await this.$axios.get(
      `/community/discussions?page=${page}&keyword=${keyword}&category=${category}`
    );
    const discusions = await response.data.data;
    commit("SET_DISCUSSIONS", discusions);
  },
  async fetchEventCategories({ commit }) {
    const response = await this.$axios.get("/misc/event_categories?limt=10");
    const categories = await response.data.data;
    commit("SET_EVENT_CAT", categories);
  },
  async fetchPostCategories({ commit }) {
    const response = await this.$axios.get("/misc/categories");
    const categories = await response.data.data;
    commit("SET_POST_CAT", categories);
  },
  async uploadEvent({ commit }, data) {
    const response = await this.$axios.post("/user/event", data);
  },
  // for infinte scroll
  async addToDiscussions({ commit }, queries) {
    const { page, keyword, category } = queries;
    const response = await this.$axios.get(
      `/community/discussions?page=${page}&keyword=${keyword}&category=${category}`
    );
    const discusions = await response.data.data;
    commit("ADD_TO_DISCUSSIONS", discusions);
    return response;
  }
};
