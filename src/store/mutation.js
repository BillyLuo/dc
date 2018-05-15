import axios from 'axios';
function change (state,payload) {
  console.log('test');
}
function getUserLoginInfo(state,payload) {
  state.userinfo.username = '';
  state.userinfo.uid = '';
  state.userinfo.email = '';
  state.userinfo.mobile = '';
  state.userinfo.estimatedfund='';
  state.userinfo.country_codeold = '';
  state.userinfo = Object.assign(state.userinfo,payload)
}
function getUserBaseInfo (state,payload) {
  state.userinfo.emailset='';
  state.userinfo.identityset='';
  state.userinfo.mobileset='';
  state.userinfo.googlecodeset='';
  state.userinfo.loginpasswordsetL='';
  state.userinfo.tradepasswordset='';
  state.userinfo.email='';
  state.userinfo.mobile='';
  state.userinfo = Object.assign(state.userinfo,payload)
}
function getEstimateassets(state,payload){
  state.userinfo.estimateassets = '';
  state.userinfo = Object.assign(state.userinfo,{estimateassets:payload});
}
export default {
  change,
  getUserLoginInfo,
  getUserBaseInfo,
  getEstimateassets
}