export default {
  async fetchUserDiscussions({commit}, pageNumber = 1){
    const resp = await this.$axios.get(`/user/discussion?page=${pageNumber}`)
    commit('SET_USER_DISCUSSIONS', resp.data.data)
    return resp   
  },
  async fetchUserEvents({commit}){
    const resp = await this.$axios.get('/user/event')
    commit('SET_USER_EVENTS', resp.data.data)
    return resp   
  },
  async fetchUserComments({commit}){
    const resp = await this.$axios.get('/user/event')
    commit('SET_USER_COMMENTS', resp.data.data)
    return resp   
  }
}


// SET_USER_POSTS
// SET_USER_EVENTS
// SET_USER_COMMENTS