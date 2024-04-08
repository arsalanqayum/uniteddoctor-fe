export const state = () => ({
    token: null,
    user: null,
})
export const mutations = {
    SET_TOKEN(state, data) {
        state.token = data;
    },
    SET_USER_DETAILS(state, data) {
        state.user = data;
    },
    LOGOUT_USER(state) {
        state.token = null;
        state.user = null;
    }
}