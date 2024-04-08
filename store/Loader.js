
export const state = () => ({
  loader:false,
})

export const mutations = {
  updateLoader(state, payload) {
    console.log(payload)
      state.loader = payload;
      
  }
}
export  const actions = {
  loaderAction({commit}, reqPayLoad){
     
    commit('updateLoader', reqPayLoad)
  }
}

 