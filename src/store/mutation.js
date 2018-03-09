function change (state,payload) {
  console.log(state,payload);
  state.userinfo.name = payload.name;//test
}
export default {
  change
}