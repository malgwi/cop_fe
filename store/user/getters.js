export default {
  getUserDiscussions(state) {
    return state.userPosts;
  },
  getUserEvents(state) {
    return state.userEvents;
  },
  getUserComments(state) {
    return state.userComments;
  }
};
