export const state = () => ({
    doctorSearch:null,
    doctorList:[],
  })
  export const mutations = {
    SEARCH_DOCTOR (state, data) {  
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCC")
        state.doctorSearch = data;
      },
      DOCTOR_LIST(state,data){
        state.doctorList = data;
      }
}