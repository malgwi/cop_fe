export default {
  async fetchAllUser({ commit }, page = 1) {
    try {
      const { data } = await this.$axios.get(`/admin/users?page=${page}`);
      const pageParams = {
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total
      };
      commit("SET_USERS", data.data);
      commit("SET_USER_PAGEPARAMS", pageParams);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllDiscussions({ commit }, page = 1) {
    try {
      const { data } = await this.$axios.get(`/admin/discussions?page=${page}`);
      const pageParams = {
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total
      };
      commit("SET_DISCUSSIONS", data.data);
      commit("SET_DISCUSSION_PAGEPARAMS", pageParams);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async blockUser({ commit, dispatch }, id) {
    try {
      const response = await this.$axios.patch(`/admin/block_user/${id}`);
      dispatch("fetchAllUser");
    } catch (error) {
      this.$bvToast.toast();
      console.log(error);
    }
  },
  async unblockUser({ commit, dispatch }, id) {
    try {
      const response = await this.$axios.patch(`/admin/unblock_user/${id}`);
      dispatch("fetchAllUser");
      console.log(response);
    } catch (error) {
      this.$bvToast.toast();
      console.log(error);
    }
  },
  async approveDiscussion({ commit }, id) {
    await this.$axios.patch(`/admin/discussion/approve/${id}`);
  },
  async declineDiscussion({ commit }, id) {
    await this.$axios.patch(`/admin/discussion/flag/${id}`);
  }
};
