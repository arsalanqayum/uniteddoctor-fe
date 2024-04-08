export const state = () => ({
    id:null,
    type: null,
    location: null,
    step: 1,
    fee: null,
    offer_label: null,
    schedules: [
        {
            date: null,
            dateMenu: false,
            fromTime: null,
            fromMenu: false,
            toTime: null,
            toMenu: false,
            duration: null,
            durationMenu: false,
        },
    ],
})
export const mutations = {
    SET_SCHEDULE_ID(state,id){
      state.id = id;
    },
    SET_SCHEDULE(state,data){
      state.schedules=data;
    },
    SET_OFFER_LABEL(state, label) {
        state.offer_label = label;
    },
    SET_FEE(state, fee) {
        state.fee = fee;
    },
    RESET_SCHEDULER(state) {
        state.type = null;
        state.location = null;
        state.schedules = [
            {
                date: null,
                dateMenu: false,
                fromTime: null,
                fromMenu: false,
                toTime: null,
                toMenu: false,
                duration: null,
                durationMenu: false,
            },
        ]
    },
    SET_SECHEDULE(state, data) {
        state.schedules = data;
    },
    SET_STEPS(state, data) {
        state.step = data;
    },
    SET_TYPE(state, data) {
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCC")
        state.type = data;
    },
    SET_LOCATION(state, data) {
        state.location = data;
    }
}