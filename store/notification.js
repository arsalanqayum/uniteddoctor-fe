
export const state = () => ({
    notifications:[],
  })
  
  export const mutations = {
    SET_NOTIFICATIONS(state, payload) {
      console.log(payload)
        state.notifications.unshift( payload);
        
    },
    ASSIGN_NOTIFICATIONS(state, payload) {
        console.log(payload)
          state.notifications= payload;
          
      }

  }
  export  const actions = {
    loaderAction({commit}, reqPayLoad){
       
      commit('updateLoader', reqPayLoad)
    }
  }
  
   