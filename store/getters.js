export default {
  getUser(state){
    return state
  },
  getEvents(state){
    return state.events
  },
  getDiscussions(state){
    return state.discussions
  },
  getEventCategories(state){
    return state.eventCategories
  },
  getPostCategories(state){
    return state.postCategories
  },
  getEvent:(state) => (id) =>{
    return state.events.find(event => event.id === Number(id))
  }
}