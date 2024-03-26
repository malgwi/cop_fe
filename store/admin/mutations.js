export default {
  SET_USERS: (state, data) =>{
    state.allUsers = data
  },
  SET_DISCUSSIONS: (state, data) =>{
    state.discussions = data
  },
  SET_USER_PAGEPARAMS: (state, data) =>{
    state.userPageParams = data
  },
  SET_DISCUSSION_PAGEPARAMS: (state, data) =>{
    return state.discussionPageParams = data
  }
}