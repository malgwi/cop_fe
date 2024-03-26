export default {
  SET_USER: (state, data) => {
    if (!state.user) {
      state.user = data;
      return;
    }
    state.user = {
      ...state.user,
      ...data
    };
  },
  LOGOUT: state => (state.user = null),
  SET_EVENTS: (state, data) => {
    state.events = data;
  },
  SET_DISCUSSIONS: (state, data) => {
    state.discussions = data;
  },
  ADD_TO_DISCUSSIONS: (state, data) => {
    state.discussions = state.discussions.concat(data);
  },
  SET_EVENT_CAT: (state, data) => {
    state.eventCategories = data;
  },
  SET_POST_CAT: (state, data) => {
    state.postCategories = data;
  }
};
