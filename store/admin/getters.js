export default {
  getAllUsers(state){
    return state.allUsers
  },
  getAllDiscussion(state){
    return state.discussions
  },
  getDiscussion:(state) => id => {
    state.discussions.find(disc => disc.id == id )
  },
  getUserPageParams(state){
    return state.userPageParams
  },
  getDiscussionPageParams(state){
    return state.userPageParams
  }
}