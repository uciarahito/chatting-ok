export const Getters = {
  isLogin: (state) => {
    return window.localStorage.getItem('token')
  },
  dataItems: (state) => {
    return state.dataItems
  }
}